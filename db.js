const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const rootPath = require('./rootpath');
const path = require('path');

const openDb = async () => {
    const db = await open({
        filename: path.join(rootPath,'temp.db'),
        driver: sqlite3.Database,
    });
    await db.exec('CREATE TABLE IF NOT EXISTS vuploads (id INTEGER PRIMARY KEY, timestamp INTEGER, fileName TEXT, key TEXT, location TEXT, converted INTEGER DEFAULT 0, finished INTEGER, total INTEGER)');
    await db.exec('CREATE TABLE IF NOT EXISTS voutputs (id INTEGER PRIMARY KEY, resolution TEXT, inputId INTEGER, fileName TEXT, key TEXT, location TEXT, isThumbnail INTEGER DEFAULT 0)');
    await db.exec('CREATE TABLE IF NOT EXISTS pdfuploads (id INTEGER PRIMARY KEY, timestamp INTEGER, fileName TEXT, key TEXT, location TEXT, total INTEGER)');
    await db.exec('CREATE TABLE IF NOT EXISTS pdfoutputs (id INTEGER PRIMARY KEY, inputId INTEGER, fileName TEXT, key TEXT, location TEXT, page INTEGER)');
    return db;
}

module.exports = openDb;