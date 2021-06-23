const Converter = require('../converter/pdfconverter');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const pdf = require('pdf-page-counter');
const rootPath = require('../rootpath');
const { uploadFile, BucketNames } = require('../s3');

const createArchiver = () => {
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });
  archive.on('warning', function (err) {
    if (err.code !== 'ENOENT') {
      console.log(err);
    }
  });

  archive.on('error', err => {
    console.log(err);
  });
  return archive;
}

const convertPDFtoImage = (filePath) => {
  const converter = Converter.create({
    file: filePath,
    output: 'output/'
  });
  converter.convert();
}

const getPDFPages = async (filePath) => {
  const pdfDetails = await pdf(fs.readFileSync(filePath));
  return pdfDetails.numpages;
}
const uploadAndUnlinkFile = async (db, lastID, page, fileInfo, archive) => {
  const outputPath = path.join(rootPath, 'output', fileInfo.outputFileName);
  archive.file(outputPath, { name: fileInfo.newFileName });
  const { Key, Location } = await uploadFile({ path: outputPath, filename: fileInfo.newFileName }, BucketNames.pdfOutBucketName);
  const cDbRes = await db.run('INSERT INTO pdfoutputs (inputId,fileName,key,location,page) VALUES (?,?,?,?,?)', lastID, fileInfo.originalName, Key, Location, page);
  await unlinkFile(outputPath);
  return { id: cDbRes.lastID, inputId: lastID, fileName: fileInfo.originalName, key: Key, location: Location, page: page };
}

const unlinkFile = filePath => {
  return new Promise((resolve) => {
    fs.unlink(filePath, _err => {
      return resolve();
    })
  });
}

exports.createArchiver = createArchiver;
exports.convertPDFtoImage = convertPDFtoImage;
exports.getPDFPages = getPDFPages;
exports.uploadAndUnlinkFile = uploadAndUnlinkFile;
exports.unlinkFile = unlinkFile;
