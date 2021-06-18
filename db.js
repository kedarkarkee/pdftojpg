const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const rootPath = require('./rootpath');
const path = require('path');

const openDb = async () => {
    const db = await open({
        filename: path.join(rootPath,'temp.db'),
        driver: sqlite3.Database,
    });
    await db.exec('CREATE TABLE IF NOT EXISTS vuploads (id INTEGER PRIMARY KEY, timestamp INTEGER, fileName TEXT, filePath TEXT, converted INTEGER DEFAULT 0, finished INTEGER, total INTEGER)');
    await db.exec('CREATE TABLE IF NOT EXISTS voutputs (id INTEGER PRIMARY KEY, resolution TEXT, inputId INTEGER, fileName TEXT, filePath TEXT, isThumbnail INTEGER DEFAULT 0)');
    return db;
}

module.exports = openDb;