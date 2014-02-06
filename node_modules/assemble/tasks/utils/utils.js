/*
 * Assemble exports
 * https://github.com/assemble/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */


// Node.js
var path = require('path');

// node_modules
var grunt = require('grunt');
var _str  = require('underscore.string');
var _     = require('lodash'); // newer methods

// The module to be exported.
var exports = module.exports = {};



// Windows? (from grunt.file)
var win32 = process.platform === 'win32';
exports.pathNormalize = function(urlString) {
  if (win32) {
  return urlString.replace(/\\/g, '/');
  } else {
    return urlString;
  }
};


exports.filenameRegex = /[^\\\/:*?"<>|\r\n]+$/i;

exports.extension = function(filename) {
  grunt.verbose.writeln('extension');
  grunt.verbose.writeln(filename);
  if(grunt.util.kindOf(filename) === 'array' && filename.length > 0) {
    filename = filename[0];
  }
  return _(filename.match(/[^.]*$/)).last();
};


/**
 * Check if the give file path ends with a slash.
 * @param  {String}  filePath
 * @return {Boolean}
 */
exports.endsWithSlash = function(filePath) {
  return _str.endsWith(path.normalize(filePath), path.sep);
};
var endsWithSlash = exports.endsWithSlash;

/**
 * Re-calculate the path from dest file to the given directory
 * defined in the assemble options, such as `assets`.
 * @param  {String} dest     Destination of the file.
 * @param  {String} toPath   Calculated "new" path.
 * @param  {String} origPath Stored original path to check against.
 * @return {String}
 */
exports.calculatePath = function(destdir, toPath, origPath) {
  var relativePath = path.relative(path.resolve(destdir), path.resolve(toPath));
  toPath = exports.pathNormalize(relativePath);
  // if the relative path is blank, then it's the same folder
  // so update to be '' or './'
  if(!toPath || toPath.length === 0) {
    // if the original path had a trailing slash
    if(endsWithSlash(origPath)) {
      // return './'
      toPath = './';
    } else {
      // otherwise return ''
      toPath = '.';
    }
  }
  // if the original path had a trailing slash and the calculated
  // path does not, add a trailing slash
  if(endsWithSlash(origPath) && !endsWithSlash(toPath)) {
    toPath += '/';
    // Otherwise, if the original path did not have a trailing slash
    // and the calculated path does, remove the trailing slash
  } else if (!endsWithSlash(origPath) && endsWithSlash(toPath)) {
    toPath = toPath.substring(0, toPath.length - 2);
  }
  return toPath;
};

/**
 * Returns 'directory' or 'file' based on the given path.
 * @param  {String} file path
 */
 exports.detectDestType = function(dest) {
  if(_str.endsWith(dest, '/') || grunt.file.isDir(dest)) {
    return 'directory';
  } else if (grunt.file.isFile(dest)) {
    if (grunt.file.exists(dest)) {
      return 'file';
    } else {
      throw new Error('Invalid file path.');
    }
  }
};

exports.findBasePath = function(srcFiles, basePath) {
  if (basePath === false) {return '';}
  if (grunt.util.kindOf(basePath) === 'string' && basePath.length >= 1) {
    return _(path.normalize(basePath)).trim(path.sep);
  }
  var foundPath, basePaths = [], dirName;
  srcFiles.forEach(function(srcFile) {
    srcFile = path.normalize(srcFile);
    dirName = path.dirname(srcFile);
    basePaths.push(dirName.split(path.sep));
  });
  basePaths = _.intersection.apply([], basePaths);
  foundPath = path.join.apply(path, basePaths);
  if (foundPath === '.') {foundPath = '';}
  return foundPath;
};



/**
 * Read in the given data file based on the file extension.
 * @param  {String} ext The file extension to check.
 * @return {Object}     JSON data object.
 */
exports.dataFileReaderFactory = function(ext) {
  var reader = grunt.file.readJSON;
  switch(ext) {
    case '.json':
      reader = grunt.file.readJSON;
      break;
    case '.yml':
    case '.yaml':
      reader = grunt.file.readYAML;
      break;
  }
  return reader;
};
