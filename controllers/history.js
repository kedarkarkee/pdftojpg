const path = require('path');
const fs = require('fs');
const rootpath = require('../rootpath');
const openDb = require('../db');

const getPDFHistory = (req,res) => {
    const upPath = path.join(rootpath, 'uploads','pdf');
    fs.readdir(upPath, (err, files) => {
        if (err) {
            return res.status(404).json({ msg: "No Folder Found" });
        }
        files = files.map(fileName => {
            return {
                name: fileName,
                time: fs.statSync(upPath + '/' + fileName).mtime.getTime()
            };
        })
            .sort((a, b) => {
                return b.time - a.time;
            });
            
        return res.status(200).json({ files });
    });
}
const getVideoHistory = async(req,res) => {
    const db = await openDb();
    const files = await db.all('SELECT * FROM vuploads ORDER BY timestamp DESC');
    return res.status(200).json({ files });
}
// const getVideoHistory = (req,res) => {
//     const upPath = path.join(rootpath, 'uploads','videos');
//     fs.readdir(upPath, (err, files) => {
//         if (err) {
//             return res.status(404).json({ msg: "No Folder Found" });
//         }
//         files = files.map(fileName => {
//             return {
//                 name: fileName,
//                 time: fs.statSync(upPath + '/' + fileName).mtime.getTime()
//             };
//         })
//             .sort((a, b) => {
//                 return b.time - a.time;
//             });
            
//         return res.status(200).json({ files });
//     });
// }
module.exports = {getPDFHistory,getVideoHistory};