const { Router } = require('express');
const { convertToJPG, convertToZip, getExistingConvertedFiles } = require('../controllers/convert');

const router = Router();

router.get('/jpg/:id', getExistingConvertedFiles);
router.post('/jpg', convertToJPG);
router.post('/zip', convertToZip);

module.exports = router;
