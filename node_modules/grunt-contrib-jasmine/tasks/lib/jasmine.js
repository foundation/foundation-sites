
'use strict';

exports.init = function(grunt, phantomjs) {
  // node api
  var fs = require('fs'),
      path = require('path');

  // npm
  var rimraf = require('rimraf');

  var baseDir = '.',
      tempDir = '.grunt/grunt-contrib-jasmine';

  var exports = {};

  exports.writeTempFile = function(dest, contents) {
    var file = path.join(tempDir,dest);
    grunt.file.write(file, contents);
  };

  exports.copyTempFile = function(src, dest) {
    var file = path.join(tempDir,dest);
    grunt.file.copy(src, file);
  };

  exports.cleanTemp = function(cb) {
    rimraf(tempDir, function(){
      // if this fails, then ./.grunt isn't empty and that's ok.
      fs.rmdir('.grunt', cb);
    });
  };

  exports.buildSpecrunner = function (src, options){
    var source = '',
      outfile = options.outfile,
      specrunner = path.join(baseDir,outfile),
      outdir = path.dirname(outfile),
      gruntfilter = grunt.option("filter"),
      filteredSpecs = exports.getRelativeFileList(outdir, options.specs);

    // Let's filter through the spec files here,
    // there's no need to go on if no specs matches
    if(gruntfilter) {
      filteredSpecs = specFilter(gruntfilter, filteredSpecs);

      if(filteredSpecs.length === 0) {
        grunt.log.warn("the --filter flag did not match any spec within " + grunt.task.current.target);
        return null;
      }
    }

    exports.copyTempFile(__dirname + '/../jasmine/reporters/PhantomReporter.js', 'reporter.js');
    exports.copyTempFile(__dirname + '/../../vendor/jasmine-' + options.version + '/jasmine.css', 'jasmine.css');
    exports.copyTempFile(__dirname + '/../../vendor/jasmine-' + options.version + '/jasmine.js', 'jasmine.js');
    exports.copyTempFile(__dirname + '/../../vendor/jasmine-' + options.version + '/jasmine-html.js', 'jasmine-html.js');
    exports.copyTempFile(__dirname + '/../jasmine/jasmine-helper.js', 'jasmine-helper.js');
    exports.copyTempFile(__dirname + '/../helpers/phantom-polyfill.js', 'phantom-polyfill.js');

    var reporters = [
      tempDir + '/reporter.js'
    ];

    var jasmineCss = [
      tempDir + '/jasmine.css'
    ];

    jasmineCss = jasmineCss.concat(options.styles);

    var polyfills = [
      tempDir + '/phantom-polyfill.js'
    ];

    var jasmineCore = [
      tempDir + '/jasmine.js',
      tempDir + '/jasmine-html.js'
    ];

    var jasmineHelper = tempDir + '/jasmine-helper.js';

    var context = {
      temp : tempDir,
      css  : exports.getRelativeFileList(outdir, jasmineCss, { nonull : true }),
      scripts : {
        polyfills : exports.getRelativeFileList(outdir, polyfills),
        jasmine   : exports.getRelativeFileList(outdir, jasmineCore),
        helpers   : exports.getRelativeFileList(outdir, options.helpers, { nonull : true }),
        specs     : filteredSpecs,
        src       : exports.getRelativeFileList(outdir, src, { nonull : true }),
        vendor    : exports.getRelativeFileList(outdir, options.vendor, { nonull : true }),
        reporters : exports.getRelativeFileList(outdir, reporters),
        start     : exports.getRelativeFileList(outdir, jasmineHelper)
      },
      options : options.templateOptions || {}
    };

    if (options.template.process) {
      var task = {
        writeTempFile : exports.writeTempFile,
        copyTempFile : exports.copyTempFile,
        phantomjs : phantomjs
      };
      source = options.template.process(grunt, task, context);
      grunt.file.write(specrunner, source);
    } else {
      grunt.file.copy(options.template, specrunner, {
        process : function(src) {
          source = grunt.util._.template(src, context);
          return source;
        }
      });
    }

    return source;
  };

  exports.getRelativeFileList = function (outdir, patterns, options) {
    var files = [];
    patterns = patterns instanceof Array ? patterns : [ patterns ];
    options = options || {};
    patterns.forEach(function(listItem){
      if (listItem) files = files.concat(grunt.file.expand(options, listItem));
    });

    files = grunt.util._(files).map(function(file){
      return (/^https?:/).test(file) ? file : path.relative(outdir, file).replace(/\\/g, '/');
    });
    return files;
  };

  // Allows for a spec file to be specified via the command line
  function specFilter(pattern, files) {
    var specPattern,
      patternArray,
      filteredArray = [],
      scriptSpecs = [],
      matchPath = function(path) {
        return !!path.match(specPattern);
      };

    if(pattern) {
      // For '*' to work as a wildcard.
      pattern = pattern.split("*").join("[\\S]*").replace(/\./g, "\\.");
      // This allows for comma separated strings to which we can match the spec files.
      patternArray = pattern.split(",");

      while(patternArray.length > 0) {
        pattern = (patternArray.splice(0, 1)[0]);

        if(pattern.length > 0) {
          if(pattern.indexOf('/') === -1) {
            specPattern = new RegExp("("+pattern+"[^/]*)(?!/)$", "ig");
          } else if(pattern.indexOf('/') === 0) {
            specPattern = new RegExp("("+pattern+"[^/]*)(?=/)", "ig");
          } else {
            throw new TypeError("--filter flag seems to be in the wrong format.");
          }

          // push is usually faster than concat.
          [].push.apply(scriptSpecs, files.filter(matchPath));
        }
      }

      filteredArray = grunt.util._.uniq(scriptSpecs);
    }

    return filteredArray;
  }

  return exports;
};

