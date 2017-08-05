const API = require('../lib/api');
const { expect } = require('chai');

describe('API', () => {
  it('Given a QR file path - Should return the resulting OTP string', () => {
    return API.qrToOTP('./test/resources/qr/1.png')
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });

  it('Given a QR file path, with --key flag - Should return the key, represented in the QR image', () => {
    return API.qrToKey('./test/resources/qr/1.png')
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });

  it('Given a QR file path, with --save <name> flag - Should save the key represented in the QR image under <name>', () => {
    return API.qrToKey('./test/resources/qr/1.png', { save: true })
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });

  it('Given a --list flag - Should list a map of all saved services and corresponding keys', () => {
    return API.qrToKey('./test/resources/qr/1.png', { list: true })
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });

  it('Given a --remove flag - Should remove the <name>=<key> pair from the map of all saved services', () => {
    return API.qrToKey('./test/resources/qr/1.png', { remove: true })
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });

  it('Given a key, with --save-as <name> flag - Should save the ', () => {
    return API.qrToKey('./test/resources/qr/1.png')
      .then(res => {
        expect(res).to.be.lengthOf(6);
        expect(!!Number(res)).to.be.true;
      });
  });
});
