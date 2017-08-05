const { getKey } = require('../lib/qrscanner');
const { generate } = require('../lib/generator');

module.exports.qrToOTP = (qrFilePath, opts) =>
  getKey(qrFilePath)
    .then(key => {
      return generate(key);
    })
    .catch(e => console.error(`Couldn't generate OTP from key:\n${e}\n${e.stack}`));

module.exports.qrToSecret = (qrFilePath, opts) =>
  getKey(qrFilePath)
    .catch(e => console.error(`Couldn't generate OTP from key:\n${e}\n${e.stack}`));

module.exports.keyToOtp = (key) =>
  Promise.resolve()
    .then(() => generate(key));

module.exports.aliasToOtp = (alias) =>
  Promise.reject(); // Not-Implemented!!!
