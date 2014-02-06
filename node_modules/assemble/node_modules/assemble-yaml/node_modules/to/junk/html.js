/*!
 * to.js - html parser 
 * 
 * Copyright(c) 2012 Truepattern
 * MIT Licensed
 */

var $ = require('jquery');

// yaml parser wrapper
// - load(filename)
// - load(data)
// - stringify(doc)

var inspect = require('util').inspect;

exports.load = function(filename) {
  try {
    doc = require(filename);
    //console.log(inspect(doc, false, 10, true));
    return doc;
  } catch (e) {
    console.log(e.stack || e.toString());
  }
};


exports.stringify = function(doc) {
  return yaml.stringify(doc, 2);
};
