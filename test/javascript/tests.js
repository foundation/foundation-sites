var expect = chai.expect;

describe('Foundation', function() {
  it('should be a jQuery prototype function', function() {
    expect($.fn.foundation).to.be.a('function');
  });
});
