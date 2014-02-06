/**
 * resolve-dep
 * https://github.com/jonschlinkert/resolve-dep
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var matchdep = require('matchdep');


// Export this module.
exports = module.exports = {};

// Resolve path to a specific file
exports.resolvePath = function (filepath) {
  return path.relative(process.cwd(), require.resolve(filepath)).replace(/\\/g, '/');
};


/**
 * Resolve dependencies
 * @example
 *   resolve.dep('assemble'); => ['node_modules/assemble/index.js']
 */


// Resolve paths to dependencies
exports.dep = function (patterns, config) {
  return matchdep.filter(patterns, config).map(function (pattern) {
    return exports.resolvePath(pattern);
  });
};

// Resolve paths to devDependencies
exports.dev = function (patterns, config) {
  return matchdep.filterDev(patterns, config).map(function (pattern) {
    return exports.resolvePath(pattern);
  });
};

// Resolve paths to both dependencies and devDependencies
exports.all = function (patterns, config) {
  return matchdep.filterAll(patterns, config).map(function (pattern) {
    return exports.resolvePath(pattern);
  });
};


/**
 * Resolve dirnames for dependencies
 * @example
 *   resolve.depDirname('assemble'); => ['node_modules/assemble']
 */


// Resolve dirname for dependencies
exports.depDirname = function (patterns, config) {
  return matchdep.filterDev(patterns, config).map(function (pattern) {
    return path.dirname(exports.resolvePath(pattern));
  });
};

// Resolve dirname for devDependencies
exports.devDirname = function (patterns, config) {
  return matchdep.filterDev(patterns, config).map(function (pattern) {
    return path.dirname(exports.resolvePath(pattern));
  });
};

// Resolve dirname for both dependencies and devDependencies
exports.allDirname = function (patterns, config) {
  return matchdep.filterDev(patterns, config).map(function (pattern) {
    return path.dirname(exports.resolvePath(pattern));
  });
};


// Export aliases
exports.load    = exports.dep;
exports.loadDev = exports.dev;
exports.loadAll = exports.all;