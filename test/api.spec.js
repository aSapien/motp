const API = require('../lib/api');
const chai = require('chai');
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const storage = require('../lib/storage');
const { isValidOtp, EXAMPLE_KEY, isValidKey } = require('./resources/utils');
const { OPTS } = require('../lib/constants');
const _ = require('lodash');

chai.use(sinonChai);
const expect = chai.expect;

describe('API', () => {
  describe('exec() function', () => {
    describe('Acts on _arg_ according to privided options:', () => {

      it('Given (fromQR) flag - Should accept a path and return the resulting OTP string', () => {
        return API.exec('./test/resources/qr/1.png', { [OPTS.FROM_QR]: true })
          .then(res => {
            expect(isValidOtp(res)).to.be.true;
          });
      });

      it('Given (fromKey) flag - Should accept a key string and return the resulting OTP string', () => {
        return API.exec(EXAMPLE_KEY, { [OPTS.FROM_KEY]: true })
          .then(res => {
            expect(isValidOtp(res)).to.be.true;
          });
      });
    });

    it('Given a (toKey) flag - Should accpet a QR and return an the corresponding key', () => {
      return API.exec('./test/resources/qr/2.png', { [OPTS.TO_KEY]: true, [OPTS.FROM_QR]: true })
        .then(res => {
          expect(isValidKey(res)).to.be.true;
        });
    });

    it('Given a (list) flag - Should ignore input arg and ouptut all saved pairs', () => {
      return storage
        .insert({ key: 'key', alias: 'alias' })
        .then(() => API.exec(`this shouldn't doesn't matter`, { [OPTS.LIST]: true }))
        .then(res => {
          const data = _.pick(res[0], ['key', 'alias']);
          expect(data).to.be.deep.equal({ key: 'key', alias: 'alias' });
        });
    });

    it('Given no flags - Should consider arg as alias and return OTP', () => {
      return storage
        .insert({ key: 'key', alias: 'some-alias' })
        .then(() => API.exec('some-alias'))
        .then(res => {
          expect(isValidOtp(res)).to.be.true;
        });
    });

    it('Given a (toKey) flag without (QR) or (fromKey) flags, - should return key', () => {
      return storage
        .insert({ key: 'key', alias: 'some-alias' })
        .then(() => API.exec('some-alias', { [OPTS.TO_KEY]: true }))
        .then(res => {
          expect(res).to.be.equal('key');
        });
    });
  });
});
