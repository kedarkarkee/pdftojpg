const { createWriteStream } = require('fs');
const path = require('path');
const { createArchiver, convertPDFtoImage, getPDFPages, uploadAndUnlinkFile, unlinkFile } = require('../utils/pdf-convert');
const rootPath = require('../rootpath');
const { uploadFile, getFileStream, BucketNames } = require('../s3');
const openDb = require('../db');

const convertToJPG = async (req, res, next) => {
  try {
    const p = path.join(rootPath, req.file.path);
    const pages = await getPDFPages(p);
    const timestamp = Date.now();
    const db = await openDb();
    const { Key, Location } = await uploadFile(req.file, BucketNames.pdfInBucketName);
    const { lastID } = await db.run('INSERT INTO pdfuploads (timestamp,fileName,key,location,status,total) VALUES (?,?,?,?,?,?)', timestamp, req.file.filename, Key, Location, 'Converting', pages);
    res.json({ status: 'success' });
    await convertPDFtoImage(p);
    await db.run('UPDATE pdfuploads SET status = ? WHERE id = ?', 'Uploading to S3', lastID);
    const leftPath = req.file.filename.substring(0, req.file.filename.lastIndexOf('.'));
    const convertedImages = [];
    const zipPath = path.join(rootPath, 'output', 'output.zip');
    const output = createWriteStream(zipPath);
    output.on('close', async () => {
      await uploadFile({ path: zipPath, filename: `${leftPath}.zip` }, BucketNames.pdfOutBucketName);
      await unlinkFile(zipPath);
    });
    const archive = createArchiver();
    archive.pipe(output);
    if (pages === 1) {
      const fileInfo = {
        // outputFileName: `${leftPath}.jpg`,
        outputFileName: `${leftPath}-0.jpg`,
        newFileName: `${leftPath}1.jpg`,
        originalName: req.file.filename
      };
      convertedImages.push(await uploadAndUnlinkFile(db, lastID, 1, fileInfo, archive));
    } else {
      // for (let i = 1; i <= pages; i++) {
      for (let i = 0; i < pages; i++) {
        const fileInfo = {
          outputFileName: `${leftPath}-${i}.jpg`,
          newFileName: `${leftPath}${i + 1}.jpg`,
          originalName: req.file.filename
        };
        convertedImages.push(await uploadAndUnlinkFile(db, lastID, i, fileInfo, archive));
      }
    }
    archive.finalize();
    await unlinkFile(p);
    await db.run('UPDATE pdfuploads SET status = ? WHERE id = ?', '', lastID);
    // res.json({
    //   files: convertedImages
    // });
  } catch (e) {
  }
}
const getExistingConvertedFiles = async (req, res, next) => {
  try {
    const db = await openDb();
    const files = await db.all('SELECT * FROM pdfoutputs WHERE inputId = ?', req.params.id);
    res.status(200).json({ files });
  } catch (e) {
    next(e);
  }
}
const convertToZip = (req, res, next) => {
  try {
    const fileStream = getFileStream(req.body.filename, BucketNames.pdfOutBucketName);
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
module.exports = { convertToJPG, convertToZip, getExistingConvertedFiles }
