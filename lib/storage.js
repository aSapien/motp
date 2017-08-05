const { existsSync, mkdirSync, writeFileSync } = require('fs');

const storageFolder = `${process.cwd()}/storage`;
const storageJson = 'storage.json';
const storageFilePath = `${storageFolder}/${storageJson}`;

const createDir = () => {
  mkdirSync(`${process.cwd()}/storage`);
};

const createJson = () => {
  writeFileSync(storageFilePath, '{}', 'UTF-8');
};

const setup = () => {
  if (!existsSync(storageFolder)) {
    createDir();
  }

  if (!existsSync(storageFilePath)) {
    createJson();
  }
};

module.exports.createDir = createDir;

/**
 * @param Schema {Object}
 * @returns Schema {Object}
 * 
 * service {String}: Name of service
 * key {string}: Secret for generating OTP
 * lastUpdated {Integer}: Last updated timestamp
 * alias {String}: An alias for getting the OTP into the clipboard from terminal
 * 
 */
module.exports.save = () => {
  setup();
};
