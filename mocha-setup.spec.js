const { writeFile, ensureFileSync } = require('fs-extra');
require('chai').use(require('sinon-chai'));

const log = require('debug')('motp:mocha-setup');

const TEMP_STORGE_LOCATION = './temp/storage/keys.db';

const initialSetup = (done) => {
  log('Creating temp storage file...');
  ensureFileSync(TEMP_STORGE_LOCATION);
  done();
};

const setupAndTeardown = (done) => {
  log('Emptying embedded storage');
  return writeFile(TEMP_STORGE_LOCATION, '', 'utf-8', (err) => {
    if (!err) return done();
    throw err;
  });
};

before(initialSetup);
afterEach(setupAndTeardown);
