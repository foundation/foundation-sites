/**
 * Handlebars Helpers
 * http://github.com/assemble/handlebars-helpers
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';


// Node.js
var path = require('path');
var fs   = require('fs');

// node_modules
var matchkeys = require('matchkeys');
var matchdep  = require('matchdep');
var _ = require('lodash');

// Local utils.
var Utils  = require('./utils/utils');


module.exports.register = function(Handlebars, options, params) {

  // Local package.json
  var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
  var cwd = path.join.bind(null, __dirname, 'helpers');

  function registerHelper(file) {
    var helper = require(file);
    if (!(typeof helper === 'undefined' || typeof helper.register === 'undefined')) {
      return helper.register(Handlebars, options, params);
    }
  }

  /**
   * Register local helpers
   */
  var localHelpers = fs.readdirSync(cwd());

  // Load local helpers.
  localHelpers.map(function(helper) {
    registerHelper(cwd(helper));
  });


  /**
   * Register helpers from node_modules
   * Attempt to find, resolve and register any helpers that are both
   * listed in the keywords and either dependencies or devDependencies
   * of package.json.
   */
  if(pkg.keywords && pkg.keywords.length > 0) {

    // Get keywords from package.json and search for matches in dependencies
    matchkeys.filter('*').map(function(keywords) {
      matchdep.filterAll(keywords, pkg).forEach(function(match) {
        // if(match.indexOf('helper') !== -1) {
          registerHelper(match);
        // }
      });
    });
  }
};
