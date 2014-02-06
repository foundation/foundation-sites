/**
 * node-archiver
 *
 * Copyright (c) 2012-2013 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-archiver/blob/master/LICENSE-MIT
 */

var fs = require('fs');
var path = require('path');
var stream = require('stream');

var util = module.exports = {};

util.crc32 = require('./crc32');

var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

util.cleanBuffer = function(length) {
  var buf = new Buffer(length);

  buf.fill(0);

  return buf;
};

util.collectStream = function(source, callback) {
  var collection = [];
  var size = 0;

  source.on('error', callback);

  source.on('data', function(chunk) {
    collection.push(chunk);
    size += chunk.length;
  });

  source.on('end', function() {
    var buf = new Buffer(size, 'utf8');
    var offset = 0;

    collection.forEach(function(data) {
      data.copy(buf, offset);
      offset += data.length;
    });

    callback(null, buf);
  });
};

util.convertDateTimeDos = function(input) {
 return new Date(
  ((input >> 25) & 0x7f) + 1980,
  ((input >> 21) & 0x0f) - 1,
  (input >> 16) & 0x1f,
  (input >> 11) & 0x1f,
  (input >> 5) & 0x3f,
  (input & 0x1f) << 1);
};

util.convertDateTimeEpoch = function(input) {
  input = input * 1000;

  return new Date(input);
};

util.convertDateTimeOctal = function(input) {
  input = parseInt(input, 8) * 1000;

  return new Date(input);
};

util.dateify = function(dateish) {
  dateish = dateish || new Date();

  if (dateish instanceof Date) {
    dateish = dateish;
  } else if (typeof dateish === 'string') {
    dateish = new Date(dateish);
  } else {
    dateish = new Date();
  }

  return dateish;
};

util.defaults = function(object, source) {
  object = object || {};

  var index;
  var iterable = object;
  var result = iterable;

  var args = arguments;
  var argsIndex = 0;
  var argsLength = args.length;

  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];

    if (iterable && objectTypes[typeof iterable]) {
      var ownIndex = -1;
      var ownProps = objectTypes[typeof iterable] && util.keys(iterable);
      var length = ownProps ? ownProps.length : 0;

      while (++ownIndex < length) {
        index = ownProps[ownIndex];
        if (typeof result[index] === 'undefined' || result[index] == null) {
          result[index] = iterable[index];
        } else if (util.isObject(result[index]) && util.isObject(iterable[index])) {
          result[index] = util.defaults(result[index], iterable[index]);
        }
      }
    }
  }

  return result;
};

util.dosDateTime = function(d, utc) {
  d = (d instanceof Date) ? d : new Date();
  utc = utc || false;

  var year = (utc === true) ? d.getUTCFullYear() : d.getFullYear();

  if (year < 1980) {
    return (1<<21) | (1<<16);
  }

  var val = {
    year: year,
    month: (utc === true) ? d.getUTCMonth() : d.getMonth(),
    date: (utc === true) ? d.getUTCDate() : d.getDate(),
    hours: (utc === true) ? d.getUTCHours() : d.getHours(),
    minutes: (utc === true) ? d.getUTCMinutes() : d.getMinutes(),
    seconds: (utc === true) ? d.getUTCSeconds() : d.getSeconds()
  };

  return ((val.year-1980) << 25) | ((val.month+1) << 21) | (val.date << 16) |
    (val.hours << 11) | (val.minutes << 5) | (val.seconds / 2);
};

util.epochDateTime = function(d) {
  d = (d instanceof Date) ? d : new Date();

  return Math.round(d / 1000);
};

util.keys = function(object) {
  if (!util.isObject(object)) {
    return [];
  }

  return Object.keys(object);
};

util.isObject = function(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.com/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
};

util.isStream = function(source) {
  return (source instanceof stream.Stream);
};

util.octalDateTime = function(d) {
  d = (d instanceof Date) ? d : new Date();

  return Math.round(d / 1000).toString(8);
};

util.padNumber = function(num, bytes, base) {
  num = num.toString(base || 8);
  return util.repeat('0', bytes - num.length) + num;
};

util.repeat = function(pattern, count) {
  if (count < 1) {
    return '';
  }

  var result = '';

  while (count > 0) {
    if (count & 1) {
      result += pattern;
    }

    count >>= 1;
    pattern += pattern;
  }

  return result;
};

util.sanitizeFilePath = function(filepath) {
  filepath = filepath || '';
  filepath = path.normalize(filepath);
  filepath = util.unixifyPath(filepath);

  while (filepath.substring(0, 1) === '/') {
    filepath = filepath.substring(1);
  }

  return filepath;
};

util.scanBuffer = function(buf, search, offset) {
  if (!Buffer.isBuffer(buf)) {
    return false;
  }

  var origBufLength = buf.length;
  var negative = false;
  var wasOffset = false;

  if (offset) {
    if (offset < 0) {
      offset = offset * -1;
      negative = true;
    }

    if (offset <= origBufLength) {
      if (negative) {
        offset = offset * -1;
      }

      wasOffset = true;
      buf = buf.slice(offset);
    }
  }

  if (typeof search === 'string') {
    search = new Buffer(search);
  } else if (!Buffer.isBuffer(search)) {
    return false;
  }

  // simple but slow string search
  for (var i = 0; i <= buf.length - search.length + 1; i++) {
    for (var j = 0; j < search.length && buf[i + j] === search[j]; j++);
    if (j === search.length) {
      if (wasOffset) {
        return origBufLength - (buf.length - i);
      }

      return i;
    }
  }

  return false;
};

util.scanBufferUInt32LE = function(buf, search, offset) {
  if (!search) {
    return false;
  }

  var searchBuf = new Buffer(4);
  searchBuf.writeUInt32LE(search, 0);

  return util.scanBuffer(buf, searchBuf, offset);
};

util.unixifyPath = function(filepath) {
  return filepath.replace(/\\/g, '/');
};