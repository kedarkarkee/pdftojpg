const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-page-counter');
const archiver = require('archiver');
const Converter = require('../converter/pdfconverter');
const rootPath = require('../rootpath');
const serverPath = require('../serverpath');

const convertToJPG = async (req, res) => {
    const p = path.join(rootPath, req.file.path);
    const dataBuffer = fs.readFileSync(p);
    const pdfDetails = await pdf(dataBuffer);
    const pages = pdfDetails.numpages;
    const converter = Converter.create({
        file: p,
        output: 'output/',

    });
    converter.convert();
    const imgUrls = [];
    if (pages == 1) {
        imgUrls.push(`${serverPath}/output/${req.file.filename.split('.')[0]}.png`);
    } else {
        for (let i = 1; i <= pages; i++) {
            imgUrls.push(`${serverPath}/output/${req.file.filename.split('.')[0]}-${i}.png`);
        }
    }
    res.json({
        pages: pages,
        imageUrls: imgUrls
    });
}
const convertToJPGExisting = async (req, res) => {
    const p = path.join(rootPath, 'uploads','pdf',req.params.fileName +'.pdf');
    const dataBuffer = fs.readFileSync(p);
    const pdfDetails = await pdf(dataBuffer);
    const pages = pdfDetails.numpages;
    const converter = Converter.create({
        file: p,
        output: 'output/',

    });
    converter.convert();
    const imgUrls = [];
    if (pages == 1) {
        imgUrls.push(`${serverPath}/output/${req.params.fileName}.png`);
    } else {
        for (let i = 1; i <= pages; i++) {
            imgUrls.push(`${serverPath}/output/${req.params.fileName}-${i}.png`);
        }
    }
    res.json({
        pages: pages,
        imageUrls: imgUrls
    });
}
const convertToZip = async(req,res) => {
    const zipPath = path.join(rootPath, 'output', 'output.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    output.on('close', function () {
        res.status(201).sendFile(zipPath);
    });
    output.on('end', function () {
        console.log('Data has been drained');
    });
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
        } else {
            throw err;
        }
    });

    archive.on('error', err=> {
        res.status(400).json({ status: "Error" });
    });

    archive.pipe(output);
    for (let fName of req.body.fileNames) {
        archive.file(path.join(rootPath, 'output', fName), { name: fName });
    }
    archive.finalize();
}

module.exports = {convertToJPG, convertToZip, convertToJPGExisting}