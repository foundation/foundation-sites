/**
 * node-archiver
 *
 * Copyright (c) 2012-2013 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */

var inherits = require('util').inherits;

var Archiver = require('./core');
var headers = require('../headers/zip');
var util = require('../util');
var DeflateRawChecksum = require('../util/DeflateRawChecksum');
var ChecksumStream = require('../util/ChecksumStream');

var ArchiverZip = module.exports = function(options) {
  Archiver.call(this, options);

  options = this.options = util.defaults(options, {
    comment: '',
    forceUTC: false,
    zlib: {
      level: 1
    }
  });

  if (options.level && options.level >= 0) {
    options.zlib.level = options.level;
    delete options.level;
  }
};

inherits(ArchiverZip, Archiver);

ArchiverZip.prototype._flush = function(callback) {
  this._buildCentralDirectory();

  callback();
};

ArchiverZip.prototype._buildCentralDirectory = function() {
  var files = this.archiver.files;
  var comment = this.options.comment;
  var cdoffset = this.archiver.pointer;

  var ptr = 0;
  var centralDirectoryBuffer;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    centralDirectoryBuffer = headers.encode('centralDirectory', file);
    this._push(centralDirectoryBuffer);
    ptr += centralDirectoryBuffer.length;
  }

  var cdsize = ptr;
  var centralDirectoryFooterData = {
    directoryRecordsDisk: files.length,
    directoryRecords: files.length,
    centralDirectorySize: cdsize,
    centralDirectoryOffset: cdoffset,
    comment: comment
  };
  var centralDirectoryFooterBuffer = headers.encode('centralFooter', centralDirectoryFooterData);

  this._push(centralDirectoryFooterBuffer);
};

ArchiverZip.prototype._normalizeFileData = function(data) {
  data = util.defaults(data, {
    name: null,
    date: null,
    store: false,
    comment: ''
  });

  data.name = util.sanitizeFilePath(data.name);
  data.date = util.dateify(data.date);

  if (typeof data.lastModifiedDate !== 'number') {
    data.lastModifiedDate = util.dosDateTime(data.date, this.options.forceUTC);
  }

  if (this.options.zlib && this.options.zlib.level === 0) {
    data.store = true;
  }

  data.flags = (1<<3) | (1<<11);
  data.compressionMethod = data.store ? 0 : 8;
  data.uncompressedSize = 0;
  data.compressedSize = 0;

  return data;
};

ArchiverZip.prototype._processFile = function(source, data, callback) {
  var self = this;

  var file = self.archiver.file = data;

  file.offset = self.archiver.pointer;

  self._push(headers.encode('file', file));

  var deflate;
  var checksumr;

  function onend() {
    self._push(headers.encode('fileDescriptor', file));

    callback(null, file);
  }

  if (file.store === false) {
    deflate = new DeflateRawChecksum(self.options.zlib);

    deflate.on('error', callback);

    deflate.on('end', function() {
      file.crc32 = deflate.digest;
      file.uncompressedSize = deflate.rawSize;
      file.compressedSize = deflate.compressedSize;

      onend();
    });

    // archiver and deflate are having disagreements
    // over piping at this point in time so archiver
    // had to be the adult and move on with hopes of
    // making up in the future :) - 20130818
    // deflate.pipe(self, { end: false });

    deflate.on('data', function(data) {
      self._push(data);
    });
  } else {
    checksumr = new ChecksumStream();

    checksumr.on('error', callback);

    checksumr.on('end', function () {
      file.uncompressedSize = checksumr.rawSize;
      file.compressedSize = checksumr.rawSize;
      file.crc32 = checksumr.digest;

      onend();
    });

    checksumr.pipe(self, { end: false });
  }

  if (file.sourceType === 'buffer') {
    if (file.store) {
      file.uncompressedSize += source.length;
      file.compressedSize = file.uncompressedSize;
      file.crc32 = util.crc32.createCRC32().update(source).digest();

      self._push(source);
      onend();
    } else {
      deflate.end(source);
    }
  } else if (file.sourceType === 'stream') {
    if (file.store) {
      source.pipe(checksumr);
    } else {
      source.pipe(deflate);
    }
  }
};