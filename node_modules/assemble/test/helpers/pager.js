/**
 * Handlebars Helpers: {{pagination}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');
var fs = require('fs');
var _ = require('lodash');


// Export helpers
module.exports.register = function (Handlebars, options, params) {
  'use strict';

  var opts = options || {};

  /**
   * {{pager}}
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} options Pass a modifier class to the helper.
   * @return {String}         The pagination, HTML.
   */
  exports.pager = function(context, options) {
    options = options || {};
    options.hash = options.hash || {};
    context = _.extend({modifier: ''}, context, opts.data, this, options.hash);

    var template = [
      '<ul class="pager{{#if modifier}} {{modifier}}{{/if}}">',
      '',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="previous disabled">',
      '      <a unselectable="on" class="unselectable">First</a>',
      '    </li>',
      '    <li class="previous disabled">',
      '      <a unselectable="on" class="unselectable">&larr; Previous</a>',
      '    </li>',
      '  {{/is}}',
      '',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="previous">',
      '      <a href="{{relative page.dest first.dest}}">First</a>',
      '    </li>',
      '    <li class="previous">',
      '      <a href="{{relative page.dest prev.dest}}">&larr; Previous</a>',
      '    </li>',
      '  {{/isnt}}',
      '',
      '  {{#eachItems pages}}',
      '    <li class="{{#is ../page.dest this.dest}}active {{/is}}pager-middle">',
      '      <a href="{{relative ../page.dest this.dest}}">{{@number}}</a>',
      '    </li>',
      '  {{/eachItems}}',
      '',
      '  {{#isnt pagination.currentPage pagination.totalPages}}',
      '    <li class="next">',
      '      <a href="{{relative page.dest last.dest}}">Last</a>',
      '    </li>',
      '    <li class="next">',
      '      <a href="{{relative page.dest next.dest}}">Next &rarr;</a>',
      '    </li>',
      '  {{/isnt}}',
      '',
      '  {{#is pagination.currentPage pagination.totalPages}}',
      '    <li class="next disabled">',
      '      <a unselectable="on" class="unselectable">Last</a>',
      '    </li>',
      '    <li class="next disabled">',
      '      <a unselectable="on" class="unselectable">Next &rarr;</a>',
      '    </li>',
      '  {{/is}}',
      '',
      '</ul>'
    ].join('\n');

    var styles = [
      '<style>',
        '.unselectable {',
        '  -webkit-touch-callout: none;',
        '    -webkit-user-select: none;',
        '       -moz-user-select: none;',
        '        -ms-user-select: none;',
        '            user-select: none;',
        '}',
      '</style>'
    ].join('\n');

    return new Handlebars.SafeString(Handlebars.compile(template)(context) + styles);
  };

  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
