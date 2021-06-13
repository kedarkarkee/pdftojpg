const path = require('path');
const rootpath = require('../rootpath');
const fs = require('fs');

const getImage = (req,res) => {
    const fileName = req.params.fileName;
    const imgPath = path.join(rootpath, 'output', fileName);
    res.sendFile(imgPath);
}
const getPDF = (req,res) => {
    const fileName = req.params.fileName + '.pdf';
    const pdfPath = path.join(rootpath, 'uploads','pdf', fileName);
    res.status(200).sendFile(pdfPath);
}
const deletePDF = (req,res) => {
    const fileName = req.params.fileName + '.pdf';
    const pdfPath = path.join(rootpath, 'uploads','pdf', fileName);
    fs.unlink(pdfPath,(err)=>{
        if(err){
            return res.status(400).json({status: 'Failed'});
        }
        return res.status(200).json({status: 'Success'});
    })
}
const getVideo = (req,res) => {
    const fileName = req.params.fileName;
    const videoPath = path.join(rootpath, 'uploads','videos', fileName);
    res.status(200).sendFile(videoPath);
}
const deleteVideo = (req,res) => {
    const fileName = req.params.fileName;
    const pdfPath = path.join(rootpath, 'uploads','videos', fileName);
    fs.unlink(pdfPath,(err)=>{
        if(err){
            return res.status(400).json({status: 'Failed'});
        }
        return res.status(200).json({status: 'Success'});
    })
}
module.exports = {getImage,getPDF,deletePDF,getVideo,deleteVideo};