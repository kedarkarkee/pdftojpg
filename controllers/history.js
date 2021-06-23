const openDb = require('../db');

const getPDFHistory = async (req, res) => {
  const db = await openDb();
  const files = await db.all('SELECT * FROM pdfuploads ORDER BY timestamp DESC');
  return res.status(200).json({ files });
}
const getVideoHistory = async (req, res) => {
  const db = await openDb();
  const files = await db.all('SELECT * FROM vuploads ORDER BY timestamp DESC');
  return res.status(200).json({ files });
}
module.exports = { getPDFHistory, getVideoHistory };
