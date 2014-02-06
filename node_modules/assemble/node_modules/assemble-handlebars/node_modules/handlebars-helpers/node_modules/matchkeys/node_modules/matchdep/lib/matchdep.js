/*
 * matchdep
 * https://github.com/tkellen/node-matchdep
 *
 * Copyright (c) 2012 Tyler Kellen
 * Licensed under the MIT license.
 */

'use strict';

var minimatch = require('minimatch');
var path = require('path');

// export object
var matchdep = module.exports = {};

// Ensure configuration has devDep and dependencies keys
function loadConfig(config) {

  var result = {
    dependencies: [],
    devDependencies: []
  };

  // if no config defined, assume package.json in cwd
  if (config === undefined) {
    config = path.resolve(process.cwd(),'package.json');
  }

  // if package is a string, try to require it
  if (typeof config === 'string') {
    config = require(config);
  }

  // if config is not an object yet, something is amiss
  if (typeof config !== 'object') {
    throw new Error("Invalid configuration specified.");
  }

  // populate dependencies, if any
  if(typeof config.dependencies === 'object') {
    result.dependencies = Object.keys(config.dependencies);
  }

  // populate devDependencies, if any
  if(typeof config.devDependencies === 'object') {
    result.devDependencies = Object.keys(config.devDependencies);
  }

  return result;
}

// filter dependencies
matchdep.filter = function(pattern, config) {
  config = loadConfig(config);
  var search = config.dependencies;
  return minimatch.match(search, pattern, {});
};

// filter devDependencies
matchdep.filterDev = function(pattern, config) {
  config = loadConfig(config);
  var search = config.devDependencies;
  return minimatch.match(search, pattern, {});
};

// filter all dependencies
matchdep.filterAll = function(pattern, config) {
  config = loadConfig(config);
  var search = config.dependencies.concat(config.devDependencies);
  return minimatch.match(search, pattern, {});
};
