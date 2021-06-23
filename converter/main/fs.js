const fs = require('fs');

const exists = (path) => {
  return fs.existsSync(path);
};

const folderExists = (path) => {
  if (!exists(path)) {
    return false;
  }

  return fs.statSync(path).isDirectory();
};

const fileExists = (path) => {
  if (!exists(path)) {
    return false;
  }

  return fs.statSync(path).isFile();
};

const getFileName = (path) => {
  return path.split('/').pop();
};

const copyFile = (from, to) => {
  if (!fileExists(from)) {
    return false;
  }

  return fs.copyFileSync(from, to);
};
const deleteFile = (path) => {
  if (!fileExists(path)) {
    return false;
  }

  return fs.unlinkSync(path);
};

module.exports = {
  exists,
  folderExists,
  fileExists,
  getFileName,
  deleteFile,
  copyFile
};
