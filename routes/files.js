const express = require('express');
const {getImage,getPDF,deletePDF} = require('../controllers/files');

const router = express.Router();

router.get('/images/:fileName',getImage);
router.get('/pdf/:fileName',getPDF);
router.delete('/pdf/:fileName',deletePDF);

module.exports = router;