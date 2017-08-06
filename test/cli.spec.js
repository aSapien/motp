const { expect } = require('chai');
const exec = require('child_process').exec;
const { isValidOtp, isValidKey, EXAMPLE_KEY } = require('./resources/utils');
const { setTestEnv } = require('../isTestEnv');
const log = require('debug')('motp:cli:spec');

const execWithParams = (params) => new Promise((resolve, reject) => {
  exec(`./index.js ${params.join(' ')} --is-test`, (err, stdout, stderr) => {
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

describe('CLI', () => {
  beforeEach(setTestEnv);

  it('Given a QR file path with QR flag - Should scan a file and output the OTP value', () => {
    return execWithParams(['./test/resources/qr/1.png', '-q'])
      .then(res => {
        expect(isValidOtp(res.trim())).to.be.true;
      });
  });

  it('Given a QR file path with QR flag and (toKey) flag - Should scan a file and output the KEY value', () => {
    return execWithParams(['./test/resources/qr/1.png', '--from-qr', '--to-key'])
      .then(res => {
        expect(isValidKey(res.trim())).to.be.true;
      });
  });

  it('Given a key with (fromKey) flag - Should generate and output the OTP value', () => {
    return execWithParams([EXAMPLE_KEY, '--from-key'])
      .then(res => {
        expect(isValidOtp(res.trim())).to.be.true;
      });
  });

  it('Given a key with (fromKey) flag and (toKey) - Should return the key as is', () => {
    return execWithParams([EXAMPLE_KEY, '--from-key', '--to-key'])
      .then(res => {
        expect(res.trim()).to.be.equal(EXAMPLE_KEY);
      });
  });

  it('Given a (saveAs <name>) flag - Should save the resulting key, and (list) should print it', () => {
    const aPair = { key: `some-key-here_${Math.random().toFixed(1)}`, alias: `some-other-alias-here_${Math.random().toFixed(1) * 10}` };
    return execWithParams([aPair.key, '--save-as', aPair.alias, '--from-key'])
      .then(() => execWithParams(['something', '--list']))
      .then(resArrStr => {
        expect(resArrStr)
          .to.contain(aPair.key)
          .and
          .to.contain(aPair.alias);
      });
  });
});
