const BASE32_REGEXP = /^(?:[A-Z2-7]{8})*(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}=)?$/i;

const isNotEmptyAndIsBase32 = (str) =>
  str.length > 0 && BASE32_REGEXP.test(str);

module.exports.isValidOtp = (otp) =>
  otp.length === 6 && !!Number(otp) === true;

module.exports.isValidKey = (key) => isNotEmptyAndIsBase32(key);

module.exports.EXAMPLE_KEY = 'ZVMDU4NOTXEJGGET';
module.exports.TOTP_URL_START = 'otpauth://totp/';
module.exports.IMAGE_TO_EXPECTATION = [
  ['./test/resources/qr/1.png', 'roberto@heapsource.com?secret=2z6hxkdwi3uvrnpn'],
  ['./test/resources/qr/2.png', 'me@brool.com?secret=ZVMDU4NOTXEJGGET'],
];
