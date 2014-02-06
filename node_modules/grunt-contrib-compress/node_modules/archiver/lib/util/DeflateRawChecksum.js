var zlib = require('zlib');
var inherits = require('util').inherits;

var util = require('./');

function DeflateRawChecksum(options) {
  zlib.DeflateRaw.call(this, options);

  this.checksum = util.crc32.createCRC32();
  this.digest = null;

  this.rawSize = 0;
  this.compressedSize = 0;

  this.on('data', function(chunk) {
    this.compressedSize += chunk.length;
  });

  this.on('end', function() {
    this.digest = this.checksum.digest();
  });
}

inherits(DeflateRawChecksum, zlib.DeflateRaw);

DeflateRawChecksum.prototype.write = function(chunk, cb) {
  if (chunk) {
    this.checksum.update(chunk);
    this.rawSize += chunk.length;
  }

  return zlib.DeflateRaw.prototype.write.call(this, chunk, cb);
};

module.exports = DeflateRawChecksum;
