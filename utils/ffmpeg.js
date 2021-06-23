const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const rootPath = require('../rootpath');
const { uploadFile, BucketNames } = require('../s3');
const fs = require('fs');

const getResolution = r => {
  const rs = r.split('x');
  if (rs[0] === '?') return `-${rs[1]}p`;
  return '-' + rs[0] + ' x ' + rs[1];
}

const convertVideo = async (sizes, file, db, id, keepDAR) => {
  try {
    const filePath = path.join(rootPath, file.path);
    const leftPath = file.filename.substring(0, file.filename.lastIndexOf('.'));
    let count = 1;
    for (const size of sizes) {
      try {
        const { Key, Location, newFileName } = await videoConvert(leftPath, filePath, size, keepDAR);
        await db.run('INSERT INTO voutputs (resolution,inputId,fileName,key,location) VALUES (?,?,?,?,?)', size, id, newFileName, Key, Location);
        await db.run('UPDATE vuploads SET finished = ? WHERE id = ?', ++count, id);
      } catch (e) {
        console.log('Here error');
        console.log(e);
        await db.run('UPDATE vuploads SET converted = ? WHERE id = ?', 2, id);
      }
    }
    await db.run('UPDATE vuploads SET converted = ? WHERE id = ?', 1, id);
  } catch (e) {

  }
}
const generateThumbnails = async (sizes, file, db, id) => {
  try {
    const filePath = path.join(rootPath, file.path);
    const outputFolder = path.join(rootPath, 'output', 'thumbnails');
    for (const size of sizes) {
      const { Key, Location, fname } = await thumnnailPromise(filePath, outputFolder, size);
      await db.run('INSERT INTO voutputs (resolution,inputId,fileName,key,location,isThumbnail) VALUES (?,?,?,?,?,?)', size, id, fname, Key, Location, 1);
    }
  } catch (e) {

  }
}

const thumnnailPromise = (filePath, outputFolder, size) => {
  let fname = '';
  return new Promise((resolve, reject) => {
    ffmpeg(filePath).size(size).thumbnail({
      timestamps: ['25%'],
      filename: `%b${getResolution(size)}.jpg`,
      folder: outputFolder,
      size: size
    }).on('filenames', async ([filename]) => {
      fname = filename;
    }).on('end', async () => {
      const outputPath = path.join(outputFolder, fname);
      const result = await uploadFile({ path: outputPath, filename: fname }, BucketNames.thumbnailBucketName);
      fs.unlink(outputPath, (_) => {
        return resolve({ ...result, fname });
      });
    }).on('error', e => {
      return reject(new Error(e));
    });
  });
}
const videoConvert = (leftPath, filePath, size, keepDAR) => {
  return new Promise((resolve, reject) => {
    const newFileName = leftPath + getResolution(size) + '.mp4';
    const outputPath = path.join(rootPath, 'output', 'videos', newFileName);
    const command = ffmpeg(filePath).size(size).format('mp4');
    if (keepDAR) {
      command.keepDAR();
    }
    command.on('end', async () => {
      const result = await uploadFile({ path: outputPath, filename: newFileName }, BucketNames.videoOutBucketName);
      fs.unlink(outputPath, (_) => {
        return resolve({ ...result, newFileName });
      });
    }).on('error', (e) => {
      return reject(new Error(e));
    }).save(outputPath);
  });
}

module.exports = { convertVideo, generateThumbnails }
