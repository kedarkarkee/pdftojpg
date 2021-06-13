const express = require('express');
const {getPDFHistory, getVideoHistory} = require('../controllers/history');

const router = express.Router();

router.get('/pdf',getPDFHistory);
router.get('/video',getVideoHistory);

module.exports = router;