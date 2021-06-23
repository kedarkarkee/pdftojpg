const { createWriteStream } = require('fs');
const path = require('path');
const { createArchiver, convertPDFtoImage, getPDFPages, uploadAndUnlinkFile, unlinkFile } = require('../utils/pdf-convert');
const rootPath = require('../rootpath');
const { uploadFile, getFileStream, BucketNames } = require('../s3');
const openDb = require('../db');

const convertToJPG = async (req, res) => {
  const p = path.join(rootPath, req.file.path);
  const pages = await getPDFPages(p);
  const timestamp = Date.now();
  const db = await openDb();
  const { Key, Location } = await uploadFile(req.file, BucketNames.pdfInBucketName);
  const { lastID } = await db.run('INSERT INTO pdfuploads (timestamp,fileName,key,location,total) VALUES (?,?,?,?,?)', timestamp, req.file.filename, Key, Location, pages);
  convertPDFtoImage(p);
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
      outputFileName: `${leftPath}.jpg`,
      newFileName: `${leftPath}1.jpg`,
      originalName: req.file.filename
    };
    convertedImages.push(await uploadAndUnlinkFile(db, lastID, 1, fileInfo, archive));
  } else {
    for (let i = 1; i <= pages; i++) {
      const fileInfo = {
        outputFileName: `${leftPath}-${i}.jpg`,
        newFileName: `${leftPath}${i}.jpg`,
        originalName: req.file.filename
      };
      convertedImages.push(await uploadAndUnlinkFile(db, lastID, i, fileInfo, archive));
    }
  }
  archive.finalize();
  await unlinkFile(p);
  res.json({
    files: convertedImages
  });
}
const getExistingConvertedFiles = async (req, res) => {
  const db = await openDb();
  const files = await db.all('SELECT * FROM pdfoutputs WHERE inputId = ?', req.params.id);
  res.status(200).json({ files });
}
const convertToZip = (req, res) => {
  const fileStream = getFileStream(req.body.filename, BucketNames.pdfOutBucketName);
  fileStream.pipe(res);
}
module.exports = { convertToJPG, convertToZip, getExistingConvertedFiles }
