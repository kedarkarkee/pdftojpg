const path = require('path');
const fs = require('fs');
const rootpath = require('../rootpath');

const getHistory = (req,res) => {
    const upPath = path.join(rootpath, 'uploads');
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
module.exports = getHistory;