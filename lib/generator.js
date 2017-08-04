const OtpLib = require('otplib').default;

module.exports.generate = (key) => OtpLib.authenticator.generate(key);