const express = require('express');
const {getUploadedVideo, getConvertedVideo, getThumbnail, deleteVideo, getPDF, getImage, deletePDF} = require('../controllers/files');

const router = express.Router();

router.get('/videos/uploads/:key',getUploadedVideo);
router.get('/videos/converted/:key',getConvertedVideo);
router.get('/videos/thumbnails/:key',getThumbnail);
router.get('/pdf/uploads/:key',getPDF);
router.get('/pdf/converted/:key',getImage);
// router.get('/images/:fileName',getImage);
// router.get('/pdf/:fileName',getPDF);
router.delete('/pdf/:id',deletePDF);
// router.get('/video/:fileName',getVideo);
router.delete('/video/:id',deleteVideo);

module.exports = router;