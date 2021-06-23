const { Router } = require('express');
const { getConvertedVideo, getThumbnail, deleteVideo, getPDF, getImage, deletePDF } = require('../controllers/files');

const router = Router();

// router.get('/videos/uploads/:key', getUploadedVideo);
router.get('/videoout/:key', getConvertedVideo);
router.get('/thumbnail/:key', getThumbnail);
router.get('/pdfin/:key', getPDF);
router.get('/pdfout/:key', getImage);
router.delete('/pdf/:id', deletePDF);
router.delete('/video/:id', deleteVideo);

module.exports = router;
