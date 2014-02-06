/**
 * Handlebars Helpers: String Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Local utils.
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {

  /**
   * {{capitalizeFirst}}
   * Capitalize first word in a sentence
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  capitalizeFirst: function (str) {
    if(str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },

  /**
   * {{capitalizeEach}}
   * Capitalize each word in a sentence
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  capitalizeEach: function (str) {
    if(str && typeof str === "string") {
      return str.replace(/\w\S*/g, function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
      });
    }
  },

  /**
   * {{center}}
   * Center a string using non-breaking spaces
   * @param  {[type]} str    [description]
   * @param  {[type]} spaces [description]
   * @return {[type]}        [description]
   */
  center: function (str, spaces) {
    if(str && typeof str === "string") {
      var space = '';
      var i = 0;
      while (i < spaces) {
        space += '&nbsp;';
        i++;
      }
      return "" + space + str + space;
    }
  },

  /**
   * {{dashify}}
   * Replace periods in string with hyphens.
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  dashify: function (str) {
    if(str && typeof str === "string") {
      return str.split(".").join("-");
    }
  },

  /**
   * {{hyphenate}}
   * Replace spaces in string with hyphens.
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  hyphenate: function (str) {
    if(str && typeof str === "string") {
      return str.split(" ").join("-");
    }
  },

  /**
   * {{lowercase}}
   * Make all letters in the string lowercase
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  lowercase: function (str) {
    if(str && typeof str === "string") {
      return str.toLowerCase();
    }
  },

  /**
   * {{safeString}}
   * Output a Handlebars safeString
   * @param  {[type]} str [description]
   * @return {[type]}       [description]
   */
  safeString: function (str) {
    if(str && typeof str === "string") {
      return new Utils.safeString(str);
    }
  },

  /**
   * {{sentence}}
   * Sentence case
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  sentence: function (str) {
    if(str && typeof str === "string") {
      return str.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },

  /**
   * {{titleize}}
   * Title case. "This is Title Case"
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  titleize: function (str) {
    if(str && typeof str === "string") {
      var title = str.replace(/[ \-_]+/g, ' ');
      var words = title.match(/\w+/g);
      var capitalize = function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };
      return ((function () {
        var i, len, results;
        results = [];
        for (i = 0, len = words.length; i < len; i++) {
          var word = words[i];
          results.push(capitalize(word));
        }
        return results;
      })()).join(' ');
    }
  },

  uppercase: function (options) {
    if(options && typeof options === "string") {
      return options.toUpperCase();
    } else if(options && typeof options === "object") {
      return options.fn(this).toUpperCase();
    }
  },

  reverse: function (str) {
    if(str && typeof str === "string") {
      return str.split('').reverse().join('');
    }
  },

  /**
   * {{count}}
   * Return the nuumber of occurrances of a string, within a string
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * @param  {String} str       The haystack
   * @param  {String} substring The needle
   * @return {Number}           The number of times the needle is found in the haystack.
   */
  count: function (str, substring) {
    if(str && typeof str === "string") {
      var n = 0;
      var pos = 0;
      var l = substring.length;
      while (true) {
        pos = str.indexOf(substring, pos);
        if (pos > -1) {
          n++;
          pos += l;
        } else {
          break;
        }
      }
      return n;
    }
  },

  /**
   * {{replace}}
   * Replace occurrences of string "A" with string "B"
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * @param  {[type]} str [description]
   * @param  {[type]} a   [description]
   * @param  {[type]} b   [description]
   * @return {[type]}     [description]
   */
  replace: function (str, a, b) {
    if(str && typeof str === "string") {
      return str.split(a).join(b);
    }
  },

  /**
   * {{ellipsis}}
   * @author: Jon Schlinkert <http://github.com/jonschlinkert>
   * Truncate the input string and removes all HTML tags
   * @param  {String} str      The input string.
   * @param  {Number} limit    The number of characters to limit the string.
   * @param  {String} append   The string to append if charaters are omitted.
   * @return {String}          The truncated string.
   */
  ellipsis: function (str, limit, append) {
    if (Utils.isUndefined(append)) {
      append = '';
    }
    var sanitized = str.replace(/(<([^>]+)>)/g, '');
    if (sanitized.length > limit) {
      return sanitized.substr(0, limit - append.length) + append;
    } else {
      return sanitized;
    }
  },

  /**
   * {{truncate}}
   * Truncates a string given a specified `length`,
   * providing a custom string to denote an `omission`.
   * @param  {[type]} str      [description]
   * @param  {[type]} length   [description]
   * @param  {[type]} omission [description]
   * @return {[type]}          [description]
   */
  truncate: function (str, limit, omission) {
    if (Utils.isUndefined(omission)) {
      omission = '';
    }
    if (str.length > limit) {
      return str.substring(0, limit - omission.length) + omission;
    } else {
      return str;
    }
  },

  /**
   * {{startsWith}}
   * @author: Dan Fox <http://github.com/iamdanfox>
   *
   * Tests whether a string begins with the given prefix.
   * Behaves sensibly if the string is null.
   * @param  {[type]} prefix     [description]
   * @param  {[type]} testString [description]
   * @param  {[type]} options    [description]
   * @return {[type]}            [description]
   *
   * @example:
   *   {{#startsWith "Goodbye" "Hello, world!"}}
   *     Whoops
   *   {{else}}
   *     Bro, do you even hello world?
   *   {{/startsWith}}
   */
  startsWith: function (prefix, str, options) {
    if ((str != null ? str.indexOf(prefix) : void 0) === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
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
