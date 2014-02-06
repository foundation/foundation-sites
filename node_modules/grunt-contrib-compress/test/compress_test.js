'use strict';

var grunt = require('grunt');
var path = require('path');
var zlib = require('zlib');
var fs = require('fs');
var unzip = require('unzip');
var tar = require('tar');
var compress = require('../tasks/lib/compress')(grunt);

exports.compress = {
  zip: function(test) {
    test.expect(1);
    var expected = [
      'folder_one/one.css', 'folder_one/one.js',
      'folder_two/two.css', 'folder_two/two.js',
      'test.css', 'test.js',
    ];
    var actual = [];
    var parse = unzip.Parse();
    fs.createReadStream(path.join('tmp', 'compress_test_files.zip')).pipe(parse);
    parse.on('entry', function(entry) {
      actual.push(entry.path);
    });
    parse.on('close', function() {
      test.deepEqual(actual, expected, 'zip file should unzip and contain all of the expected files');
      test.done();
    });
  },
  tar: function(test) {
    test.expect(1);
    var expected = [
      'folder_one/one.css', 'folder_one/one.js',
      'folder_two/two.css', 'folder_two/two.js',
      'test.css', 'test.js',
    ];
    var actual = [];
    var parse = tar.Parse();
    fs.createReadStream(path.join('tmp', 'compress_test_files.tar')).pipe(parse);
    parse.on('entry', function(entry) {
      actual.push(entry.path);
    });
    parse.on('end', function() {
      test.deepEqual(actual, expected, 'tar file should untar and contain all of the expected files');
      test.done();
    });
  },
  tgz: function(test) {
    test.expect(1);
    var expected = [
      'folder_one/one.css', 'folder_one/one.js',
      'folder_two/two.css', 'folder_two/two.js',
      'test.css', 'test.js',
    ];
    var actual = [];
    var parse = tar.Parse();
    fs.createReadStream(path.join('tmp', 'compress_test_files.tgz'))
      .pipe(zlib.createGunzip())
      .pipe(parse);
    parse.on('entry', function(entry) {
      actual.push(entry.path);
    });
    parse.on('end', function() {
      test.deepEqual(actual, expected, 'tgz file should gunzip/untar and contain all of the expected files');
      test.done();
    });
  },
  gzip: function(test) {
    test.expect(3);
    grunt.util.async.forEachSeries([
      'test.js',
      path.join('folder_one', 'one.css'),
      path.join('folder_two', 'two.js'),
    ], function(file, next) {
      var expected = grunt.file.read(path.join('test', 'fixtures', file));
      var actual = '';
      fs.createReadStream(path.join('tmp', 'gzip', file + '.gz'))
        .pipe(zlib.createGunzip())
        .on('data', function(buf) {
          actual += buf.toString();
        })
        .on('end', function() {
          test.equal(actual, expected, 'should be equal to fixture after gunzipping');
          next();
        });
    }, test.done);
  },
  gzipCustomExt: function(test) {
    test.expect(3);
    [
      'test',
      'folder_one/one',
      'folder_two/two',
    ].forEach(function(file) {
      var expected = path.join('tmp', 'gzipCustomExt', file + '.gz.js');
      test.ok(grunt.file.exists(expected), 'should of had a correct extension.');
    });
    test.done();
  },
  deflate: function(test) {
    test.expect(3);
    grunt.util.async.forEachSeries([
      'test.js',
      path.join('folder_one', 'one.css'),
      path.join('folder_two', 'two.js'),
    ], function(file, next) {
      var expected = grunt.file.read(path.join('test', 'fixtures', file));
      var actual = '';
      fs.createReadStream(path.join('tmp', 'deflate', file + '.deflate'))
        .pipe(zlib.createInflate())
        .on('data', function(buf) {
          actual += buf.toString();
        })
        .on('end', function() {
          test.equal(actual, expected, 'should be equal to fixture after inflating');
          next();
        });
    }, test.done);
  },
  deflateRaw: function(test) {
    test.expect(3);
    grunt.util.async.forEachSeries([
      'test.js',
      path.join('folder_one', 'one.css'),
      path.join('folder_two', 'two.js'),
    ], function(file, next) {
      var expected = grunt.file.read(path.join('test', 'fixtures', file));
      var actual = '';
      fs.createReadStream(path.join('tmp', 'deflateRaw', file + '.deflate'))
        .pipe(zlib.createInflateRaw())
        .on('data', function(buf) {
          actual += buf.toString();
        })
        .on('end', function() {
          test.equal(actual, expected, 'should be equal to fixture after inflateRaw-ing');
          next();
        });
    }, test.done);
  },
};