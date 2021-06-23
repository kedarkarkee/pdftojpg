require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const BucketNames = {
  pdfInBucketName: process.env.AWS_PDFIN_BUCKET_NAME,
  pdfOutBucketName: process.env.AWS_PDFOUT_BUCKET_NAME,
  videoOutBucketName: process.env.AWS_VIDEOOUT_BUCKET_NAME,
  thumbnailBucketName: process.env.AWS_THUMBNAIL_BUCKET_NAME
}
exports.BucketNames = BucketNames;
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
const uploadFile = (file, bucketName) => {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// downloads a file from s3
const getFileStream = (fileKey, bucketName) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
  } catch (_e) {
    return null;
  }
}
exports.getFileStream = getFileStream
