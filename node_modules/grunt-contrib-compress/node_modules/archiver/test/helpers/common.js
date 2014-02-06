var crypto = require('crypto');
var fs = require('fs');
var inherits = require('util').inherits;

var Stream = require('stream').Stream;
var Readable = require('stream').Readable || require('readable-stream');
var Writable = require('stream').Writable || require('readable-stream/writable');

function adjustDateByOffset(d, offset) {
  if (offset >= 1) {
    d.setMinutes(d.getMinutes() - offset);
  } else {
    d.setMinutes(d.getMinutes() + Math.abs(offset));
  }

  return d;
}

module.exports.adjustDateByOffset = adjustDateByOffset;

function binaryBuffer(n) {
  var buffer = new Buffer(n);

  for (var i = 0; i < n; i++) {
    buffer.writeUInt8(i&255, i);
  }

  return buffer;
}

module.exports.binaryBuffer = binaryBuffer;

function BinaryStream(size, options) {
  Readable.call(this, options);

  var buf = new Buffer(size);

  for (var i = 0; i < size; i++) {
    buf.writeUInt8(i&255, i);
  }

  this.push(buf);
  this.push(null);
}

inherits(BinaryStream, Readable);

BinaryStream.prototype._read = function(size) {};

module.exports.BinaryStream = BinaryStream;

function DeadEndStream(options) {
  Writable.call(this, options);
}

inherits(DeadEndStream, Writable);

DeadEndStream.prototype._write = function(chuck, encoding, callback) {
  callback();
};

module.exports.DeadEndStream = DeadEndStream;

function UnBufferedStream() {
  this.readable = true;
}

inherits(UnBufferedStream, Stream);

module.exports.UnBufferedStream = UnBufferedStream;

function WriteHashStream(path, options) {
  fs.WriteStream.call(this, path, options);

  this.hash = crypto.createHash('sha1');
  this.digest = null;

  this.on('close', function() {
    this.digest = this.hash.digest('hex');
  });
}

inherits(WriteHashStream, fs.WriteStream);

WriteHashStream.prototype.write = function(chunk) {
  if (chunk) {
    this.hash.update(chunk);
  }

  return fs.WriteStream.prototype.write.call(this, chunk);
};

module.exports.WriteHashStream = WriteHashStream;