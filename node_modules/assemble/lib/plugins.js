/**
 * Assemble Plugins
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
var grunt = require('grunt');
var async = require('async');
var _ = require('lodash');

// The module to be exported.
var plugins = module.exports = {};

plugins.resolve = function (_plugins, options) {
  options = options || {};
  _plugins = _plugins || [];
  var actualPlugins = [];

  _plugins.forEach(function (plugin) {
    // if plugin is a string, attempt to resolve to module
    if (_.isString(plugin)) {
      var resolved = resolve.all(plugin);
      // if resolved to an npm module then use it, otherwise assume local file/pattern so expand
      var relPaths = resolved.length ? resolved : grunt.file.expand(plugin);
      var resolvedPlugins = relPaths.map(function(relPath) {
        // normalize the relative path given current working directory
        var fullPath = path.normalize(path.join(options.cwd || process.cwd() || '', relPath));
        try {
          var required = require(fullPath);
          return required;
        }
        catch (ex) {
          grunt.log.writeln('Error requiring plugin "' + plugin + '"');
          grunt.log.writeln(ex);
        }
      });
      actualPlugins = actualPlugins.concat(resolvedPlugins || []);
    }
    // otherwise, assume plugin is already a function
    else {
      actualPlugins.push(plugin);
    }
  });
  // set plugin options
  actualPlugins.forEach(function (plugin) {
    plugin.options = _.extend({}, {
      stage: 'render:pre:page'
    }, plugin.options);
  });
  return actualPlugins;
};


plugins.runner = function (stage, params) {
  params.stage = stage;
  var assemble = params.assemble;
  var isStageMatch = function(a, b) {
    return (a === b) || a === '*';
  };
  var pluginsOfType = _.filter(assemble.options.plugins, function (plugin) {
    var pluginParts = plugin.options.stage.split(':');
    var stageParts = stage.split(':');
    return isStageMatch(pluginParts[0], stageParts[0]) &&
           isStageMatch(pluginParts[1], stageParts[1]) &&
           isStageMatch(pluginParts[2], stageParts[2]);
  });
  return function (done) {
    async.forEachSeries(pluginsOfType, function (plugin, next) {
        if(_.isFunction(plugin)) {
          plugin(params, next);
        } else {
          next();
        }
      },
      function (err) {
        if (err) {grunt.log.error(err); done(err);}
        else {done(); }
      }
    );
  };
};

plugins.buildStep = function(stage, params) {
  return function(assemble, next) {
    plugins.runner(stage, params)(function() {
      next(assemble);
    });
  };
};

