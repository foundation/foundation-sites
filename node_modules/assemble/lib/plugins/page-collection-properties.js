/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


// This plugin will run before each page is rendered
// and will loop over the pages collection, calling
// any registered callback function passing in
// the current page context (to be rendered) and the current
// page (from the pages collection) allowing
// additional relative page properties to be added.

var path = require('path');
var _ = require('lodash');

var options = {
  stage: 'render:pre:page'
};


var defaults = [
  // add an isCurrentPage flag to the page if the dest matches
  function isCurrentPage(page, context) {
    page.isCurrentPage = (page.dest === context.page.dest ? true : false);
  },

  // add a relative link from the "current page" to the
  // page in the collection
  function relativeLink(page, context) {
    var relativePath = path.relative(path.dirname(context.page.dest), path.dirname(page.dest));
    relativePath = path.join(relativePath, path.basename(page.dest));
    page.relativeLink = relativePath.replace(/\\/g, '/');
  }
];


var plugin = function(params, next) {
  var options = params.assemble.options;
  var pageCollectionOpts = options.pageCollection || {};
  var callbacks = pageCollectionOpts.preprocess || [];

  if (!_.isArray(callbacks)) {
    callbacks = [callbacks];
  }

  callbacks = _.union(callbacks, defaults);

  _.map(params.context.pages, function(page) {
    _.map(callbacks, function(callback) {
      callback(page, params.context);
    });
  });

  next();
};


// export options
plugin.options = options;
module.exports = plugin;

