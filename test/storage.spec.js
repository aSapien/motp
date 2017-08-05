const { insert, remove, list } = require('../lib/storage');
const { expect } = require('chai');

// const log = require('debug')('motp:storage:spec');

describe('Storage', () => {
  it('Writes key/alias pairs to storage', () => {
    return insert({ alias: 'test1', key: 'ZVMDU4NOTXEJGGET' })
      .then(res => {
        expect(res.key).to.be.equal('ZVMDU4NOTXEJGGET');
      });
  });

  it('Removes key/alias pairs from storage', () => {
    return insert({ alias: 'test1', key: 'ZVMDU4NOTXEJGGET' })
      .then(res => {
        expect(res.alias).to.be.equal('test1');
      })
      .then(() => remove('test1'))
      .then(numRemoved => {
        expect(numRemoved).to.be.equal(1);
      });
  });

  it('Lists all key/alias pairs from storage', () => {
    return Promise.resolve()
      .then(() => insert({ alias: 'test1', key: 'ZVMDU4NOTXEJGGET' }))
      .then(() => insert({ alias: 'test2', key: 'ZVMDU4NOTXEJGGET' }))
      .then(() => insert({ alias: 'test3', key: 'ZVMDU4NOTXEJGGET' }))
      .then(() => list())
      .then(all => {
        const aliases = all.map((item) => item.alias);
        expect(aliases)
          .to.contain('test1')
          .and.contain('test2')
          .and.contain('test3');
      });
  });
});
