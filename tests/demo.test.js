const {expect} = require(`chai`);

describe(`test suite`, ()=>{ // describe is from mocha - don't need to import it
    it(`should equal 2`, ()=>{ // it - is a test
        expect(1+1).to.equal(2);
    });
});