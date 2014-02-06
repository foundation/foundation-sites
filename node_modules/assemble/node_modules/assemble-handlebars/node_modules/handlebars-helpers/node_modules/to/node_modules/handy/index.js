/**
 * handy - main file
 * MIT Licensed.
 */

// module dependencies
var fs   = require('fs');
var path = require('path');

/*
 * These are general utilities that are expected to run on the server 
 * side.
 */

/**
 * Get the version of current package in package.json
 * - packageDir - pass the path where package.json is present 
 *        or will look for package.json in __dirname/..
 * [return]  version value (or) empty string if not found
 */
exports.getVersion = function (packageDir) {
  var pathName = packageDir || path.join(__dirname,'..','..');
  // check if file is present
  pathName = path.join(pathName, 'package.json');
  if(fs.existsSync(pathName)) {
    return fs.readFileSync(pathName).toString().match(/"version"\s*:\s*"([\d.]+)"/)[1];
  }
  return "";
};

/**
 * Get user home directory.
 * - in case of win platform uses 'USERPROFILE'
 * - in case of other platforms uses 'HOME'
 */
exports.getUserHome = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

/**
 * Find type of a given object. 
 *
 * [returns] lower case type name like 'number', 'array', 'object' etc.,
 */
exports.getType = function(obj) {
  return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * Find the file extension (after the last '.').
 * For no extension cases, a default extension can be passed as second argument
 * [returns] string after '.' (extension) or default extension if no '.' found
 */
exports.getFileExtension = function(filename, defaultExtension)
{
  var pattern = /^.*?\.([^.]*)$/g;
  var lastWord = pattern.exec(filename);
  return lastWord && lastWord[1].length>0?lastWord[1]:(defaultExtension?defaultExtension:"");
};

/**
 * Compare two arrays for equality (only one level check)
 *
 * [returns] false if both are not equal (or) true if equal
 */
exports.isArrayEqual = function (arrayOne, arrayTwo) {
  if(this.getType(arrayOne) !== 'array' || 
     this.getType(arrayTwo) !== 'array' || 
     arrayOne.length !== arrayTwo.length) {
    return false;
  }
  // use slice, so not to impact the original array
  return arrayOne.slice().sort().toString() === arrayTwo.slice().sort().toString();
};

/**
 * Compare if two objects are equal/not.
 * 
 * [returns] true if both objects are equal (or) false if not equal
 */
exports.isObjectEqual = function (objectOne, objectTwo) {
  var self = this;
  /* sort the elements in object */
  function sort(o) {
    if (self.getType(o) === 'object') {
      return Object.keys(o).sort().map(function(key) {
        return { k: key, v: sort(o[key]) };
      });
    } 
    return o;
  }
  // get a json output and compare each
  return JSON.stringify(sort(objectOne)) === JSON.stringify(sort(objectTwo));
};


/**
 * Merge (one level) objects and return back
 * the combined object.
 * -- pass in multiple arguments
 * on failure, would return an empty object ({} or [])
 */
exports.merge = function() {
  // type is determined by the first argument
  var res = (arguments.length>0 && this.getType(arguments[0])=='array')?[]:{};
  // merge all the objects to res
  // keys get overwritten from left to right
  for(var i=0;i<arguments.length;i++) {
    var obj = arguments[i];
    Object.keys(obj).forEach(function (key) {
      res[key] = obj[key];
    });
  }
  return res;
};

/**
 * Deep Merge objects and return back
 * the combined object.
 * -- pass in multiple arguments
 * on failure, would return an empty object ({})
 */
exports.deepMerge = function() {
  // type is determined by the first argument
  var res = (arguments.length>0 && this.getType(arguments[0])=='array')?[]:{};
  var self=this;
  // merge all the objects to res
  // keys get overwritten from left to right
  for(var i=0;i<arguments.length;i++) {
    var obj = arguments[i];
    Object.keys(obj).forEach(function (key) {
      var val = obj[key];
      if(res.hasOwnProperty(key) && 
         self.getType(val)=='object' &&
         self.getType(res[key])=='object') {
        res[key] = self.deepMerge(res[key], val);
      } else {
        res[key] = obj[key];
      }
    });
  }
  return res;
};


// -- EOF