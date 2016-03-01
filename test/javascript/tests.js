chai.should();

describe('Foundation core', function() {
  it('should be a jQuery prototype function', function() {
    ($.fn.foundation).should.to.be.a('function');
  });
});
