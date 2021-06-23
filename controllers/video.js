const path = require('path');
const rootPath = require('../rootpath');
const fs = require('fs');
const openDb = require('../db');
const { convertVideo, generateThumbnails } = require('../utils/ffmpeg');

const resizeVideo = async (req, res) => {
  res.status(200).json({ success: true });
  const sizes = JSON.parse(req.body.sizes);
  const thumbnailSizes = JSON.parse(req.body.thumbnailSizes);
  const timestamp = Date.now();
  const db = await openDb();
  const dbres = await db.run('INSERT INTO vuploads (timestamp,fileName,finished,total) VALUES (?,?,?,?)', timestamp, req.file.filename, 1, sizes.length);
  await convertVideo(sizes, req.file, db, dbres.lastID, req.body.keepDAR === 'true');
  await generateThumbnails(thumbnailSizes, req.file, db, dbres.lastID);
  fs.unlink(path.join(rootPath, req.file.path), (_) => {
  });
}

const getConvertedVideos = async (req, res) => {
  const db = await openDb();
  const videos = await db.all('SELECT * FROM voutputs WHERE inputId = ?', req.params.id);
  return res.status(200).json(videos);
}

module.exports = { resizeVideo, getConvertedVideos }
