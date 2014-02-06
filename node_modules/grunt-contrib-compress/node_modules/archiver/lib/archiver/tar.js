/**
 * node-archiver
 *
 * Copyright (c) 2012-2013 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */

var inherits = require('util').inherits;

var Archiver = require('./core');
var headers = require('../headers/tar');
var util = require('../util');

var ArchiverTar = module.exports = function(options) {
  Archiver.call(this, options);

  options = this.options = util.defaults(options, {
    recordSize: 512,
    recordsPerBlock: 20
  });

  this.recordSize = options.recordSize;
  this.blockSize = options.recordsPerBlock * options.recordSize;
};

inherits(ArchiverTar, Archiver);

ArchiverTar.prototype._flush = function(callback) {
  var endBytes = this.blockSize - (this.archiver.pointer % this.blockSize);

  this._push(util.cleanBuffer(endBytes));

  callback();
};

ArchiverTar.prototype._processFile = function(source, data, callback) {
  var self = this;

  var file = self.archiver.file = data;

  if (file.name.length > 255) {
    callback(new Error('Filename "' + file.name + '" is too long even with prefix support [' + file.name.length + '/255]'));
    return;
  }

  file.offset = self.archiver.pointer;

  function onend(err, sourceBuffer) {
    if (err) {
      callback(err);
      return;
    }

    sourceBuffer = sourceBuffer || false;
    file.size = sourceBuffer.length || 0;

    var extraBytes = self.recordSize - (file.size % self.recordSize || self.recordSize);

    self._push(headers.encode('file', file));

    if (file.size > 0) {
      self._push(sourceBuffer);
    }

    self._push(util.cleanBuffer(extraBytes));

    callback(null, file);
  }

  if (file.sourceType === 'buffer') {
    onend(null, source);
  } else if (file.sourceType === 'stream') {
    util.collectStream(source, onend);
  }
};