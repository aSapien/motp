const { removeSync, existsSync, mkdirpSync, writeFileSync } = require('fs-extra');
require('chai').use(require('sinon-chai'));

const log = require('debug')('motp:mocha-setup');

const TEMP_STORGE_LOCATION = './temp/storage';

const setup = () => {
  if (!existsSync(TEMP_STORGE_LOCATION)) {
    log('writing dir...');
    mkdirpSync(TEMP_STORGE_LOCATION);
    log('writing key file...');
    return writeFileSync('keys.db', '', 'utf-8');
  }
  return log('already exists...');
};

const teardown = () => {
  if (existsSync(TEMP_STORGE_LOCATION)) {
    log(`Removing "${TEMP_STORGE_LOCATION}" folder`);
    return removeSync('./temp/storage');
  }
  return log(`Folder "./temp" doesn't exist. Remove attempt skipped.`);
};

before(setup);
after(teardown);
