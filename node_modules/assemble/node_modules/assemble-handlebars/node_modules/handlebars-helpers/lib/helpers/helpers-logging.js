/**
 * Handlebars Path Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var util  = require('util');


// node_modules
var grunt = require('grunt');
var to    = require('to');
var sort  = require('sort-object');

// Local utils
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {

  /**
   * {{debug}}
   * Use console.log to return context of the 'this' and options from Handlebars
   * @param {Object} value
   * @example
   *   {{debug}}
   */
  debug: function (value) {
    console.log('=================================');
    console.log('Context: ', this);
    if (!Utils.isUndefined(value)) {
      console.log('Value: ', value);
    }
    return console.log('=================================');
  },


  /**
   * {{expandMapping}}
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * @param  {Object} src [description]
   * @return {Object}     [description]
   */
  expandMapping: function (src) {
    var obj = Utils.expandMapping(src);
    var yml = to.format.yaml.stringify(obj);
    return new Utils.safeString(yml);
  },

  /**
   * {{expandJSON}}
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * @param  {object} src [description]
   * @return {object}     [description]
   */
  expandJSON: function (src) {
    var obj = grunt.file.expand(src);
    var json = JSON.stringify(obj, null, 2);
    return new Utils.safeString(json);
  },

  /**
   * {{expandYAML}}
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * @param  {object} src [description]
   * @return {object}     [description]
   */
  expandYAML: function (src) {
    var obj = grunt.file.expand(src);
    var yml = to.format.yaml.stringify(obj);
    return new Utils.safeString(yml);
  },

  log: function (value) {
    return console.log(value);
  },


  /**
   * {{inspect}}
   * @author: Brian Woodward <http://github.com/doowb>
   * @param  {[type]} obj [description]
   * @param  {[type]} ext [description]
   * @return {[type]}     [description]
   */
  inspect: function(context, options) {
    var hash = options.hash || {};
    var ext = hash.ext || '.html';
    context = JSON.stringify(sort(context), null, 2);

    // Wrap the returned JSON in either markdown code fences
    // or HTML, depending on the extension.
    var md = '\n```json\n' + context + '\n```';
    var html = '<pre><code class="json">\n' + context + '\n</code></pre>';
    var result = Utils.switchOutput(ext, md, html);
    return new Utils.safeString(result);
  }
};


// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};
  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
