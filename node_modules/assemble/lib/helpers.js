/**
 * Assemble Helpers
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');
var fs   = require('fs');

// node_modules
var resolve = require('resolve-dep');
var grunt   = require('grunt');
var _       = require('lodash');


module.exports.register = function(patterns, plugin, engine, options, params) {

  // Resolve and load helpers from node_modules, if the helper name is listed both
  // in the "helpers" option of the assemble task and devDependencies.
  var resolvedFiles = resolve.loadDev(patterns) || [];

  // Load local helpers defined in the "helpers" option of the assemble task.
  var localFiles = grunt.file.expand(options, patterns) || [];

  var files = _.union([], resolvedFiles, localFiles);
  files.forEach(function(file) {
    var helper = null;
    try {
      helper = require(path.normalize(path.join(options.cwd || process.cwd() || '', file)));
      if(typeof helper !== 'undefined') {
        if(typeof helper.register !== 'undefined') {
          helper.register(engine, options, params);
        } else {
          plugin.registerFunctions(helper, options, params);
        }
      }
    } catch (ex) {
      grunt.log.writeln('Error loading helpers from file: ' + file);
      grunt.log.writeln(ex);
    }
  });
};


