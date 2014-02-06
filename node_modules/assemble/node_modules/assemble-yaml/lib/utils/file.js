/*
 * file.js is based on grunt.file
 * assemble-yaml
 * https://github.com/assemble/assemble-yaml
 *
 * Copyright (c) 2013 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

// Node.js
var fs = require('fs');
var path = require('path');

// node_modules
var chalk = require('chalk');
var iconv = require('iconv-lite');


var file = module.exports = {};

// True if the file path exists.
file.exists = function () {
  var filepath = path.join.apply(path, arguments);
  return fs.existsSync(filepath);
};

// Like mkdir -p. Create a directory and any intermediary directories.
file.mkdir = function (dirpath, mode) {
  // Set directory mode in a strict-mode-friendly way.
  if (mode == null) {
    mode = parseInt('0777', 8) & (~process.umask());
  }
  dirpath.split(/[\/\\]/g).reduce(function (parts, part) {
    parts += part + '/';
    var subpath = path.resolve(parts);
    if (!file.exists(subpath)) {
      try {
        fs.mkdirSync(subpath, mode);
      } catch (e) {
        console.error('Unable to create directory "' + subpath + '" (Error code: ' + e.code + ').', e);
      }
    }
    return parts;
  }, '');
};

// Write a file.
file.write = function (filepath, contents, options) {
  options = options || {};

  // Create path, if necessary.
  file.mkdir(path.dirname(filepath));
  try {
    // If contents is already a Buffer, don't try to encode it. If no encoding
    // was specified, use the default.
    if (!Buffer.isBuffer(contents)) {
      contents = iconv.encode(contents, 'utf8');
    }
    // Actually write file.
    fs.writeFileSync(filepath, contents);
    return true;
  } catch (e) {
    console.error('Unable to write "' + filepath + '" file (Error code: ' + e.code + ').', e);
  }
};

