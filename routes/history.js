const { Router } = require('express');
const { getPDFHistory, getVideoHistory } = require('../controllers/history');

const router = Router();

router.get('/pdf', getPDFHistory);
router.get('/video', getVideoHistory);

module.exports = router;
