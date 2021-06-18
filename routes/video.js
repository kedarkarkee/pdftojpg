const express = require('express');
const {resizeVideo, resizeExisting, getConvertedVideos} = require('../controllers/video'); 


const router = express.Router();

router.post('/resize',resizeVideo);
router.get('/converted/:id',getConvertedVideos);
router.post('/resizeExisting',resizeExisting);

module.exports = router;