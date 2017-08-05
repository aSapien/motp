const { scan } = require('../lib/qrscanner');
const { expect } = require('chai');
const { parse } = require('../lib/qrscanner');
const { TOTP_URL_START, IMAGE_TO_EXPECTATION } = require('./resources/utils');

describe('QR Scanner', () => {
  Array.prototype.forEach.call(IMAGE_TO_EXPECTATION, pair => {
    it(`Should scan a QRcode image at "${pair[0]}" and return raw text representation`, () => {
      return scan(pair[0])
        .then(decoded => {
          expect(decoded).to.be.equals(`${TOTP_URL_START}${pair[1]}`);
        })
        .catch(err => {
          throw err;
        });
    });
  });

  it('Should parse "otpauth://..." uri and extract the "secret" query param as "key"', () => {
    const parsed = parse(`${TOTP_URL_START}${IMAGE_TO_EXPECTATION[0][1]}`);
    expect(parsed.key).to.be.equal('2z6hxkdwi3uvrnpn');
  });
});
