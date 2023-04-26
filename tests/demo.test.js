const { expect } = require('chai');
const checkPrime = require('../maths'); // import checkPrime function

describe('test suite', () => { // describe is from mocha - don't need to import it
  it('should equal 2', () => { // it - is a test
    expect(1 + 1).to.equal(2);
  });
});

describe('check if prime number', () => {
  it('13 should equal true', () => {
    expect(checkPrime(13)).to.equal(true);
  });
  it('6 should equal false', () => {
    expect(checkPrime(6)).to.equal(false);
  });
  it('1 should equal false', () => {
    expect(checkPrime(1)).to.equal(false);
  });
  it('2 should equal true', () => {
    expect(checkPrime(2)).to.equal(true);
  });
  it('7673 should equal true', () => {
    expect(checkPrime(7673)).to.equal(true);
  });
  it('7000 should equal false', () => {
    expect(checkPrime(7000)).to.equal(false);
  });
});
