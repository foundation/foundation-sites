var fs = require('fs');
var path = require('path');

var async = require('async');

var util = require('../lib/util');

var counter = 0;
var configCache = {};

function cacheConfig(config) {
  ++counter;
  configCache[counter] = config;
  return counter;
}

function pluckConfig(id) {
  if (!configCache.hasOwnProperty(id)) {
    throw new Error('Failed to find id in cache');
  }
  var config = configCache[id];
  delete configCache[id];
  return config;
}

function createTask(grunt) {
  return function(name, target) {
    var tasks = [];
    var prefix = this.name;
    if (!target) {
      Object.keys(grunt.config(name)).forEach(function(target) {
        if (!/^_|^options$/.test(target)) {
          tasks.push(prefix + ':' + name + ':' + target);
        }
      });
      return grunt.task.run(tasks);
    }
    var args = Array.prototype.slice.call(arguments, 2).join(':');
    var options = this.options({
      cache: path.join(__dirname, '..', '.cache')
    });

    // support deprecated timestamps option
    if (options.timestamps) {
      grunt.log.warn('DEPRECATED OPTION.  Use the "cache" option instead');
      options.cache = options.timestamps;
    }

    var originalConfig = grunt.config.get([name, target]);
    var config = grunt.util._.clone(originalConfig);

    /**
     * Special handling for watch task.  This is a multitask that expects
     * the `files` config to be a string or array of string source paths.
     */
    var srcFiles = true;
    if (typeof config.files === 'string') {
      config.src = [config.files];
      delete config.files;
      srcFiles = false;
    } else if (Array.isArray(config.files) &&
        typeof config.files[0] === 'string') {
      config.src = config.files;
      delete config.files;
      srcFiles = false;
    }

    var qualified = name + ':' + target;
    var stamp = util.getStampPath(options.cache, name, target);
    var repeat = grunt.file.exists(stamp);

    if (!repeat) {
      /**
       * This task has never succeeded before.  Process everything.  This is
       * less efficient than it could be for cases where some dest files were
       * created in previous runs that failed, but it makes things easier.
       */
      grunt.task.run([
        qualified + (args ? ':' + args : ''),
        'newer-postrun:' + qualified + ':-1:' + options.cache
      ]);
      return;
    }

    // This task has succeeded before.  Filter src files.

    var done = this.async();

    var previous = fs.statSync(stamp).mtime;
    var files = grunt.task.normalizeMultiTaskFiles(config, target);
    util.filterFilesByTime(files, previous, function(err, newerFiles) {
      if (err) {
        return done(err);
      } else if (newerFiles.length === 0) {
        grunt.log.writeln('No newer files to process.');
        return done();
      }

      /**
       * If we started out with only src files in the files config,
       * transform the newerFiles array into an array of source files.
       */
      if (!srcFiles) {
        newerFiles = newerFiles.map(function(obj) {
          return obj.src;
        });
      }

      // configure target with only newer files
      config.files = newerFiles;
      delete config.src;
      delete config.dest;
      grunt.config.set([name, target], config);
      // because we modified the task config, cache the original
      var id = cacheConfig(originalConfig);

      // run the task, and attend to postrun tasks
      var tasks = [
        qualified + (args ? ':' + args : ''),
        'newer-postrun:' + qualified + ':' + id + ':' + options.cache
      ];
      grunt.task.run(tasks);

      done();
    });

  };
}


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  grunt.registerTask(
      'newer', 'Run a task with only those source files that have been ' +
      'modified since the last successful run.', createTask(grunt));

  var deprecated = 'DEPRECATED TASK.  Use the "newer" task instead';
  grunt.registerTask(
      'any-newer', deprecated, function() {
        grunt.log.warn(deprecated);
        var args = Array.prototype.join.call(arguments, ':');
        grunt.task.run(['newer:' + args]);
      });

  grunt.registerTask(
      'newer-postrun', 'Internal task.', function(name, target, id, dir) {

        // if dir includes a ':', grunt will split it among multiple args
        dir = Array.prototype.slice.call(arguments, 3).join(':');
        grunt.file.write(util.getStampPath(dir, name, target), '');

        // reconfigure task if modified config was set
        if (id !== '-1') {
          grunt.config.set([name, target], pluckConfig(id));
        }

      });

};
