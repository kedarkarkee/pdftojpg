const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-page-counter');
const archiver = require('archiver');
const Converter = require('../converter/pdfconverter');
const rootPath = require('../rootpath');
const serverPath = require('../serverpath');
const { uploadFile, getFileStream } = require('../s3');
const openDb = require('../db');

const createArchiver = () => {
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    archive.on('warning', function (err) {
        if (err.code !== 'ENOENT') {
            console.log(err);
        }
    });

    archive.on('error', err => {
        console.log(err);
    });
    return archive;
}

const convertPDF = (filePath) => {
    const converter = Converter.create({
        file: filePath,
        output: 'output/',
    });
    converter.convert();
}

const getPDFPages = async (filePath) => {
    const pdfDetails = await pdf(fs.readFileSync(filePath));
    return pdfDetails.numpages;
}

const uploadAndUnlinkFile = async (db, lastID, page, outputFileName,archive) => {
    const outputPath = path.join(rootPath, 'output', outputFileName);
    archive.file(outputPath,{name: outputFileName});
    const { Key, Location } = await uploadFile({ path: outputPath, filename: outputFileName }, 'pdf/converted/');
    const cDbRes = await db.run('INSERT INTO pdfoutputs (inputId,fileName,key,location,page) VALUES (?,?,?,?,?)', lastID, outputFileName, Key, Location, 1);
    fs.unlinkSync(outputPath);
    return { id: cDbRes.lastID, inputId: lastID, fileName: outputFileName, key: Key, location: Location, page: page };
}

const convertToJPG = async (req, res) => {
    const p = path.join(rootPath, req.file.path);
    const pages = await getPDFPages(p);
    const timestamp = Date.now();
    const db = await openDb();
    const { Key, Location } = await uploadFile(req.file, 'pdf/uploads/');
    const { lastID } = await db.run('INSERT INTO pdfuploads (timestamp,fileName,key,location,total) VALUES (?,?,?,?,?)', timestamp, req.file.filename, Key, Location, pages);
    convertPDF(p);
    const leftPath = req.file.filename.substring(0, req.file.filename.lastIndexOf('.'));
    const convertedImages = [];
    const zipPath = path.join(rootPath,'output','output.zip');
    const output = fs.createWriteStream(zipPath);
    output.on('close', async() => {
        await uploadFile({ path: zipPath, filename: `${leftPath}.zip` }, 'pdf/converted/');
        fs.unlink(zipPath,(_) => {
            return;
        })
       });
    const archive = createArchiver();
    archive.pipe(output);

    if (pages == 1) {
        convertedImages.push(await uploadAndUnlinkFile(db, lastID, 1, `${leftPath}.png`,archive));
    } else {
        for (let i = 1; i <= pages; i++) {
            convertedImages.push(await uploadAndUnlinkFile(db, lastID, i, `${leftPath}-${i}.png`,archive));
        }
    }
    archive.finalize();
    fs.unlink(p, (_) => {
        res.json({
            files: convertedImages
        });
    });
}
const convertToJPGExisting = async (req, res) => {
    const db = await openDb();
    const files = await db.all('SELECT * FROM pdfoutputs WHERE inputId = ?', req.params.id);
    res.status(200).json({ files });
}
const convertToZip = (req, res) => {
 const fileStream = getFileStream('pdf/converted/' + req.body.filename);
 fileStream.pipe(res); 
}
module.exports = { convertToJPG, convertToZip, convertToJPGExisting }