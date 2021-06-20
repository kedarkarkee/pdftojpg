const path = require('path');
const rootPath = require('../rootpath');
const fs = require('fs');
const openDb = require('../db');
const { convertVideo, generateThumbnails } = require('../utils/ffmpeg');
const { uploadFile } = require('../s3');

const resizeVideo = async (req, res) => {
    res.status(200).json({ success: true });
    const sizes = JSON.parse(req.body.sizes);
    const thumbnailSizes = JSON.parse(req.body.thumbnailSizes);
    const timestamp = Date.now();
    const { Key, Location } = await uploadFile(req.file, 'videos/uploads/');
    const db = await openDb();
    const dbres = await db.run('INSERT INTO vuploads (timestamp,fileName,key,location,finished,total) VALUES (?,?,?,?,?,?)', timestamp, req.file.filename, Key, Location, 1, sizes.length);
    await convertVideo(sizes, req.file, db, dbres.lastID, req.body.keepDAR === 'true');
    await generateThumbnails(thumbnailSizes, req.file, db, dbres.lastID);
    fs.unlink(path.join(rootPath, req.file.path),(_) => {
        return;
    });
}
const resizeExisting = (req, res) => {
    // const inputPath = path.join(rootPath, 'uploads', 'videos', req.body.fileName);
    // const command = ffmpeg(inputPath).size(req.body.size);
    // const outputPath = path.join(rootPath, 'output', req.body.fileName);
    // if (req.body.keepDAR === 'true') {
    //     command.keepDAR();
    // }
    // command.on('end', () => {
    //     res.status(200).sendFile(outputPath);
    // }).on('progress', function (progress) {
    //     sendMessage(req.body.socketId, "PROGRESS", progress.percent);
    // }).save(outputPath);
    res.end("Okay");
}

const getConvertedVideos = async (req, res) => {
    const db = await openDb();
    const videos = await db.all('SELECT * FROM voutputs WHERE inputId = ?', req.params.id);
    return res.status(200).json(videos);
}

module.exports = { resizeVideo, resizeExisting, getConvertedVideos }