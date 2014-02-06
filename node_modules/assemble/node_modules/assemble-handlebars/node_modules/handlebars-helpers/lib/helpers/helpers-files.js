/**
 * Handlebars File Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// node_modules
var grunt = require('grunt');


// Local utils
var Utils = require('../utils/utils');
var Glob = require('../utils/glob');



module.exports.register = function (Handlebars, options) {

  var helpers = {

    /**
     * {{glob "**"}} example helper
     *
     * Read in content from files specified using minimatch patterns
     * @param  {String}   src
     * @param  {Function} compare_fn
     * @return {String}
     * @example {{ glob 'path/to/files/*.md' }}
     */
    glob: function (src, compare_fn) {
      var source = Glob.globFiles(src, compare_fn);
      return new Utils.safeString(source);
    },

    /**
     * {{globRaw "**"}} example helper
     *
     * Read in content from files specified using minimatch patterns, return raw output without using 'safeString' filter (this chokes on JSON content)
     * @param  {String}   src
     * @param  {Function} compare_fn
     * @return {String}
     * @example {{ glob 'path/to/files/*.md' }}
     */
    globRaw: function (src, compare_fn) {
      var source = Glob.globFiles(src, compare_fn);
      return source;
    },

    /**
     * {{globWithContext "**"}} example helper
     *
     * Read in content from files specified using minimatch patterns
     * @param  {String}   src
     * @param  {Object}   context
     * @param  {Function} compare_fn
     * @return {String}
     * @example {{ glob 'path/to/files/*.md' }}
     */
    globWithContext: function (src, context, compare_fn) {
      var source = Glob.globFiles(src);
      var template = Handlebars.compile(source);
      var result = template(context);
      return new Utils.safeString(result);
    },

    /**
     * {{globRawWithContext "**"}} example helper
     *
     * Read in content from files specified using minimatch patterns, return raw output without using 'safeString' filter (this chokes on JSON content)
     * @param  {String}   src
     * @param  {Object}   context
     * @param  {Function} compare_fn
     * @return {String}
     * @example {{ glob 'path/to/files/*.md' }}
     */
    globRawWithContext: function (src, context, compare_fn) {
      var source = Glob.globFiles(src);
      var template = Handlebars.compile(source);
      var result = template(context);
      return result;
    },

    /**
     * {{fileSize}}
     *
     * Converts bytes into a nice representation with unit.
     * e.g. 13661855 => 13.7 MB, 825399 => 825 KB, 1396 => 1 KB
     * @param  {[type]} value
     * @return {[type]}
     */
    fileSize: function (value) {
      var bytes = parseInt(value, 10);
      if (isNaN(bytes)) {
        console.error("Handlebars helper fileSize couldn't parse '" + value + "'");
        return value; // Graceful degradation
      }
      // KB is technically a Kilobit, but it seems more readable.
      var resInt, resValue;
      var metric = ['byte', 'bytes', 'KB', 'MB', 'GB'];
      if (bytes === 0) {
        resInt = resValue = 0;
      } else {
        // Base 1000 (rather than 1024) matches Mac OS X
        resInt = Math.floor(Math.log(bytes) / Math.log(1000));
        // No decimals for anything smaller than 1 MB
        resValue = (bytes / Math.pow(1000, Math.floor(resInt))).toFixed(resInt < 2 ? 0 : 1);
        if (bytes === 1) {
          resInt = -1; // special case: 1 byte (singular)
        }
      }
      return new Utils.safeString(resValue + ' ' + metric[resInt + 1]);
    }
  };

  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
