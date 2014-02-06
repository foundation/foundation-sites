/**
 * Temporary - The lord of tmp.
 * 
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */
 
/**
 * Detection stolen from NPM (https://github.com/isaacs/npm/)
 * 
 * Copyright 2009, 2010, 2011 Isaac Z. Schlueter (the "Author")
 * MIT License (https://github.com/isaacs/npm/blob/master/LICENSE)
 */ 

/**
 * Detector namespace.
 * 
 * @type {Object}
 */
var detector = module.exports;

var normalize = function(path) {
  var last = Array.prototype.pop.apply(path);
  
  if (process.platform !== "win32") {
    if (last !== '/') {
      path += '/';
    }
  } else {
    //This is fine b/c Windows will 
    //correctly resolve filepaths with additional slashes
    //and it is not correct to assume that on Windows the value
    //of path will be a string that terminates in '\'.
    //
    //See: http://stackoverflow.com/questions/4158597/extra-slashes-in-path-variable-of-file-copy-or-directory-createdirectory-met
    //
    path += '/';
  }
  
  return path;
}

/**
 * Returns tmp dir. Thank you npm.
 * 
 * @returns {String} tmp dir.
 */
detector.tmp = function() {
  var temp = process.env.TMPDIR
      || process.env.TMP
      || process.env.TEMP
      || (process.platform === "win32" ? "c:\\windows\\temp\\" : "/tmp/")
  
  return normalize(temp);
};

detector._normalize = normalize;
