const File = require('./file');
const {
  folderExists,
  fileExists,
  getFileName
} = require('./fs');
const { exec } = require('child_process');

/**
 * Converter
 */
class Converter {
  /**
     * Define the files array
     */
  constructor () {
    this.oldFile = null;
    this.output = null;
    this.customConverter = null;
  }

  /**
     * Get the converter.
     *
     * @return {string}
     */
  get converter () {
    if (this.customConverter) {
      return this.customConverter;
    }

    return 'cp';
  }

  /**
     * Set the custom converter.
     *
     * @param {string} converter
     */
  setConverter (converter) {
    if (!converter) {
      return;
    }

    if (converter.constructor !== String) {
      throw new Error('Converter should be a string');
    }

    this.customConverter = converter;
  }

  /**
     * Set the files
     *
     * @param {string} file
     */
  setFile (file) {
    if (!file || file.constructor !== String) {
      throw new Error('File should be a string');
    }

    this.oldFile = File.create({
      filePath: file
    });
  }

  /**
     * Set the output path
     *
     * @param {string} output
     */
  setOutput (output) {
    if (!output || output.constructor !== String) {
      throw new Error('Output should be a string');
    }

    if (!folderExists(output)) {
      throw new Error('Output folder doesnt exists');
    }

    this.output = output;
  }

  /**
     * Get the path of the new file.
     *
     * @return {string}
     */
  get newFile () {
    return this.output + this.oldFile.name + this.oldFile.extension;
  }

  /**
     * Get the exec path
     *
     * @return {string}
     */
  get execPath () {
    // this.setConverter('convert -quality 100 -density 200 -colorspace RGB -scene 1');
    this.setConverter('gm convert -quality 100 -density 200 -colorspace RGB');
    const newFileName = this.newFile.substring(0, this.newFile.lastIndexOf('.')) + '-%d.jpg';
    const command = this.converter + ' "' + this.oldFile.path + '" +adjoin "' + newFileName + '"';
    // return this.converter + ' "' + this.oldFile.path + '" "' + this.newFile + '"';
    return command;
  }

  /**
     * Convert pdf files to png files.
     *
     * @return {Promise}
     */
  convert () {
    // const output = execSync(this.execPath);
    return new Promise((resolve, reject) => {
      exec(this.execPath, (err, _stdout, _stderr) => {
          if (err) {
            return reject(err);
          }
          return resolve();
      })
    });
  }

  /**
     * Create the converter
     *
     * @param {string} file
     * @param {string} output
     * @param {string} customConverter
     *
     * @return {object}
     */
  static create ({
    file,
    output,
    customConverter
  }) {
    const converter = new Converter();

    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);

    return converter;
  }
}

module.exports = {
  Converter,
  File,
  folderExists,
  fileExists,
  getFileName
};
