const OtpLib = require('otplib').default;

module.exports.generateOTP = (key) => OtpLib.authenticator.generate(key);
