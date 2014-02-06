/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


// This plugin will run before the pages are rendered to
// generate a pagination object that can be used to find
// the previous and next pages
var options = {
  stage: 'render:pre:*'
};


var plugin = function(params, next) {

  var buildPaginationInfo = function() {
    var pages = params.assemble.options.pages;

    var i = 0;
    var prevPage = null;

    for (var j = pages.length; i < j; i++) {
      var page = pages[i];

      // Index and actual page number
      page.index = i;
      page.number = i + 1;

      // First page
      page.first = (i === 0);

      // Previous page
      if (prevPage !== null) {
        page.prev = prevPage;
      }

      // Middle pages
      page.middle = i > 0 && i < (j - 1);

      // Next page
      if (i < pages.length - 1) {
        page.next = i + 1;
      }

      // Last page
      page.last = i === (j - 1);
      prevPage = i;
    }
  };


  var addPaginationInfoToContext = function() {
    var context     = params.context;
    var pages       = context.pages;
    var currentPage = context.page;

    params.context.pagination = {
      first      : pages[currentPage.first  || 0],
      prev       : pages[currentPage.prev   || 0],
      middle     : pages[currentPage.middle],
      next       : pages[currentPage.next   || (pages.length - 1)],
      last       : pages[currentPage.last   || (pages.length - 1)],

      index      : pages[currentPage.index],
      number     : currentPage.index + 1,
      currentPage: currentPage.index + 1,
      totalPages : pages.length
    };
  };


  if (params.stage === 'render:pre:pages') {
    buildPaginationInfo();
  } else if (params.stage === 'render:pre:page') {
    addPaginationInfoToContext();
  }
  next();
};


// export options
plugin.options = options;
module.exports = plugin;
