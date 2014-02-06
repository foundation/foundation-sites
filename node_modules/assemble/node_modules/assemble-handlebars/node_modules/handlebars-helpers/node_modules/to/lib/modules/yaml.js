/*!
 * to.js - yaml parser 
 * Copyright(c) 2012 Truepattern
 * MIT Licensed
 */

var fs = require('fs');
var yaml = require('js-yaml');

// yaml parser wrapper
// - load(filename)
// - load(data)
// - stringify(doc)

// please note that if the extension is NOT yml/yaml
// it wouldn't load
exports.load = function(filename) {
  try {
    filename = filename.charAt(0)=='/'?filename:(process.cwd()+'/'+filename);
    var doc = fs.readFileSync(filename, 'utf-8');
    return this.loadContent(doc);
  } catch (e) {
    console.log(e.stack || e.toString());
  }
  throw "Error loading yaml file '" + filename + "'";
};

exports.loadContent = yaml.load;

exports.stringify = function(doc) {
  //return yaml.stringify(doc, 2);
  return json2yaml(doc);
};


  /*
   *  TODO, lots of concatenation (slow in js)
   */
  var spacing = "  ";

  function getType(obj) {
    var type = typeof obj;
    if (obj instanceof Array) {
      return 'array';
    } else if (type == 'string') {
      return 'string';
    } else if (type == 'boolean') {
      return 'boolean';
    } else if (type == 'number') {
      return 'number';
    } else if (type == 'undefined' || obj === null) {
      return 'null';
    } else {
      return 'hash';
    }
  }

  function convert(obj, ret) {
    var type = getType(obj);

    switch(type) {
      case 'array':
        convertArray(obj, ret);
        break;
      case 'hash':
        convertHash(obj, ret);
        break;
      case 'string':
        convertString(obj, ret);
        break;
      case 'null':
        ret.push('null');
        break;
      case 'number':
        ret.push(obj.toString());
        break;
      case 'boolean':
        ret.push(obj ? 'true' : 'false');
        break;
    }
  }

  function convertArray(obj, ret) {
    for (var i=0; i<obj.length; i++) {
      var ele     = obj[i];
      var recurse = [];
      convert(ele, recurse);

      for (var j=0; j<recurse.length; j++) {
        ret.push((j == 0 ? "- " : spacing) + recurse[j]);
      }
    }
  }

  function convertHash(obj, ret) {
    for (var k in obj) {
      var recurse = [];
      //if (obj.hasOwnProperty(k)) {
        var ele = obj[k];
        convert(ele, recurse);
        var type = getType(ele);
        if (type == 'string' || type == 'null' || type == 'number' || type == 'boolean') {
          ret.push(normalizeString(k) + ': ' +  recurse[0]);
        } else {
          ret.push(normalizeString(k) + ': ');
          for (var i=0; i<recurse.length; i++) {
            ret.push(spacing + recurse[i]);
          }
        }
      //}
    }
  }

  function normalizeString(str) {
    if (str.match(/^[\w]+$/)) {
      return str;
    } else {
      return JSON.stringify(str);
    }
  }

  function convertString(obj, ret) {
    ret.push(normalizeString(obj));
  }
  
 function json2yaml(obj) {
    if (typeof obj == 'string') {
      obj = JSON.parse(obj);
    }

    var ret = [];
    convert(obj, ret);
    return ret.join("\n");
  };
