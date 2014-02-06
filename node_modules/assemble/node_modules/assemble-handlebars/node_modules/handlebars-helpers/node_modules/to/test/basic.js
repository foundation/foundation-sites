var to=require('..');
var assert=require('assert');
var handy=require('handy');

// verify basic functions
// - load
// - stringify
describe('basic', function() {
  before(function(done) {
    done();
  });

  // -- check list of modules
  describe('list of modules', function() {
    var modulesAvailable = ['json', 'yaml', 'xml'];
    it('should return the following modules', function(done) {
      assert.equal(handy.isArrayEqual(Object.keys(to.format), modulesAvailable), true);
      done();
    });
    it('check valid formats', function(done) {
      for(var i =0;i<modulesAvailable.length;i++) {
        assert.equal(to.isValidFormat(modulesAvailable[i]),true);
      }
      assert.equal(to.isValidFormat('yml'),true);
      done();
    });
    it('check invalid format', function(done) {
      assert.equal(to.isValidFormat('html'),false);
      done();
    });
  });

});
