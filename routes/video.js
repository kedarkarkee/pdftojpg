const express = require('express');
const {resizeVideo, resizeExisting} = require('../controllers/video'); 


const router = express.Router();

router.post('/resize',resizeVideo);
router.post('/resizeExisting',resizeExisting);

module.exports = router;