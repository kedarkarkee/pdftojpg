const openDb = require('../db');

const getPDFHistory = async (req, res, next) => {
  try {
    const db = await openDb();
    const files = await db.all('SELECT * FROM pdfuploads ORDER BY timestamp DESC');
    return res.status(200).json({ files });
  } catch (e) {
    next(e);
  }
}
const getVideoHistory = async (req, res, next) => {
  try {
    const db = await openDb();
    const files = await db.all('SELECT * FROM vuploads ORDER BY timestamp DESC');
    return res.status(200).json({ files });
  } catch (e) {
    next(e);
  }
}
module.exports = { getPDFHistory, getVideoHistory };
