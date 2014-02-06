/**
 * Handlebars Collections Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// node_modules
var Handlebars = require('../helpers/helpers').Handlebars;
var _          = require('lodash');


// Local utils
var Utils      = require('../utils/utils');


// The module to be exported
var helpers = {


  /**
   * {{any}}
   * @param  {Array}  array
   * @param  {Object} options
   */
  any: function (array, options) {
    if (array.length > 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  /**
   * Returns all of the items in the collection after the specified count.
   * @param  {Array}  array Collection
   * @param  {Number} count Number of items to exclude
   * @return {Array}        Array excluding the number of items specified
   */
  after: function (array, count) {
    return array.slice(count);
  },


  /**
   * Use all of the items in the collection after the specified count
   * inside a block.
   * @param  {Array}  array
   * @param  {Number} count
   * @param  {Ojbect} options
   * @return {Array}
   */
  withAfter: function (array, count, options) {
    array = array.slice(count);
    var result = '';
    for (var item in array) {
      result += options.fn(array[item]);
    }
    return result;
  },


  /**
   * {{arrayify}}
   * Converts a string such as "foo, bar, baz" to an ES Array of strings.
   * @credit: http://bit.ly/1840DsB
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  arrayify: function (str) {
    return str.split(",").map(function (tag) {
      return "\"" + tag + "\"";
    });
  },


  /**
   * Returns all of the items in the collection before the specified
   * count. Opposite of {{after}}.
   * @param  {Array}  array [description]
   * @param  {[type]} count [description]
   * @return {[type]}       [description]
   */
  before: function (array, count) {
    return array.slice(0, -count);
  },


  /**
   * Use all of the items in the collection before the specified count
   * inside a block. Opposite of {{withAfter}}
   * @param  {Array}  array   [description]
   * @param  {[type]} count   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  withBefore: function (array, count, options) {
    array = array.slice(0, -count);
    var result = '';
    for (var item in array) {
      result += options.fn(array[item]);
    }
    return result;
  },


  /**
   * {{first}}
   * Returns the first item in a collection.
   *
   * @param  {Array}  array
   * @param  {[type]} count
   * @return {[type]}
   */
  first: function (array, count) {
    if (Utils.isUndefined(count)) {
      return array[0];
    } else {
      return array.slice(0, count);
    }
  },

  /**
   * {{withFirst}}
   * Use the first item in a collection inside a block.
   *
   * @param  {Array}  array   [description]
   * @param  {[type]} count   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  withFirst: function (array, count, options) {
    var item, result;
    if (Utils.isUndefined(count)) {
      options = count;
      return options.fn(array[0]);
    } else {
      array = array.slice(0, count);
      result = '';
      for (item in array) {
        result += options.fn(array[item]);
      }
      return result;
    }
  },

  /**
   * Returns the last item in a collection. Opposite of `first`.
   * @param  {Array}  array [description]
   * @param  {[type]} count [description]
   * @return {[type]}       [description]
   */
  last: function (array, count) {
    if (Utils.isUndefined(count)) {
      return array[array.length - 1];
    } else {
      return array.slice(-count);
    }
  },

  /**
   * Use the last item in a collection inside a block.
   * Opposite of {{withFirst}}.
   * @param  {Array}  array   [description]
   * @param  {[type]} count   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  withLast: function (array, count, options) {
    if (Utils.isUndefined(count)) {
      options = count;
      return options.fn(array[array.length - 1]);
    } else {
      array = array.slice(-count);
      var result = '';
      for (var item in array) {
        result += options.fn(array[item]);
      }
      return result;
    }
  },

  /**
   * Joins all elements of a collection into a string
   * using a separator if specified.
   * @param  {Array}  array     [description]
   * @param  {[type]} separator [description]
   * @return {[type]}           [description]
   */
  join: function (array, separator) {
    return array.join(Utils.isUndefined(separator) ? ' ' : separator);
  },


  /**
   * Handlebars "joinAny" block helper that supports
   * arrays of objects or strings. implementation found here:
   * https://github.com/wycats/handlebars.js/issues/133
   *
   * @param  {[type]} items [description]
   * @param  {[type]} block [description]
   * @return {[type]}       [description]
   *
   * If "delimiter" is not speficified, then it defaults to ",".
   * You can use "start", and "end" to do a "slice" of the array.
   * @example:
   *   Use with objects:
   *   {{#join people delimiter=" and "}}{{name}}, {{age}}{{/join}}
   * @example:
   *   Use with arrays:
   *   {{join jobs delimiter=", " start="1" end="2"}}
   *
   */
  joinAny: function (items, block) {
    var delimiter = block.hash.delimiter || ",";
    var start = block.hash.start || 0;
    var len = (items ? items.length : 0);
    var end = block.hash.end || len;
    var out = '';
    if (end > len) {
      end = len;
    }
    if ('function' === typeof block) {
      var i = start;
      while (i < end) {
        if (i > start) {
          out += delimiter;
        }
        if ('string' === typeof items[i]) {
          out += items[i];
        } else {
          out += block(items[i]);
        }
        i++;
      }
      return out;
    } else {
      return [].concat(items).slice(start, end).join(delimiter);
    }
  },


  sort: function (array, field) {
    if (Utils.isUndefined(field)) {
      return array.sort();
    } else {
      return array.sort(function (a, b) {
        return a[field] > b[field];
      });
    }
  },


  withSort: function (array, field, options) {
    array = _.cloneDeep(array);
    var getDescendantProp = function (obj, desc) {
      var arr = desc.split('.');
      while (arr.length && (obj = obj[arr.shift()])) {
        continue;
      }
      return obj;
    };
    var result = '';
    var item;
    var i;
    var len;
    if (Utils.isUndefined(field)) {
      options = field;
      array = array.sort();
      if (options.hash && options.hash.dir === 'desc') {
        array = array.reverse();
      }
      for (i = 0, len = array.length; i < len; i++) {
        item = array[i];
        result += options.fn(item);
      }
    } else {
      array = array.sort(function (a, b) {
        var aProp = getDescendantProp(a, field);
        var bProp = getDescendantProp(b, field);
        if (aProp > bProp) {
          return 1;
        } else {
          if (aProp < bProp) {
            return -1;
          }
        }
        return 0;
      });
      if (options.hash && options.hash.dir === 'desc') {
        array = array.reverse();
      }
      for (item in array) {
        result += options.fn(array[item]);
      }
    }
    return result;
  },


  length: function (array) {
    return array.length;
  },


  lengthEqual: function (array, length, options) {
    if (array.length === length) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  empty: function (array, options) {
    if (array.length <= 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  /**
   * {{inArray}}
   *
   * @param  {Array}  array   [description]
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  inArray: function (array, value, options) {
    var _indexOf = require('../utils/lib/indexOf');
    if (_indexOf.call(array, value) >= 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  /**
   * {{filter}}
   * @param  {[type]} array   [description]
   * @param  {[type]} value   [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  filter: function(array, value, options) {

    var data = void 0;
    var content = '';
    var results = [];

    if(options.data) {
      data = Handlebars.createFrame(options.data);
    }

    // filtering on a specific property
    if(options.hash && options.hash.property) {

      var search = {};
      search[options.hash.property] = value;
      results = _.filter(array, search);

    } else {

      // filtering on a string value
      results = _.filter(array, function(v, k) {
        return value === v;
      });

    }

    if(results && results.length > 0) {
      for(var i=0; i < results.length; i++){
        content += options.fn(results[i], {data: data});
      }
    } else {
      content = options.inverse(this);
    }
    return content;
  },

  /**
   * {{iterate}}
   *
   * Similar to {{#each}} helper, but treats array-like objects
   * as arrays (e.g. objects with a `.length` property that
   * is a number) rather than objects. This lets us iterate
   * over our collections items.
   *
   * @param  {[type]} context [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  iterate: function (context, options) {
    var fn = options.fn;
    var inverse = options.inverse;
    var i = 0;
    var ret = "";
    var data = void 0;
    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }
    if (context && typeof context === 'object') {
      if (typeof context.length === 'number') {
        var j = context.length;
        while (i < j) {
          if (data) {data.index = i;}
          ret = ret + fn(context[i], {data: data});
          i++;
        }
      } else {
        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            if (data) {data.key = key;}
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }
    if (i === 0) {ret = inverse(this);}
    return ret;
  },


  /**
   * {{forEach}}
   * Credit: http://bit.ly/14HLaDR
   *
   * @param  {[type]}   array [description]
   * @param  {Function} fn    [description]
   * @return {[type]}         [description]
   *
   * @example:
   *   var accounts = [
   *     {'name': 'John', 'email': 'john@example.com'},
   *     {'name': 'Malcolm', 'email': 'malcolm@example.com'},
   *     {'name': 'David', 'email': 'david@example.com'}
   *   ];
   *
   *   {{#forEach accounts}}
   *     <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
   *       {{ name }}
   *     </a>{{#unless isLast}}, {{/unless}}
   *   {{/forEach}}
   */
  forEach: function (array, fn) {
    var total = array.length;
    var buffer = "";
    // Better performance: http://jsperf.com/for-vs-forEach/2
    var i = 0;
    var j = total;
    while (i < j) {
      // stick an index property onto the item, starting
      // with 1, may make configurable later
      var item = array[i];
      item['index'] = i + 1;
      item['_total'] = total;
      item['isFirst'] = i === 0;
      item['isLast'] = i === (total - 1);
      // show the inside of the block
      buffer += fn.fn(item);
      i++;
    }
    // return the finished buffer
    return buffer;
  },


  /**
   * {{eachProperty}}
   * Handlebars block helper to enumerate
   * the properties in an object
   *
   * @param  {[type]} context [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  eachProperty: function (context, options) {
    var content = (function () {
      var results = [];
      for (var key in context) {
        var value = context[key];
        results.push(options.fn({
          key: key,
          value: value
        }));
      }
      return results;
    })();
    return content.join('');
  },


  /**
   * {{eachIndex}}
   *
   * @param  {Array}  array   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   * @example:
   *   {{#eachIndex collection}}
   *     {{item}} is {{index}}
   *   {{/eachIndex}}
   */
  eachIndex: function (array, options) {
    var i;
    var len;
    var result = '';
    var index;
    for (index = i = 0, len = array.length; i < len; index = ++i) {
      var value = array[index];
      result += options.fn({
        item: value,
        index: index
      });
    }
    return result;
  },

  /**
   * {{eachIndexPlusOne}}
   *
   * @param  {Array}  array   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   * @example:
   *   {{#eachIndexPlusOne collection}}
   *     {{item}} is {{index}}
   *   {{/eachIndexPlusOne}}
   */
  eachIndexPlusOne: function (array, options) {
    var result = '';
    var len;
    var i;
    var index;
    for (index = i = 0, len = array.length; i < len; index = ++i) {
      var value = array[index];
      result += options.fn({
        item: value,
        index: index + 1
      });
    }
    return result;
  }

};

module.exports.register = function (Handlebars, options) {
  options = options || {};

  for (var helper in helpers) {
    Handlebars.registerHelper(helper, helpers[helper]);
  }
  return this;
};
