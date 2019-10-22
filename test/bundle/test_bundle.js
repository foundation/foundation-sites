describe('Foundation bundle', function() {

  it('can be imported via AMD', function (done) {

    require(['../../_build/assets/js/foundation'], function(foundation) {
      foundation.Foundation.should.be.an('object');
      done();
    }, function (err) {
      if (err) throw err;
    });

  });

});
