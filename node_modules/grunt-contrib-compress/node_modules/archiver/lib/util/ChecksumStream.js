var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');

var util = require('./');

function ChecksumStream(options) {
  Transform.call(this, options);

  this.checksum = util.crc32.createCRC32();
  this.digest = null;

  this.rawSize = 0;
}

inherits(ChecksumStream, Transform);

ChecksumStream.prototype._transform = function(chunk, encoding, callback) {
  if (chunk) {
    this.checksum.update(chunk);
    this.rawSize += chunk.length;
  }

  callback(null, chunk);
};

ChecksumStream.prototype._flush = function(callback) {
  this.digest = this.checksum.digest();

  callback();
};

module.exports = ChecksumStream;