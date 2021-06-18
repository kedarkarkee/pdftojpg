const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const rootPath = require('../rootpath');
const { sendMessage } = require('../socket');
const openDb = require('../db');

const convertVideos = async (sizes, file, db, id, keepDAR) => {
    let count = 0;
    for (let size of sizes) {
        const leftPath = file.filename.substring(0, file.filename.lastIndexOf('.'));
        // const extension = file.filename.substring(file.filename.lastIndexOf('.'));
        const newFileName = leftPath + size.replace('?', '') + '.mp4';
        const outputPath = path.join(rootPath, 'output', 'videos', newFileName);
        const command = ffmpeg(path.join(rootPath, file.path)).size(size).format('mp4');
        if (keepDAR) {
            command.keepDAR();
        }
        command.on('end', async () => {
            await db.run('INSERT INTO voutputs (resolution,inputId,fileName,filePath) VALUES (?,?,?,?)', size, id, newFileName, outputPath);
            count++;
            if (count >= sizes.length) {
                await db.run('UPDATE vuploads SET converted = ?,finished = ? WHERE id = ?', 1, count, id);
            } else {
                await db.run('UPDATE vuploads SET finished = ? WHERE id = ?', count + 1, id);
            }
        }).on('error', async (e) => {
            console.log(e);
            await db.run('UPDATE vuploads SET converted = ? WHERE id = ?', 2, id);
        })
            .save(outputPath);
    }
}
const generateThumbnails = async (sizes, file, db,id) => {
    const outputFolder = path.join(rootPath, 'output', 'thumbnails');
    for (let size of sizes) {
        const command = ffmpeg(path.join(rootPath, file.path)).size(size);
        command.thumbnail({
            timestamps: ['25%'],
            filename: '%b-thumbnail-%r.png',
            folder: outputFolder,
            size: size
        }).on('filenames', async ([filename]) => {
            await db.run('INSERT INTO voutputs (resolution,inputId,fileName,filePath,isThumbnail) VALUES (?,?,?,?,?)', size, id, filename, path.join(outputFolder,filename),1);
        }).on('error', (e) => {
            console.log(e);
        });
    }
}

const resizeVideo = async (req, res) => {
    const sizes = JSON.parse(req.body.sizes);
    const thumbnailSizes = JSON.parse(req.body.thumbnailSizes);
    const timestamp = Date.now();
    const db = await openDb();
    const dbres = await db.run('INSERT INTO vuploads (timestamp,fileName,filePath,finished,total) VALUES (?,?,?,?,?)', timestamp, req.file.filename, path.join(rootPath, req.file.path), 1, sizes.length);
    convertVideos(sizes, req.file, db, dbres.lastID, req.body.keepDAR === 'true');
    generateThumbnails(thumbnailSizes, req.file,db, dbres.lastID);
    res.status(200).json({ 'success': true });
}
const resizeExisting = (req, res) => {
    const inputPath = path.join(rootPath, 'uploads', 'videos', req.body.fileName);
    const command = ffmpeg(inputPath).size(req.body.size);
    const outputPath = path.join(rootPath, 'output', req.body.fileName);
    if (req.body.keepDAR === 'true') {
        command.keepDAR();
    }
    command.on('end', () => {
        res.status(200).sendFile(outputPath);
    }).on('progress', function (progress) {
        sendMessage(req.body.socketId, "PROGRESS", progress.percent);
    }).save(outputPath);
}

const getConvertedVideos = async (req, res) => {
    const db = await openDb();
    const videos = await db.all('SELECT * FROM voutputs WHERE inputId = ?', req.params.id);
    return res.status(200).json(videos);
}

module.exports = { resizeVideo, resizeExisting, getConvertedVideos }