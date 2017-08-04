const { expect } = require('chai');

describe('Dependencies', () => {
    it('Should be satisfied', () => {
        expect(require('otplib')).to.exist;
    });
});