const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Route Imports
const convertRoutes = require('./routes/convert');
const fileRoutes = require('./routes/files');
const historyRoutes = require('./routes/history');
const videoRoutes = require('./routes/video');

const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      if (file.fieldname === 'pdf') {
        return cb(null, './uploads/pdf');
      }
      return cb(null, './uploads/videos');
    },
    filename: (_, file, cb) => cb(null, file.originalname)
  })
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/convert', upload.single('pdf'), convertRoutes);
app.use('/videoconvert', upload.single('video'), videoRoutes);
app.use('/files', fileRoutes);
app.use('/history', historyRoutes);
app.use('/', (_, res) => {
  res.status(301).redirect('/');
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
