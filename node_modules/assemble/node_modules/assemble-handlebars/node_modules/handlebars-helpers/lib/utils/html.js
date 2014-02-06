/**
 * HTML Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var fs = require('fs');

// Local utils.
var Utils = require('./utils');

// The module to be exported.
var html = module.exports = {};


/**
 * Remove extra newlines from HTML, respect indentation
 * @param  {String} html
 * @return {String}
 */
html.condense = function(str) {
  return str.replace(/(\n|\r){2,}/g, '\n');
};

/**
 * Add a single newline above code comments in HTML
 * @param  {[type]} html
 * @return {[type]}
 */
html.padcomments = function(str) {
  return str.replace(/(\s*<!--)/g, '\n$1');
};


/**
 * Parse HTML attributes from options hash
 * @param  {[type]} hash [description]
 * @return {[type]}      [description]
 */
html.parseAttributes = function (hash) {
  return Object.keys(hash).map(function (key) {
    return "" + key + "=\"" + hash[key] + "\"";
  }).join(' ');
};
