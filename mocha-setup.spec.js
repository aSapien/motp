const { writeFile } = require('fs-extra');
require('chai').use(require('sinon-chai'));

const log = require('debug')('motp:mocha-setup');

const TEMP_STORGE_LOCATION = './temp/storage';

const setupAndTeardown = (done) => {
  log('Emptying embedded storage');
  return writeFile(`${TEMP_STORGE_LOCATION}/keys.db`, '', 'utf-8', (err) => {
    if (!err) return done();
    throw err;
  });
};

afterEach(setupAndTeardown);
