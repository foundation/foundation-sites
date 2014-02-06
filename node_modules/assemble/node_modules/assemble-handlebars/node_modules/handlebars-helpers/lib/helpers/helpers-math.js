/**
 * Handlebars Math Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// node_modules
var _ = require('lodash');


// The module to be exported
var helpers = {

  add: function (value, addition) {
    return value + addition;
  },

  subtract: function (value, substraction) {
    return value - substraction;
  },

  divide: function (value, divisor) {
    return value / divisor;
  },

  multiply: function (value, multiplier) {
    return value * multiplier;
  },

  floor: function (value) {
    return Math.floor(value);
  },

  ceil: function (value) {
    return Math.ceil(value);
  },

  round: function (value) {
    return Math.round(value);
  },

  sum: function () {
    var args = _.flatten(arguments);
    var sum = 0;
    var i = args.length - 1;
    while (i--) {
      if ("number" === typeof args[i]) {
        sum += args[i];
      }
    }
    return Number(sum);
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
