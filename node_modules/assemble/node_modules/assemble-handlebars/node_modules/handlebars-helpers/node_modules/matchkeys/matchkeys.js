/**
 * matchkeys
 * https://github.com/jonschlinkert/matchkeys
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var resolveDep = require('resolve-dep');
var minimatch  = require('minimatch');
var chalk      = require('chalk');
var _          = require('lodash');


// Export the matchkeys object.
exports = module.exports = {};


// Ensure config has keywords
function loadPkg(config) {
  var result = {}
  result.keywords = []

  if (typeof config !== 'object') {
    config = require(require('path').resolve(process.cwd(), 'package.json'));
  }

  // populate keywords, if any
  if(_.isArray(config.keywords)) {
    result.keywords = config.keywords;
  } else {
    return [];
  }
  return result;
}

/**
 * Compare two arrays of keywords
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */
exports.match = function(keywords, a, b) {
  if(typeof(keywords) !== 'string') {
    b = a;
    a = keywords;
    keywords = 'keywords';
  }
  return _.intersection(a[keywords] || [], b[keywords] || []);
};


/**
 * Compare two arrays of keywords and return true if ANY keywords match.
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */
exports.isMatch = function(keywords, a, b) {
  if(typeof(keywords) !== 'string') {
    b = a;
    a = keywords;
    keywords = 'keywords';
  }
  return _.intersection(a[keywords] || [], b[keywords] || []).length > 0;
};


/**
 * Compare an array of keywords against multiple arrays of keywords.
 * @param  {Array} keys  Keywords to test against.
 * @param  {Array} arrs  Multple arrays. More specifically, an array of objects,
 *                       each with a keywords property/array
 * @return {Array}       Array of matching keywords
 */
exports.matchPkgs = function(keywords, arr, arrs) {
  if(typeof(keywords) !== 'string') {
    arrs = arr;
    arr = keywords;
    keywords = 'keywords';
  }
  return _.filter(arrs, function(arr) {
    return _.intersection(arr[keywords] || [], arr[keywords] || []).length > 0;
  });
};


/**
 * Return any keywords in the given list that match keywords in config.keywords.
 * @param  {[type]} pattern [description]
 * @param  {[type]} config  [description]
 * @return {[type]}         [description]
 */
exports.filter = function(pattern, config) {
  config = loadPkg(config);
  var search = config.keywords;
  return minimatch.match(search, pattern, {});
};


/**
 * Resolve paths to keywords based on keyword matches
 * @param  {[type]} keys   [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
exports.resolve = function (patterns, config) {
  config = loadPkg(config);
  return _.compact(_.flatten(exports.filter(patterns, config).map(function (pattern) {
    return resolveDep.dep(pattern).join();
  })));
};

/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */
exports.resolveDev = function (patterns, config) {
  config = loadPkg(config);
  return _.compact(_.flatten(exports.filter(patterns, config).map(function (pattern) {
    return resolveDep.dev(pattern).join();
  })));
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */
exports.resolveAll = function (patterns, config) {
  config = loadPkg(config);
  return _.compact(_.flatten(exports.filter(patterns, config).map(function (pattern) {
    return resolveDep.all(pattern).join();
  })));
};

