const { createDir } = require('../lib/storage');
const { expect } = require('chai');
const { existsSync } = require('fs');

describe('Storage', () => {
  xit('Should create a "storage" folder in root if doesn\'t exist', () => {
    expect(existsSync(`${process.cwd()}/storageTest`)).to.be.false;
    createDir();
    expect(existsSync(`${process.cwd()}/storageTest`)).to.be.true;
  });
});
