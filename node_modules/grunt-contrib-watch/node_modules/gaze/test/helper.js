'use strict';

var helper = module.exports = {};

helper.sortobj = function sortobj(obj) {
  if (Array.isArray(obj)) {
    obj.sort();
    return obj;
  }
  var out = Object.create(null);
  var keys = Object.keys(obj);
  keys.sort();
  keys.forEach(function(key) {
    var val = obj[key];
    if (Array.isArray(val)) {
      val.sort();
    }
    out[key] = val;
  });
  return out;
};
