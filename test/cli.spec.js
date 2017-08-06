const { expect } = require('chai');
const exec = require('child_process').exec;
const { isValidOtp } = require('./resources/utils');
const log = require('debug')('motp:cli:spec');

const execWithParams = (params) => new Promise((resolve, reject) => {
  exec(`./index.js ${params.join(' ')}`, (err, stdout, stderr) => {
    const outputToConsole = () => {
      log(`STDOUT:\n\n${stdout}\n\n`);
      log(`STDERR:\n\n${stderr}\n\n`);
    };

    if (err) {
      console.error(err);
      outputToConsole();
      reject(err);
    }
    outputToConsole();
    resolve(stdout);
  });
});

describe.only('CLI', () => {
  it('Given a QR file path with QR flag - Should scan a file and output the OTP value', () => {
    return execWithParams(['./test/resources/qr/1.png', '--qr'])
      .then(res => {
        log('cli res is');
        expect(isValidOtp(res)).to.be.true;
      });
  });
});
