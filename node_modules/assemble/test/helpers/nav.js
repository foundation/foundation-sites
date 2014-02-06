/**
 * Handlebars Helpers: {{nav}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */


// Node.js
var path  = require('path');
var fs    = require('fs');

// node_modules
var grunt = require('grunt');
var _     = require('lodash');


// Export helpers
module.exports.register = function (Handlebars, options, params) {
  'use strict';

  var opts = options || {};

  /**
   * {{nav}}
   */
  exports.nav = function(context, options) {
    options = options || {};
    options.hash = options.hash || {};
    context = _.extend({modifier: ''}, context, opts.data, this, options.hash);

    var template = [
      '<ul class="nav nav-pills nav-stacked">',
      '',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="prev disabled">',
      '      <a unselectable="on" class="unselectable">First</a>',
      '    </li>',
      '    <li class="prev disabled">',
      '      <a unselectable="on" class="unselectable">&larr; Previous</a>',
      '    </li>',
      '  {{/is}}',
      '',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="prev">',
      '      <a href="{{relative page.dest first.dest}}">First</a>',
      '    </li>',
      '    <li class="prev">',
      '      <a href="{{relative page.dest prev.dest}}">&larr; Previous</a>',
      '    </li>',
      '  {{/isnt}}',
      '',
      '  {{#eachItems pages}}',
      '    <li{{#is ../page.dest this.dest}} class="active"{{/is}}>',
      '      <a href="{{relative ../page.dest this.dest}}">{{@number}}</a>',
      '    </li>',
      '  {{/eachItems}}',
      '',
      '  {{#isnt pagination.currentPage pagination.totalPages}}',
      '    <li class="next">',
      '      <a href="{{relative page.dest next.dest}}">Next &rarr;</a>',
      '    </li>',
      '    <li class="next">',
      '      <a href="{{relative page.dest last.dest}}">Last</a>',
      '    </li>',
      '  {{/isnt}}',
      '',
      '  {{#is pagination.currentPage pagination.totalPages}}',
      '    <li class="next disabled">',
      '      <a unselectable="on" class="unselectable">Next &rarr;</a>',
      '    </li>',
      '    <li class="next disabled">',
      '      <a unselectable="on" class="unselectable">Last</a>',
      '    </li>',
      '  {{/is}}',
      '',
      '</ul>'
    ].join('\n');

    return new Handlebars.SafeString(Handlebars.compile(template)(context));
  };

  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
