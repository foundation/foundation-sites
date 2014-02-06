/**
 * Handlebars Helpers: File Globbing Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// node_modules
var minimatch = require('minimatch');
var grunt     = require('grunt');
var _         = require('lodash');


// Local utils
var compareFn = require('./lib/compare');


// The module to be exported.
var Utils = module.exports = exports = {};
Utils.toString = Object.prototype.toString;


/**
 * Returns an array of all file paths that match the given wildcard patterns,
 * then reads each file and return its contents as a string, and last normalizes
 * all line linefeeds in the string
 * @author: Jon Schlinkert <http://ghtub.com/jonschlinkert>
 *
 * @param {String|Array} src Globbing pattern(s).
 * @param {Function=} Accepts two objects (a,b) and returning 1 if a >= b otherwise -1.
 * Properties passed to compare_fn are:
 *   {
 *     index: original index of file strating with 1
 *     path: full file path
 *     content: content of file
 *   }
 */
Utils.globFiles = function (src, compare_fn) {
  compare_fn = compareFn(compare_fn);
  var content = void 0;
  var index = 0;
  return content = grunt.file.expand(src).map(function (path) {
    index += 1;
    return {
      index: index,
      path: path,
      content: grunt.file.read(path)
    };
  }).sort(compare_fn).map(function (obj) {
    return obj.content;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};


Utils.buildObjectPaths = function (obj) {
  var files = [];
  _.forOwn(obj, function (value, key) {
    var file = key;
    var recurse = function (obj) {
      return _.forOwn(obj, function (value, key) {
        if (file.length !== 0) {
          file += '/';
        }
        file += key;
        if (_.isObject(value)) {
          return recurse(value);
        }
      });
    };
    if (_.isObject(value)) {
      recurse(value);
    }
    return files.push(file);
  });
  return files;
};


Utils.globObject = function (obj, pattern) {
  var files = Utils.buildObjectPaths(obj);
  var matches = files.filter(minimatch.filter(pattern));
  var result = {};

  var getValue = function (obj, path) {
    var keys = path.split('/');
    var value = _.cloneDeep(obj);
    _.forEach(keys, function (key) {
      if (_.has(value, key)) {
        return value = _.cloneDeep(value[key]);
      }
    });
    return value;
  };

  var setValue = function (obj, path, value) {
    var keys = path.split('/');
    var key = keys.shift();
    if (keys.length) {
      obj[key] = setValue({}, keys.join('/'), value);
    } else {
      obj[key] = value;
    }
    return obj;
  };

  _.forEach(matches, function (match) {
    var value = getValue(obj, match);
    return result = setValue(result, match, value);
  });
  return result;

};
