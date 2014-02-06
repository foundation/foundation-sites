/**
 * Markdown Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// node_modules
var hljs  = require('highlight.js');
var _     = require('lodash');


// Local utils
var Utils = require('../utils/utils');
var Glob  = require('../utils/glob');


// Export helpers
module.exports.register = function (Handlebars, options) {

  var opts = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    langPrefix: "language-",
    highlight: function (code, lang) {
      var res;
      res = void 0;
      if (!lang) {
        return code;
      }
      switch (lang) {
      case "js":
        lang = "javascript";
      }
      try {
        return res = hljs.highlight(lang, code).value;
      } finally {
        return res || code;
      }
    }
  };
  opts = _.extend(opts, options.marked);
  var Markdown = require('../utils/markdown').Markdown(opts);

  /**
   * {{markdown}}
   *
   * Block helper for embedding markdown in HTML and
   * having it rendered to HTML at build time.
   *
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   * @example:
   *   {{#markdown}}
   *     # This is a title.
   *   {{/markdown}}
   * @result:
   *   <h1>This is a title </h1>
   */
  Handlebars.registerHelper("markdown", function (options) {
    return Markdown.convert(options.fn(this));
  });

  if (typeof process !== 'undefined') {

    /**
     * {{md}}
     *
     * Include markdown content from the specified path,
     * and render it to HTML.
     *
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     * @example:
     *   {{md ../path/to/file.md}}
     */
    Handlebars.registerHelper("md", function (path) {
      var content = Glob.globFiles(path);
      var tmpl = Handlebars.compile(content);
      var md = tmpl(this);
      var html = Markdown.convert(md);
      return new Utils.safeString(html);
    });
  }
};
