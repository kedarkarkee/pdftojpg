const express = require('express');
const path = require('path');
const http = require('http');
const multer = require('multer');
const cors = require('cors');
const {socketConnection} = require('./socket');
require('dotenv').config();

//Route Imports
const convertRoutes = require('./routes/convert');
const fileRoutes = require('./routes/files');
const historyRoutes = require('./routes/history');
const videoRoutes = require('./routes/video');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            if(file.fieldname === 'pdf')
            return cb(null,'./uploads/pdf');
            return cb(null,'./uploads/videos');
        },
        filename: (_, file, cb) => cb(null, file.originalname),
    }),
});
app.use('/output', express.static(path.join(__dirname, 'output')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/convert',upload.single('pdf'),convertRoutes);
app.use('/videoconvert',upload.single('video'),videoRoutes);
app.use('/files',fileRoutes);
app.use('/history',historyRoutes);
app.use('/', async (_, res) => {
    res.status(301).redirect('/');
});
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
socketConnection(server);
server.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});