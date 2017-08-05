const { writeFileSync } = require('fs-extra');
require('chai').use(require('sinon-chai'));

const log = require('debug')('motp:mocha-setup');

const TEMP_STORGE_LOCATION = './temp/storage';

const setupAndTeardown = () => {
  log('Emptying embedded storage');
  return writeFileSync(`${TEMP_STORGE_LOCATION}/keys.db`, '', 'utf-8');
};

beforeEach(setupAndTeardown);
