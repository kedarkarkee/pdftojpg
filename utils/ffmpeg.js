const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const rootPath = require('../rootpath');
const { uploadFile } = require('../s3');
const fs = require('fs');

const convertVideo = async (sizes, file, db, id, keepDAR) => {
    try {
        const filePath = path.join(rootPath, file.path);
        const leftPath = file.filename.substring(0, file.filename.lastIndexOf('.'));
        let count = 1;
        for (let size of sizes) {
            try {
                const {Key,Location} = await videoConvert(leftPath, filePath, size, keepDAR);
                await db.run('INSERT INTO voutputs (resolution,inputId,fileName,key,location) VALUES (?,?,?,?,?)', size, id, file.filename, Key, Location);
                await db.run('UPDATE vuploads SET finished = ? WHERE id = ?', ++count, id);
            } catch (e) {
                console.log(e);
                await db.run('UPDATE vuploads SET converted = ? WHERE id = ?', 2, id);
            }
        }
        await db.run('UPDATE vuploads SET converted = ? WHERE id = ?', 1, id);
    } catch (e){
        return;
    }
}
const generateThumbnails = async (sizes, file, db, id) => {
    try {

        const filePath = path.join(rootPath, file.path);
        const outputFolder = path.join(rootPath, 'output', 'thumbnails');
        for (let size of sizes) {
            const {Key,Location,fname} = await thumnnailPromise(filePath, outputFolder, size);
            await db.run('INSERT INTO voutputs (resolution,inputId,fileName,key,location,isThumbnail) VALUES (?,?,?,?,?,?)', size, id, fname, Key, Location , 1);
        }
    } catch (e){
        return;
    }
}

const thumnnailPromise = (filePath, outputFolder, size) => {
    let fname = '';
    return new Promise((resolve, reject) => {
        ffmpeg(filePath).size(size).thumbnail({
            timestamps: ['25%'],
            filename: '%b-thumbnail-%r.png',
            folder: outputFolder,
            size: size
        }).on('filenames', async ([filename]) => {
            fname = filename;
        }).on('end', async() => {
            const outputPath = path.join(outputFolder, fname);
            const result = await uploadFile({ path: outputPath, filename: fname }, 'videos/thumbnails/');
            fs.unlink(outputPath,(_) => {
                return resolve({...result,fname});
            });
        }).on('error', e => {
            return reject(new Error(e));
        });
    });
}
const videoConvert = (leftPath, filePath, size, keepDAR) => {
    return new Promise((resolve, reject) => {
        const newFileName = leftPath + size.replace('?', '') + '.mp4';
        const outputPath = path.join(rootPath, 'output', 'videos', newFileName);
        const command = ffmpeg(filePath).size(size).format('mp4');
        if (keepDAR) {
            command.keepDAR();
        }
        command.on('end', async () => {
            const result = await uploadFile({ path: outputPath, filename: newFileName }, 'videos/converted/');
            fs.unlink(outputPath, (_) => {
                return resolve(result);
            });
        }).on('error', (e) => {
            return reject(new Error(e));
        }).save(outputPath);
    });
}

module.exports = { convertVideo, generateThumbnails }