const { Router } = require('express');
const { resizeVideo, getConvertedVideos } = require('../controllers/video');

const router = Router();

router.post('/resize', resizeVideo);
router.get('/converted/:id', getConvertedVideos);

module.exports = router;
