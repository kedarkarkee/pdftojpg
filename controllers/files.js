const openDb = require('../db');
const { getFileStream, BucketNames } = require('../s3');

// const getUploadedVideo = (req, res) => {
//   const fileStream = getFileStream(req.params.key,BucketNames.);
//   fileStream.pipe(res);
// }
const getConvertedVideo = (req, res) => {
  const fileStream = getFileStream(req.params.key, BucketNames.videoOutBucketName);
  if (fileStream == null) return res.end();
  fileStream.pipe(res);
}
const getThumbnail = (req, res) => {
  const fileStream = getFileStream(req.params.key, BucketNames.thumbnailBucketName);
  if (fileStream == null) return res.end();
  fileStream.pipe(res);
}
const getPDF = (req, res) => {
  const fileStream = getFileStream(req.params.key, BucketNames.pdfInBucketName);
  if (fileStream == null) return res.end();
  fileStream.pipe(res);
}

const getImage = (req, res) => {
  const fileStream = getFileStream(req.params.key, BucketNames.pdfOutBucketName);
  if (fileStream == null) return res.end();
  fileStream.pipe(res);
}
const deletePDF = async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM pdfuploads WHERE id=?', req.params.id);
  await db.run('DELETE FROM pdfoutputs WHERE inputId=?', req.params.id);
  return res.status(200).json({ status: 'Success' });
}
const deleteVideo = async (req, res) => {
  const db = await openDb();
  const id = req.params.id;
  await db.run('DELETE FROM vuploads WHERE id=?', id);
  await db.run('DELETE FROM voutputs WHERE inputId=?', id);
  return res.status(200).json({ status: 'Success' });
}
module.exports = { getConvertedVideo, getThumbnail, deleteVideo, getPDF, getImage, deletePDF };
