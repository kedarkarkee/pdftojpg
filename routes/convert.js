const express = require('express');
const {convertToJPG,convertToZip, convertToJPGExisting} = require('../controllers/convert'); 

const router = express.Router();

router.get('/jpg/:fileName',convertToJPGExisting);
router.post('/jpg',convertToJPG);
router.post('/zip',convertToZip);

module.exports = router;