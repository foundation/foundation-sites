var mock = require('mock-fs');
var rewire = require('rewire');

var assert = require('../helper').assert;

var fs = mock.fs();
var util = rewire('../../lib/util');
util.__set__('fs', fs);

describe('util', function() {

  describe('filterPathsByTime()', function() {

    beforeEach(function() {
      fs._reconfigure({
        src: {
          js: {
            'a.js': mock.file({
              mtime: new Date(100)
            }),
            'b.js': mock.file({
              mtime: new Date(200)
            }),
            'c.js': mock.file({
              mtime: new Date(300)
            })
          }
        }
      });
    });

    it('calls callback with files newer than provided time', function(done) {

      var paths = [
        'src/js/a.js',
        'src/js/b.js',
        'src/js/c.js'
      ];

      util.filterPathsByTime(paths, new Date(150), function(err, results) {
        if (err) {
          return done(err);
        }
        assert.equal(results.length, 2);
        assert.deepEqual(results.sort(), ['src/js/b.js', 'src/js/c.js']);
        done();
      });

    });

    it('calls callback error if file not found', function(done) {

      var paths = [
        'src/bogus-file.js'
      ];

      util.filterPathsByTime(paths, new Date(150), function(err, results) {
        assert.instanceOf(err, Error);
        assert.equal(results, undefined);
        done();
      });

    });

  });

  describe('anyNewer()', function() {

    beforeEach(function() {
      fs._reconfigure({
        src: {
          js: {
            'a.js': mock.file({
              mtime: new Date(100)
            }),
            'b.js': mock.file({
              mtime: new Date(200)
            }),
            'c.js': mock.file({
              mtime: new Date(300)
            })
          }
        }
      });
    });

    var paths = [
      'src/js/a.js',
      'src/js/b.js',
      'src/js/c.js'
    ];

    it('calls callback with true if any file is newer', function(done) {
      util.anyNewer(paths, new Date(250), function(err, newer) {
        if (err) {
          return done(err);
        }
        assert.isTrue(newer);
        done();
      });
    });

    it('calls callback with false if no files are newer', function(done) {
      util.anyNewer(paths, new Date(350), function(err, newer) {
        if (err) {
          return done(err);
        }
        assert.isFalse(newer);
        done();
      });
    });

    it('calls callback with error if file not found', function(done) {
      util.anyNewer(['bogus/file.js'], new Date(350), function(err, newer) {
        assert.instanceOf(err, Error);
        assert.equal(newer, undefined);
        done();
      });
    });

  });

  describe('filterFilesByTime()', function() {

    beforeEach(function() {
      fs._reconfigure({
        src: {
          js: {
            'a.js': mock.file({
              mtime: new Date(100)
            }),
            'b.js': mock.file({
              mtime: new Date(200)
            }),
            'c.js': mock.file({
              mtime: new Date(300)
            })
          },
          less: {
            'one.less': mock.file({mtime: new Date(100)}),
            'two.less': mock.file({mtime: new Date(200)})
          }
        },
        dest: {
          js: {
            'abc.min.js': mock.file({
              mtime: new Date(200)
            })
          },
          css: {
            'one.css': mock.file({mtime: new Date(100)}),
            'two.css': mock.file({mtime: new Date(150)})
          }
        }
      });
    });

    it('provides all files if any is newer than dest', function(done) {
      var files = [{
        src: ['src/js/a.js', 'src/js/b.js', 'src/js/c.js'],
        dest: 'dest/js/abc.min.js'
      }];
      util.filterFilesByTime(files, new Date(1000), function(err, results) {
        assert.isNull(err);
        assert.equal(results.length, 1);
        var result = results[0];
        assert.equal(result.dest, 'dest/js/abc.min.js');
        assert.equal(result.src.length, 3);
        assert.deepEqual(result.src.sort(), files[0].src);
        done();
      });
    });

    it('provides all files if dest does not exist', function(done) {
      var files = [{
        src: ['src/js/a.js', 'src/js/b.js', 'src/js/c.js'],
        dest: 'dest/js/foo.min.js'
      }];
      util.filterFilesByTime(files, new Date(1000), function(err, results) {
        assert.isNull(err);
        assert.equal(results.length, 1);
        var result = results[0];
        assert.equal(result.dest, 'dest/js/foo.min.js');
        assert.equal(result.src.length, 3);
        assert.deepEqual(result.src.sort(), files[0].src);
        done();
      });
    });

    it('provides files newer than previous if no dest', function(done) {
      var files = [{
        src: ['src/js/a.js', 'src/js/b.js', 'src/js/c.js']
      }];
      util.filterFilesByTime(files, new Date(200), function(err, results) {
        assert.isNull(err);
        assert.equal(results.length, 1);
        var result = results[0];
        assert.isUndefined(result.dest);
        assert.deepEqual(result.src, ['src/js/c.js']);
        done();
      });
    });

    it('provides only newer files for multiple file sets', function(done) {
      var files = [{
        src: ['src/less/one.less'],
        dest: 'dest/css/one.css'
      }, {
        src: ['src/less/two.less'],
        dest: 'dest/css/two.css'
      }];
      util.filterFilesByTime(files, new Date(1000), function(err, results) {
        assert.isNull(err);
        assert.equal(results.length, 1);
        var result = results[0];
        assert.equal(result.dest, 'dest/css/two.css');
        assert.deepEqual(result.src, ['src/less/two.less']);
        done();
      });
    });

    it('provides an error for a bogus src path', function(done) {
      var files = [{
        src: ['src/less/bogus.less'],
        dest: 'dest/css/one.css'
      }];
      util.filterFilesByTime(files, new Date(1000), function(err, results) {
        assert.instanceOf(err, Error);
        assert.isUndefined(results);
        done();
      });
    });

  });

});
