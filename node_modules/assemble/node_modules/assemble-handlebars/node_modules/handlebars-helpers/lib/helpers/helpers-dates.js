/**
 * Handlebars Date Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Local utils
var Utils = require('../utils/utils');
var Dates = require('../utils/dates');



// The module to be exported
var helpers = {

  /**
   * {{formatData}}
   * Port of formatDate-js library (http://bit.ly/18eo2xw)
   * @param  {[type]} date   [description]
   * @param  {[type]} format [description]
   * @return {[type]}        [description]
   */
  formatDate: function (date, format) {
    date = new Date(date);
    return Dates.format(date, format);
  },

  /**
   * {{now}}
   * @param  {[type]} format [description]
   * @return {[type]}        [description]
   */
  now: function (format) {
    var date = new Date();
    if (Utils.isUndefined(format)) {
      return date;
    } else {
      return Dates.format(date, format);
    }
  },

  /**
   * {{timeago}}
   * Modified version of http://bit.ly/18WwJYf
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  timeago: function (date) {
    date = new Date(date);
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {return "" + interval + " years ago"; }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {return "" + interval + " months ago"; }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {return "" + interval + " days ago"; }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {return "" + interval + " hours ago"; }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {return "" + interval + " minutes ago"; }
    if (Math.floor(seconds) === 0) {
      return 'Just now';
    } else {
      return Math.floor(seconds) + ' seconds ago';
    }
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
