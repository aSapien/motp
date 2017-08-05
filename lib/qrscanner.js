const QrCode = require('qrcode-reader');
const Jimp = require('jimp');
const { parse } = require('url-otpauth');

const qr = new QrCode();

const scan = (path) =>
  Jimp.read(path)
    .then(image => new Promise((resolve, reject) => {
      qr.callback = (err, res) => {
        return err ? reject(err) : resolve(res.result);
      };
      qr.decode({ data: image.bitmap.data, width: image.bitmap.width, height: image.bitmap.height });
    }));
/**
 * @param otpURI {String}
 * @returns 
 * {
 *    account {String}: The account name.
 *    digits {Integer}: The number of digits of the resulting OTP. Default is 6 (six).
 *    key {String}: The shared key in Base32 encoding. AKA secret.
 *    issuer {String}: Provider or service this account is associated with. The default is the empty string.
 *    type {String}: Either hotp or totp.
 * }
 */
const parseOtp = (otpURI) => {
  return parse(otpURI);
};

module.exports.scan = scan;
module.exports.parse = parseOtp;
module.exports.getKey = (imgFilePath) =>
  scan(imgFilePath)
    .catch(() => {
      throw new Error(`Couldn't read QR from "${imgFilePath}".`);
    })
    .then(parseOtp)
    .then(({ key }) => key);
