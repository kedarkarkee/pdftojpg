const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

//Route Imports
const convertRoutes = require('./routes/convert');
const fileRoutes = require('./routes/files');
const historyRoutes = require('./routes/history');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => cb(null, file.originalname),
    }),
});
app.use('/output', express.static(path.join(__dirname, 'output')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());
app.use(upload.array('theFiles'));
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/convert',convertRoutes);
app.use('/files',fileRoutes);
app.use('/history',historyRoutes);
app.use('/', async (_, res) => {
    res.end("Nothing Here");
});
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});