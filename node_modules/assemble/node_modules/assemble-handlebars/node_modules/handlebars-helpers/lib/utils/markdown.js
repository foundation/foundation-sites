/**
 * Markdown Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var fs = require("fs");


// node_modules
var marked = require("marked");
var hljs   = require("highlight.js");
var _      = require("lodash");



// The module to be exported.
var Markdown = function (options) {
  return this.init(options);
};


/**
 * init
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
Markdown.prototype.init = function (options) {
  var defaults = {
    fromFile: true
  };
  this.options = _.extend({}, defaults, options || {});
  return this;
};


/**
 * read
 * @param  {String} src [description]
 * @return {String}     [description]
 */
Markdown.prototype.read = function (src) {
  if (!fs.existsSync(src)) {
    console.log("File " + src + " not found.");
    return "";
  }
  var md = fs.readFileSync(src, "utf8");
  return this.convert(md);
};


/**
 * convert
 * @param  {String} src [description]
 * @return {String}     [description]
 */
Markdown.prototype.convert = function (src) {
  if (typeof this.options.highlight === "string") {
    if (this.options.highlight === "auto") {
      this.options.highlight = function (code) {
        return hljs.highlightAuto(code).value;
      };
    } else if (this.options.highlight === "manual") {
      this.options.highlight = function (code, lang) {
        try {
          code = hljs.highlight(lang, code).value;
        } catch (e) {
          code = hljs.highlightAuto(code).value;
        }
        return code;
      };
    }
  }
  marked.setOptions(this.options);

  // return HTML
  return marked(src);
};

/**
 * Export the markdown module
 * @param {Object} options [description]
 */
module.exports.Markdown = function (options) {
  return new Markdown(options);
};
