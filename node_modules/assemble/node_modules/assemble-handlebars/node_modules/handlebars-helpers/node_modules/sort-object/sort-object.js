/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var _ = require('lodash');

function getKeys(obj) {
  return _.keys(obj);
};

/**
 * Custom sort function to allow sorting by descending order
 * @param  {Object}     opts optional parameter specifying which order to sort in.
 * @return {Function}   function used to pass into a sort function.
 */
function sortBy(opts) {

  return function (objA, objB) {
    var result = 0;
    result = objA < objB ? -1 : 1;

    if(opts.order.toLowerCase() === 'desc') {
      return result * -1;
    }
    return result;
  };
};

function sortKeys (obj, opts) {
  var keys = [];
  var key;

  keys = opts.keys(obj);
  keys.sort(sortBy(opts));

  return keys;
};


/**
 * Sorts the ksys on an object
 * @param  {Object} obj     Object that has keys to be sorted
 * @param  {Object} options Optional parameter specifying orders for the function
 * @return {Object}         Object with keys sorted
 */
function sort(obj, options) {

  var opts = _.extend({ order: 'asc', property: false, keys: getKeys }, options);

  var sorted = {};
  var keys = [];
  var key;

  if(opts.property && opts.property !== false) {

    if(opts.property === true) {
      var inverted = _.invert(obj);
      keys = sortKeys(inverted, opts);

      for (var index in keys) {
        key = keys[index];
        sorted[inverted[key]] = key;
      }

    } else {

      var pairs = _.pairs(obj);
      var expanded = [];
      var keys = {};
      for (var i = 0; i < pairs.length; i++) {
        key = pairs[i][1][opts.property];
        keys[key] = pairs[i][0];
        expanded.push(pairs[i][1]);
      }

      expanded = _.sortBy(expanded, opts.property);

      if(opts.order.toLowerCase() === 'desc') {
        expanded.reverse();
      }

      for (var i = 0; i < expanded.length; i++) {
        var value = expanded[i][opts.property];
        sorted[keys[value]] = expanded[i];
      }
    }

  } else {

    keys = sortKeys(obj, opts);
    for (var index in keys) {
      key = keys[index];
      sorted[key] = obj[key];
    }

  }

  return sorted;
};

module.exports = sort;