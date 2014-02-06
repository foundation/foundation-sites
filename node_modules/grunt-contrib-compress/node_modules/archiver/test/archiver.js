/*global before,describe,it */
var fs = require('fs');
var PassThrough = require('stream').PassThrough || require('readable-stream/passthrough');

var assert = require('chai').assert;
var mkdir = require('mkdirp');

var common = require('./helpers/common');
var HashStream = common.HashStream;
var UnBufferedStream = common.UnBufferedStream;
var WriteHashStream = common.WriteHashStream;
var binaryBuffer = common.binaryBuffer;

var archiver = require('../lib/archiver');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDate2 = new Date('Feb 10 2013 10:24:42 GMT');

describe('archiver', function() {

  before(function() {
    mkdir.sync('tmp');
  });


  describe('Archiver', function() {
    var ArchiverCore = require('../lib/archiver/core');

    describe('#_normalizeSource(source)', function() {
      var core = new ArchiverCore();

      it('should normalize strings to an instanceOf Buffer', function() {
        var normalized = core._normalizeSource('some string');

        assert.instanceOf(normalized, Buffer);
      });

      it('should normalize older unbuffered streams', function() {
        var noBufferStream = new UnBufferedStream();
        var normalized = core._normalizeSource(noBufferStream);

        assert.instanceOf(normalized, PassThrough);
      });
    });

    describe('#_normalizeStream(source)', function() {
      var core = new ArchiverCore();

      it('should normalize older unbuffered streams', function() {
        var noBufferStream = new UnBufferedStream();
        var normalized = core._normalizeStream(noBufferStream);

        assert.instanceOf(normalized, PassThrough);
      });
    });

  });


  describe('tar', function() {

    describe('#append', function() {
      it('should append Buffer sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/buffer.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'bc84fec33e7a4f6c8777cabd0beba503a7bce331');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate })
          .finalize();
      });

      it('should append Stream sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/stream.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'b3bf662968c87989431a25b2f699eae213392e82');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });

      it('should append multiple sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/multiple.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '0c4e2a79d0d2c41ae5eb2e1e70d315a617583e4d');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('string', { name: 'string.txt', date: testDate })
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate2 })
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });

      it('should use prefix for deep paths', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/feature-prefix.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'c1efbfbdc9a49979a6e02b4009003de533fcda48');
          done();
        });

        archive.pipe(testStream);

        var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
        deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
        deepPath += 'holobndxfccyecblhcc/';
        deepPath += deepPath;

        archive
          .append('deep path', { name: deepPath + 'file.txt', date: testDate })
          .finalize();
      });

      it('should append zero length sources', function(done) {
        var archive = archiver('tar');
        var testStream = new WriteHashStream('tmp/zerolength.tar');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'f4f7b53f8ee4c7124298695bffbacfa9e9c0a99f');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('', { name: 'string.txt', date: testDate })
          .append(new Buffer(0), { name: 'buffer.txt', date: testDate })
          .append(fs.createReadStream('test/fixtures/empty.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });
    });

  });


  describe('zip', function() {

    describe('#append', function() {
      it('should append Buffer sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/buffer.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '9c14aaaab831cad774d0dfaf665ae6da8e33577c');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate })
          .finalize();
      });

      it('should append Stream sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/stream.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'd7e3970142a06d4a87fbd6458284eeaf8f5de907');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });

      it('should append multiple sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/multiple.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'dac10ec60ee700ea07a90bca3e6d1a8db2670a9b');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('string', { name: 'string.txt', date: testDate })
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate2 })
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate2 })
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream-store.txt', date: testDate, store: true })
          .finalize();
      });

      it('should support STORE for Buffer sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/buffer-store.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '09305770a3272cbcd7c151ee267cb1b0075dd29e');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate, store: true })
          .finalize();
      });

      it('should support STORE for Stream sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/stream-store.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '999f407f3796b551d91608349a06521b8f80f229');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(fs.createReadStream('test/fixtures/test.txt'), { name: 'stream.txt', date: testDate, store: true })
          .finalize();
      });

      it('should support archive and file comments', function(done) {
        var archive = archiver.createZip({
          comment: 'this is a zip comment',
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/comments.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, 'ea7911cbe2508682c2a17d30b366ac33527ba84f');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), {name: 'buffer.txt', date: testDate, comment: 'this is a file comment'})
          .finalize();
      });

      it('should STORE files when compression level is zero', function(done) {
        var archive = archiver('zip', {
          forceUTC: true,
          zlib: {
            level: 0
          }
        });

        var testStream = new WriteHashStream('tmp/store-level0.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '09305770a3272cbcd7c151ee267cb1b0075dd29e');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'buffer.txt', date: testDate })
          .finalize();
      });

      it('should properly handle accented characters in filenames', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });

        var testStream = new WriteHashStream('tmp/accentedchars-filenames.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '69194ccb7175d7fcfcb06c8cb0ed2c429dadb9f9');
          done();
        });

        archive.pipe(testStream);

        archive
          .append(binaryBuffer(20000), { name: 'àáâãäçèéêëìíîïñòóôõöùúûüýÿ.txt', date: testDate })
          .append(binaryBuffer(20000), { name: 'ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ.txt', date: testDate2 })
          .finalize();
      });

      it('should append zero length sources', function(done) {
        var archive = archiver('zip', {
          forceUTC: true
        });
        var testStream = new WriteHashStream('tmp/zerolength.zip');

        testStream.on('close', function() {
          assert.equal(testStream.digest, '638e64b5b5769d2ad989a153ace568a0279cf6b6');
          done();
        });

        archive.pipe(testStream);

        archive
          .append('', { name: 'string.txt', date: testDate })
          .append(new Buffer(0), { name: 'buffer.txt', date: testDate })
          .append(fs.createReadStream('test/fixtures/empty.txt'), { name: 'stream.txt', date: testDate })
          .finalize();
      });
    });

  });

});