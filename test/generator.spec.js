const { generate } = require('../lib/generator');
const { expect } = require('chai');

describe('Generator', () => {
  it('Should generate a 6-digit code', () => {
    const result = generate('2z6hxkdwi3uvrnpn');

    expect(result).to.be.lengthOf(6);
    expect(!!Number(result)).to.be.true;
  });
});
