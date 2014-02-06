/**
 * Handlebars Helpers: Data
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var fs = require('fs');


// node_modules
var _ = require('lodash');


// Local utils
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {

  /**
   * {{value}}
   * Extract a value from a specific property
   * @param  {[type]} filepath [description]
   * @param  {[type]} prop     [description]
   * @return {[type]}          [description]
   */
  value: function (filepath, prop) {
    filepath = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    prop = _.pick(filepath, prop);
    prop = _.pluck(prop);
    return new Utils.safeString(prop);
  },

  /**
   * {{prop}}
   * Extract a specific property
   * @param  {[type]} filepath [description]
   * @param  {[type]} prop     [description]
   * @return {[type]}          [description]
   */
  prop: function (filepath, prop) {
    filepath = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    prop = _.pick(filepath, prop);
    return new Utils.safeString(JSON.stringify(prop, null, 2));
  },

  /**
   * {{stringify}}
   * Stringify an object to JSON
   * @param  {[type]} filepath [description]
   * @return {[type]}          [description]
   */
  stringify: function (filepath) {
    filepath = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return new Utils.safeString(JSON.stringify(filepath, null, 2));
  },

  /**
   * {{parseJSON}}
   * Contributed by github.com/keeganstreet
   */
  parseJSON: function (data, options) {
    return options.fn(JSON.parse(data));
  }

};

// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};

  /**
   * {{opt}} example helper
   * Return a property from the `assemble.options` object
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  helpers.opt = function(key) {
    return options[key] || "";
  };

  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
