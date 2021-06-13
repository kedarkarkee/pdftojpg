const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const rootPath = require('../rootpath');
const {sendMessage} = require('../socket');

const resizeVideo = (req, res) => {
    const command = ffmpeg(path.join(rootPath,req.file.path)).size(req.body.size);
    const outputPath = path.join(rootPath, 'output', req.file.filename);
    if(req.body.keepDAR === 'true'){
        command.keepDAR();
    }
    command.on('end', () => {
        res.status(200).sendFile(outputPath);
    }).on('progress', function (progress) {
        sendMessage(req.body.socketId,"PROGRESS",progress.percent);
    }).save(outputPath);
}
const resizeExisting = (req, res) => {
    const inputPath = path.join(rootPath,'uploads','videos',req.body.fileName);
    const command = ffmpeg(inputPath).size(req.body.size);
    const outputPath = path.join(rootPath, 'output', req.body.fileName);
    if(req.body.keepDAR === 'true'){
        command.keepDAR();
    }
    command.on('end', () => {
        res.status(200).sendFile(outputPath);
    }).on('progress', function (progress) {
        sendMessage(req.body.socketId,"PROGRESS",progress.percent);
    }).save(outputPath);
}

module.exports = { resizeVideo , resizeExisting}