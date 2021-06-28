const openDb = require('../db');
const { getFileStream, BucketNames, deleteFiles } = require('../s3');

const getConvertedVideo = (req, res, next) => {
  try {
    const fileStream = getFileStream(req.params.key, BucketNames.videoOutBucketName);
    if (fileStream == null) return res.end();
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
const getThumbnail = (req, res, next) => {
  try {
    const fileStream = getFileStream(req.params.key, BucketNames.thumbnailBucketName);
    if (fileStream == null) return res.end();
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
const getPDF = (req, res, next) => {
  try {
    const fileStream = getFileStream(req.params.key, BucketNames.pdfInBucketName);
    if (fileStream == null) return res.end();
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}

const getImage = (req, res, next) => {
  try {
    const fileStream = getFileStream(req.params.key, BucketNames.pdfOutBucketName);
    if (fileStream == null) return res.end();
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
const deletePDF = async (req, res, next) => {
  try {
    const db = await openDb();
    await db.run('DELETE FROM pdfuploads WHERE id=?', req.params.id);
    await db.run('DELETE FROM pdfoutputs WHERE inputId=?', req.params.id);
    return res.status(200).json({ status: 'Success' });
  } catch (e) {
    next(e);
  }
}
const deletePDFPermanent = async (req, res, next) => {
  try {
    const db = await openDb();
    const input = await db.get('SELECT key FROM pdfuploads WHERE id = ?', req.params.id);
    const outputs = await db.all('SELECT key FROM pdfoutputs WHERE inputId = ?', req.params.id);
    const keys = [...outputs, { key: input.key.replace('pdf', 'zip') }];
    const fileKeysOut = [];
    for (const k of keys) {
      fileKeysOut.push({ Key: k.key });
    }
    const fileKeysIn = [{ Key: input.key }];
    await deleteFiles(fileKeysIn, BucketNames.pdfInBucketName);
    await deleteFiles(fileKeysOut, BucketNames.pdfOutBucketName);
    await db.run('DELETE FROM pdfuploads WHERE id=?', req.params.id);
    await db.run('DELETE FROM pdfoutputs WHERE inputId=?', req.params.id);
    return res.status(200).json({ status: 'Success' });
  } catch (e) {
    next(e);
  }
}
const deleteVideo = async (req, res, next) => {
  try {
    const db = await openDb();
    const id = req.params.id;
    await db.run('DELETE FROM vuploads WHERE id=?', id);
    await db.run('DELETE FROM voutputs WHERE inputId=?', id);
    return res.status(200).json({ status: 'Success' });
  } catch (e) {
    next(e);
  }
}
const deleteVideoPermanent = async (req, res, next) => {
  try {
    const db = await openDb();
    const videos = await db.all('SELECT key FROM voutputs WHERE inputId = ? and isThumbnail = ?', req.params.id, 0);
    const thumbs = await db.all('SELECT key FROM voutputs WHERE inputId = ? and isThumbnail = ?', req.params.id, 1);
    const videoKeys = [];
    for (const k of videos) {
      videoKeys.push({ Key: k.key });
    }
    const thumbKeys = [];
    for (const k of thumbs) {
      thumbKeys.push({ Key: k.key });
    }
    await deleteFiles(videoKeys, BucketNames.videoOutBucketName);
    await deleteFiles(thumbKeys, BucketNames.thumbnailBucketName);
    await db.run('DELETE FROM vuploads WHERE id=?', req.params.id);
    await db.run('DELETE FROM voutputs WHERE inputId=?', req.params.id);
    return res.status(200).json({ status: 'Success' });
  } catch (e) {
    next(e);
  }
}
module.exports = { getConvertedVideo, getThumbnail, deleteVideo, getPDF, getImage, deletePDF, deletePDFPermanent, deleteVideoPermanent };
