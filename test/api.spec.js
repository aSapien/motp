const API = require('../lib/api');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const storage = require('../lib/storage');
const { isValidOtp, EXAMPLE_KEY } = require('./resources/utils');
const _ = require('lodash');

chai.use(sinonChai);
const expect = chai.expect;

describe('API', () => {
  describe('exec() function', () => {
    it('Given a QR file path - Should return the resulting OTP string', () => {
      return API.exec('./test/resources/qr/1.png')
        .then(res => {
          expect(isValidOtp(res)).to.be.true;
        });
    });

    it('Given a QR file path, with --save-as <name> flag - Should save the key represented in the QR image under <name>', () => {
      sinon.stub(storage, 'insert').resolves('1'.repeat(5));

      return API.exec('./test/resources/qr/2.png', { saveAs: 'some-name-here' })
        .then(res => {
          expect(isValidOtp(res)).to.be.true;
          expect(storage.insert, 'Called insert()').to.have.been.calledWithExactly({ alias: 'some-name-here', key: EXAMPLE_KEY });

          storage.insert.restore();
        });
    });

    it('Given a list flag (--list) - Should ouptut all saved pairs', () => {
      return storage
        .insert({ key: 'key', alias: 'alias' })
        .then(() => API.exec(`doesn't really matter`, { list: true }))
        .then(res => {
          const data = _.pick(res[0], ['key', 'alias']);
          expect(data).to.be.deep.equal({ key: 'key', alias: 'alias' });
        });
    });
  });
});
