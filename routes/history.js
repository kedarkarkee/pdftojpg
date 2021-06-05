const express = require('express');
const getHistory = require('../controllers/history');

const router = express.Router();

router.get('/',getHistory);

module.exports = router;