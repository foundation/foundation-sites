/*!
 * to.js - xml parser 
 * Copyright(c) 2012 Truepattern
 * MIT Licensed
 */

var xmlparser = require('htmlparser');
var fs = require('fs');
var _ = require('underscore');

// xml parser wrapper
// - load(filename)
// - load(data)
// - stringify(doc)
exports.load = function(filename) {
  try {
    var doc = fs.readFileSync(filename, 'utf-8');
    var handler = new xmlparser.DefaultHandler(function (error, dom) {
      if (error) {
        console.log(error);
      } else {
        var cleanedObj = cleanDom(dom);
        cleanedObj = cleanedObj ? cleanedObj.length==1 ? cleanedObj[0]:cleanedObj : {};
        handler.dom=cleanedObj;
      }
    }, { verbose: false, ignoreWhitespace: true, enforceEmptyTags:false });
    var parser = new xmlparser.Parser(handler);
    parser.parseComplete(doc);
    return handler.dom;
  } catch (e) {
    console.log(e.stack || e.toString());
  }
  throw "Error loading xml file '" + filename + "'";
};

/**
 * Clean the dom:
 * - directives are removed
 * - tags are matched to keys and attributes are object k/v
 * - arrays properly cleaned up for json
 * 
 */
function cleanDom(dom) {
  var result = [];
  for(var i=0;i<dom.length;i++) {
    var node = dom[i];
    //console.log(node);
    if(node.type=='directive') continue;
    if(node.type=='tag') {
      var k = node.name;
      var v = node.attribs || {};
      var obj = {};
      obj[k] = v;
      if(node.hasOwnProperty("children")) {
        //console.log(node.children);
        //console.log(cleanDom(node.children));
        _.each(cleanDom(node.children), function(o) { 
          if(!_.isObject(o) || !_.isObject(v)) {
            if(_.isObject(v)) {
              if(_.size(v)==0) {
                v=o;
              } else {
                v['_text']=o;
              }
            }  else if(_.isArray(v)) {
              v.push(o); 
            } else {
              v=[v];
              v.push(o);
            }
            obj[k] = v;
          } else {
            // first step is to merge same key items
            // basically convert them to arrays
            var sameKeys = _.intersection(_.keys(o), _.keys(v));
            _.each(sameKeys, function(k) {
              if(!_.isArray(v[k])) {
                v[k]=[v[k]];
              }
              v[k]=v[k].concat(o[k]);
            });
            var remainingObj = _.omit(o, sameKeys);
            _.extend(v, remainingObj); 
          }
        });
      }
      result.push(obj);
    }
    if(node.type=='text') {
      result.push(node.data);
    }
  }
  //console.log(result);
  return result;
}

exports.stringify = function(doc) {
  return doc;
};
