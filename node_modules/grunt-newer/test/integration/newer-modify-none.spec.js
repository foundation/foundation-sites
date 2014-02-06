var path = require('path');

var helper = require('../helper');

var name = 'newer-modify-none';
var gruntfile = path.join(name, 'gruntfile.js');

describe(name, function() {
  var fixture;

  it('runs the default task (see ' + gruntfile + ')', function(done) {
    this.timeout(6000);
    helper.buildFixture(name, function(error, dir) {
      fixture = dir;
      done(error);
    });
  });

  after(function(done) {
    helper.afterFixture(fixture, done);
  });

});
