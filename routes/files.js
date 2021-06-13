const express = require('express');
const {getImage,getPDF,deletePDF, getVideo, deleteVideo} = require('../controllers/files');

const router = express.Router();

router.get('/images/:fileName',getImage);
router.get('/pdf/:fileName',getPDF);
router.delete('/pdf/:fileName',deletePDF);
router.get('/video/:fileName',getVideo);
router.delete('/video/:fileName',deleteVideo);

module.exports = router;