/**
 * node-archiver
 *
 * Copyright (c) 2012-2013 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */

var inherits = require('util').inherits;
var iconv = require('iconv-lite');

function HeaderZip() {
  this.bufferSize = 0;
  this.fields = [];
}

HeaderZip.prototype.toBuffer = function(data) {
  var buf = new Buffer(this.bufferSize);
  var offset = 0;
  var val;
  var fallback;

  data = this._normalize(data);

  this.fields.forEach(function(value) {
    fallback = (value.type === 'string') ? '' : 0;
    val = data[value.field] || value.def || fallback;

    if (value.lenField) {
      value.len = (data[value.lenField] > 0) ? buf.write(val, offset) : 0;
    } else if (typeof buf['write' + value.type] === 'function') {
      buf['write' + value.type](val, offset);
    } else if (val.length > 0) {
      buf.write(val, offset);
    }

    offset += value.len;
  });

  return buf.slice(0, offset);
};

HeaderZip.prototype.toObject = function(buf) {
  var data = {};
  var offset = 0;

  this.fields.forEach(function(value) {
    if (value.lenField) {
      data[value.field] = (data[value.lenField] > 0) ? buf.toString('utf8', offset) : null;
    } else if (typeof buf['read' + value.type] === 'function') {
      data[value.field] = buf['read' + value.type](offset);
    } else {
      data[value.field] = buf.toString(null, offset, value.len);
    }

    offset += value.len;
  });

  return data;
};

HeaderZip.prototype._normalize = function(data) {
  if (data.name) {
    var nameUTF8 = iconv.encode(data.name, 'utf8');
    data.name = iconv.decode(nameUTF8, 'utf8');

    data.filenameLength = nameUTF8.length;

    data.flags |= (1<<11);
  }

  if (data.comment) {
    data.commentLength = data.comment.length;
  }

  if (data.extraField) {
    data.extraFieldLength = data.extraField.length;
  }

  return data;
};

function HeaderZipFile() {
  HeaderZip.call(this);

  this.bufferSize = 1024;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x04034b50},
    {field: 'versionNeededToExtract', len: 2, type: 'UInt16LE', def: 20},
    {field: 'flags', len: 2, type: 'UInt16LE'},
    {field: 'compressionMethod', len: 2, type: 'UInt16LE'},
    {field: 'lastModifiedDate', len: 4, type: 'UInt32LE'},
    {field: 'crc32', len: 4, type: 'Int32LE', def: 0},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'},
    {field: 'filenameLength', len: 2, type: 'UInt16LE'},
    {field: 'extraFieldLength', len: 2, type: 'UInt16LE'},
    {field: 'name', len: -1, lenField: 'filenameLength', type: 'string'},
    {field: 'extraField', len: -1, lenField: 'extraFieldLength', type: 'string'}
  ];
}
inherits(HeaderZipFile, HeaderZip);

function HeaderZipFileDescriptor() {
  HeaderZip.call(this);

  this.bufferSize = 16;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x08074b50},
    {field: 'crc32', len: 4, type: 'Int32LE'},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'}
  ];
}
inherits(HeaderZipFileDescriptor, HeaderZip);

function HeaderZipCentralDirectory() {
  HeaderZip.call(this);

  this.bufferSize = 1024;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x02014b50},
    {field: 'versionMadeBy', len: 2, type: 'UInt16LE', def: 20},
    {field: 'versionNeededToExtract', len: 2, type: 'UInt16LE', def: 20},
    {field: 'flags', len: 2, type: 'UInt16LE'},
    {field: 'compressionMethod', len: 2, type: 'UInt16LE'},
    {field: 'lastModifiedDate', len: 4, type: 'UInt32LE'},
    {field: 'crc32', len: 4, type: 'Int32LE'},
    {field: 'compressedSize', len: 4, type: 'UInt32LE'},
    {field: 'uncompressedSize', len: 4, type: 'UInt32LE'},
    {field: 'filenameLength', len: 2, type: 'UInt16LE'},
    {field: 'extraFieldLength', len: 2, type: 'UInt16LE'},
    {field: 'commentLength', len: 2, type: 'UInt16LE'},
    {field: 'diskNumberStart', len: 2, type: 'UInt16LE'},
    {field: 'internalFileAttributes', len: 2, type: 'UInt16LE'},
    {field: 'externalFileAttributes', len: 4, type: 'UInt32LE'},
    {field: 'offset', len: 4, type: 'UInt32LE'},
    {field: 'name', len: -1, lenField: 'filenameLength', type: 'string'},
    {field: 'extraField', len: -1, lenField: 'extraFieldLength', type: 'string'},
    {field: 'comment', len: -1, lenField: 'commentLength', type: 'string'}
  ];
}
inherits(HeaderZipCentralDirectory, HeaderZip);

function HeaderZipCentralFooter() {
  HeaderZip.call(this);

  this.bufferSize = 512;
  this.fields = [
    {field: 'signature', len: 4, type: 'UInt32LE', def: 0x06054b50},
    {field: 'diskNumber', len: 2, type: 'UInt16LE'},
    {field: 'diskNumberStart', len: 2, type: 'UInt16LE'},
    {field: 'directoryRecordsDisk', len: 2, type: 'UInt16LE'},
    {field: 'directoryRecords', len: 2, type: 'UInt16LE'},
    {field: 'centralDirectorySize', len: 4, type: 'UInt32LE'},
    {field: 'centralDirectoryOffset', len: 4, type: 'UInt32LE'},
    {field: 'commentLength', len: 2, type: 'UInt16LE'},
    {field: 'comment', len: -1, lenField: 'commentLength', type: 'string'}
  ];
}
inherits(HeaderZipCentralFooter, HeaderZip);

var headers = {
  file: new HeaderZipFile(),
  fileDescriptor: new HeaderZipFileDescriptor(),
  centralDirectory: new HeaderZipCentralDirectory(),
  centralFooter: new HeaderZipCentralFooter()
};

var encode = exports.encode = function(type, data) {
  if (!headers[type] || typeof headers[type].toBuffer !== 'function') {
    throw new Error('Unknown encode type');
  }

  return headers[type].toBuffer(data);
};

var decode = exports.decode = function(type, buf) {
  if (!headers[type] || typeof headers[type].toObject !== 'function') {
    throw new Error('Unknown decode type');
  }

  return headers[type].toObject(buf);
};

exports.file = HeaderZipFile;
exports.fileDescriptor = HeaderZipFileDescriptor;
exports.centralDirectory = HeaderZipCentralDirectory;
exports.centralFooter = HeaderZipCentralFooter;