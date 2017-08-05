const { insert, remove } = require('../lib/storage');
const { expect } = require('chai');

describe('Storage', () => {
  it('Writes key/alias pairs to storage', () => {
    return insert({ alias: 'test1', key: 'ZVMDU4NOTXEJGGET' })
      .then(res => {
        expect(res.key).to.be.equal('ZVMDU4NOTXEJGGET');
      });
  });

  it('Removes key/alias pairs from storage', () => {
    return remove('test1')
      .then(numRemoved => {
        expect(numRemoved).to.be.equal(1);
      });
  });
});
