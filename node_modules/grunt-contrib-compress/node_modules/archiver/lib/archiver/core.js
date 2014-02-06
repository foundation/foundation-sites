/**
 * node-archiver
 *
 * Copyright (c) 2012-2013 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */

require('../compat/buffer');

var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');
var PassThrough = require('stream').PassThrough || require('readable-stream/passthrough');

var util = require('../util');

var Archiver = module.exports = function(options) {
  options = util.defaults(options, {
    highWaterMark: 512 * 1024
  });

  Transform.call(this, options);

  this.catchEarlyExitAttached = false;

  this.archiver = {
    processing: false,
    finalize: false,
    finalized: false,
    writableEndCalled: false,
    pointer: 0,
    file: {},
    files: [],
    queue: []
  };
};

inherits(Archiver, Transform);

Archiver.prototype._transform = function(chunk, encoding, callback) {
  this._push(chunk);
  callback();
};

Archiver.prototype._push = function(data) {
  if (data) {
    this.archiver.pointer += data.length;
  }

  return this.push(data);
};

Archiver.prototype._normalizeSource = function(source) {
  if (typeof source === 'string') {
    source = new Buffer(source, 'utf-8');
  } else if (util.isStream(source)) {
    source = this._normalizeStream(source);
  }

  return source;
};

Archiver.prototype._normalizeStream = function(source) {
  var normalized;

  if (!source._readableState) {
    normalized = new PassThrough();
    source.pipe(normalized);

    return normalized;
  }

  return source;
};

Archiver.prototype._catchEarlyExit = function() {
  var earlyExitCheck = function() {
    if (this._readableState.endEmitted === false) {
      throw new Error('Process exited before Archiver could finish emitting data');
    }
  }.bind(this);

  process.once('exit', earlyExitCheck);

  this.once('end', function() {
    process.removeListener('exit', earlyExitCheck);
  });

  this.catchEarlyExitAttached = true;
};

Archiver.prototype._emitErrorCallback = function(err, data) {
  if (err) {
    this.emit('error', err);
  }
};

Archiver.prototype._processFile = function(source, data, callback) {
  callback(new Error('method not implemented'));
};

Archiver.prototype._processQueue = function() {
  if (this.archiver.processing) {
    return;
  }

  if (this.archiver.queue.length > 0) {
    var next = this.archiver.queue.shift();
    var nextCallback = function(err, file) {
      next.callback(err);

      if (!err) {
        this.archiver.files.push(file);
        this.archiver.processing = false;
        this._processQueue();
      }
    }.bind(this);

    this.archiver.processing = true;

    this._processFile(next.source, next.data, nextCallback);
  } else if (this.archiver.finalized && this.archiver.writableEndCalled === false) {
    this.archiver.writableEndCalled = true;
    this.end();
  } else if (this.archiver.finalize && this.archiver.queue.length === 0) {
    this._finalize();
  }
};

Archiver.prototype._finalize = function() {
  this.archiver.finalize = false;
  this.archiver.finalized = true;

  this._processQueue();
};

Archiver.prototype._normalizeFileData = function(data) {
  data = util.defaults(data, {
    name: null,
    date: null
  });

  data.name = util.sanitizeFilePath(data.name);
  data.date = util.dateify(data.date);

  return data;
};

Archiver.prototype.append = function(source, data, callback) {
  data = this._normalizeFileData(data);

  if (!this.catchEarlyExitAttached) {
    this._catchEarlyExit();
  }

  if (typeof callback !== 'function') {
    callback = this._emitErrorCallback.bind(this);
  }

  if (typeof data.name !== 'string' || data.name.length === 0) {
    callback(new Error('File name is empty or not a valid string value'));
    return this;
  }

  source = this._normalizeSource(source);

  if (Buffer.isBuffer(source)) {
    data.sourceType = 'buffer';
  } else if (util.isStream(source)) {
    data.sourceType = 'stream';
  } else {
    callback(new Error('A valid Stream or Buffer instance is required as input source'));
    return this;
  }

  this.archiver.queue.push({
    data: data,
    source: source,
    callback: callback
  });

  this._processQueue();

  return this;
};

Archiver.prototype.addFile = Archiver.prototype.append;

Archiver.prototype.finalize = function(callback) {
  if (typeof callback === 'function') {
    this.once('end', function() {
      callback(null, this.archiver.pointer);
    }.bind(this));
  }

  this.archiver.finalize = true;

  this._processQueue();

  return this;
};