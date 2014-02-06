/*global before,describe,it */
var fs = require('fs');

var assert = require('chai').assert;

var common = require('./helpers/common');

var tar = require('../lib/headers/tar');
var zip = require('../lib/headers/zip');

var testDate = new Date('Jan 03 2013 14:26:38 GMT');
var testDateEpoch = 1357223198;

describe('headers', function() {

  describe('tar', function() {
    var fileFixture = fs.readFileSync('test/fixtures/headers/tar-file.bin');
    var filePrefixFixture = fs.readFileSync('test/fixtures/headers/tar-fileprefix.bin');

    describe('#encode(type, object)', function() {

      describe('type->file', function() {
        var actual = tar.encode('file', {
          name: 'test.txt',
          date: testDate,
          mode: 0644,
          size: 23,
          owner: 'test',
          group: 'test'
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should have a length of 512 bytes', function() {
          assert.lengthOf(actual, 512);
        });

        it('should match provided fixture', function() {
          //fs.writeFileSync('test/fixtures/headers/tar-file.bin', actual);
          assert.deepEqual(actual.toString(), fileFixture.toString());
        });

        it('should use prefix for deep paths', function() {
          var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
          deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
          deepPath += 'holobndxfccyecblhcc/';
          deepPath += deepPath;

          var actual = tar.encode('file', {
            name: deepPath + 'test.txt',
            date: testDate,
            size: 23
          });

          //fs.writeFileSync('test/fixtures/headers/tar-fileprefix.bin', actual);
          assert.deepEqual(actual.toString(), filePrefixFixture.toString());
        });
      });

    });

    describe('#decode(type, buffer)', function() {

      describe('type->file', function() {
        var actual = tar.decode('file', fileFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should properly decode pre-posix attributes', function() {
          assert.equal(actual.name, 'test.txt');
          assert.equal(actual.uid, 0);
          assert.equal(actual.gid, 0);
          assert.equal(actual.mode, 420);
          assert.equal(actual.size, 23);
          assert.deepEqual(actual.date, testDate);
          assert.equal(actual.mtime, testDateEpoch);
          assert.equal(actual.checksum, 5490);
          assert.equal(actual.type, '0');
          assert.equal(actual.linkName, '');
        });

        it('should properly decode ustar attributes', function() {
          assert.equal(actual.ustar, true);
          assert.equal(actual.ustarVersion, '00');
          assert.equal(actual.owner, 'test');
          assert.equal(actual.group, 'test');
          assert.equal(actual.devMajor, 0);
          assert.equal(actual.devMinor, 0);
          assert.equal(actual.prefix, '');
        });
      });

    });

    describe('HeaderTarFile', function() {
      var HeaderTarFile = tar.file;
      var thing = new HeaderTarFile();

      describe('#_parseNumeric(num, len)', function() {
        it('should convert octal strings to numeric values', function() {
          assert.equal(thing._parseNumeric('00000021'), 17);
        });
      });

      describe('#_prepNumeric(num, len)', function() {
        it('should convert numeric values to octal strings, padding when needed', function() {
          assert.equal(thing._prepNumeric(17, 7), '000021\0');
        });
      });

      describe('#_splitFilePath(filepath)', function() {
        it('should split a filepath into a name and prefix', function() {
          var deepPath = 'vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/';
          deepPath += 'qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/';
          deepPath += 'holobndxfccyecblhcc/';
          deepPath += deepPath;

          var actual = thing._splitFilePath(deepPath + 'file.txt');

          assert.deepEqual(actual, [
            "qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/holobndxfccyecblhcc/file.txt",
            "vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz/qcbclwjhktiazmhnsjt/kpsgdfyfkarbvnlinrt/" +
            "holobndxfccyecblhcc/vvmbtqhysigpregbdrc/pyqaznbelhppibmbykz"
          ]);
        });
      });

    });

  });


  describe('zip', function() {
    var fileFixture = fs.readFileSync('test/fixtures/headers/zip-file.bin');
    var fileDescriptorFixture = fs.readFileSync('test/fixtures/headers/zip-filedescriptor.bin');
    var centralDirectoryFixture = fs.readFileSync('test/fixtures/headers/zip-centralheader.bin');
    var centralFooterFixture = fs.readFileSync('test/fixtures/headers/zip-centralfooter.bin');

    describe('#encode(type, object)', function() {

      describe('type->file', function() {
        var actual = zip.encode('file', {
          name: 'test.txt',
          filenameLength: 8,
          date: testDate,
          comment: '',
          mode: null,
          store: true,
          lastModifiedDate: 1109619539,
          versionMadeBy: 20,
          versionNeededToExtract: 20,
          flags: 2056,
          compressionMethod: 0,
          uncompressedSize: 0,
          compressedSize: 0,
          offset: 0
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, fileFixture);
        });
      });

      describe('type->fileDescriptor', function() {
        var actual = zip.encode('fileDescriptor', {
          crc32: 585446183,
          uncompressedSize: 19,
          compressedSize: 19,
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, fileDescriptorFixture);
        });
      });

      describe('type->centralDirectory', function() {
        var actual = zip.encode('centralDirectory', {
          name: 'test.txt',
          filenameLength: 8,
          date: testDate,
          store: true,
          comment: '',
          mode: null,
          lastModifiedDate: 1109619539,
          versionMadeBy: 20,
          versionNeededToExtract: 20,
          flags: 2056,
          compressionMethod: 0,
          uncompressedSize: 19,
          compressedSize: 19,
          offset: 0,
          crc32: 585446183
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, centralDirectoryFixture);
        });
      });

      describe('type->centralFooter', function() {
        var actual = zip.encode('centralFooter', {
          directoryRecordsDisk: 1,
          directoryRecords: 1,
          centralDirectorySize: 56,
          centralDirectoryOffset: 73,
          comment: ''
        });

        it('should return an instance of Buffer', function() {
          assert.instanceOf(actual, Buffer);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, centralFooterFixture);
        });
      });

    });

    describe('#decode(type, buffer)', function() {

      describe('type->file', function() {
        var actual = zip.decode('file', fileFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, {
            signature: 67324752,
            versionNeededToExtract: 20,
            flags: 2056,
            compressionMethod: 0,
            lastModifiedDate: 1109619539,
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0,
            filenameLength: 8,
            extraFieldLength: 0,
            name: 'test.txt',
            extraField: null
          });
        });
      });

      describe('type->fileDescriptor', function() {
        var actual = zip.decode('fileDescriptor', fileDescriptorFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, {
            signature: 134695760,
            crc32: 585446183,
            uncompressedSize: 19,
            compressedSize: 19,
          });
        });
      });

      describe('type->centralDirectory', function() {
        var actual = zip.decode('centralDirectory', centralDirectoryFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, {
            signature: 33639248,
            versionMadeBy: 20,
            versionNeededToExtract: 20,
            flags: 2056,
            compressionMethod: 0,
            lastModifiedDate: 1109619539,
            crc32: 585446183,
            compressedSize: 19,
            uncompressedSize: 19,
            filenameLength: 8,
            extraFieldLength: 0,
            commentLength: 0,
            diskNumberStart: 0,
            internalFileAttributes: 0,
            externalFileAttributes: 0,
            offset: 0,
            name: 'test.txt',
            extraField: null,
            comment: null
          });
        });
      });

      describe('type->centralFooter', function() {
        var actual = zip.decode('centralFooter', centralFooterFixture);

        it('should return an object', function() {
          assert.isObject(actual);
        });

        it('should match provided fixture', function() {
          assert.deepEqual(actual, {
            signature: 101010256,
            diskNumber: 0,
            diskNumberStart: 0,
            directoryRecordsDisk: 1,
            directoryRecords: 1,
            centralDirectorySize: 56,
            centralDirectoryOffset: 73,
            commentLength: 0,
            comment: null
          });
        });
      });

    });

  });

});