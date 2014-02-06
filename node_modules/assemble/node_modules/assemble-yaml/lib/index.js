/*
 * assemble-yaml
 * https://github.com/assemble/assemble-yaml
 *
 * Copyright (c) 2013 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';


// Node.js
var path  = require('path');
var fs    = require('fs');

// node_modules
var iconv = require('iconv-lite');
var chalk = require('chalk');
var glob  = require('globule');
var yaml  = require('js-yaml');
var YAML  = require('to').format.yaml;
var _     = require('lodash');

// Local utils.
var file = require('./utils/file');


var yamlOptions = ['filename', 'strict', 'schema'];

/**
 * Extract YAML front matter and content from files.
 * @param  {String} src  The file to read.
 * @param  {Object} opts Options to pass to js-yaml
 * @return {Object}      Object with three properties
 *  {
 *    "context": {}         // Object. Stringified JSON from YAML front matter
 *    "content": ""         // String. File content, stripped of YAML front matter
 *    "originalContent": "" // String. Both content and YAML front matter.
 *  }
 */
exports.extract = function (src, opts) {

  var options = _.extend({}, {fromFile: true}, opts);
  var data = {
    originalContent: '',
    content: '',
    context: {}
  };

  // Default delimiter
  var delim = '---';

  if (options.fromFile) {
    if (!fs.existsSync(src)) {
      console.log('File: ' + src + ' not found.');
      return false;
    }

    // Read in file
    data.originalContent = fs.readFileSync(src, 'utf8');
  } else {
    data.originalContent = src;
  }

  // Extract YAML front matter
  if (data.originalContent.indexOf(delim) !== 0) {
    data.content = data.originalContent;
    return data;
  }

  // Identify end of YAML front matter
  var eoy = data.originalContent.indexOf(delim, delim.length);

  var yamlText = '';
  if (eoy === -1) {
    yamlText = data.originalContent;
  } else {
    yamlText = data.originalContent.substring(0, eoy);
  }

  try {
    data.context = _.extend(data.context, yaml.load(yamlText, _.pick(options, yamlOptions)));
  } catch (e) {
    console.log(e);
    return false;
  }

  data.content = data.originalContent.substring(eoy + delim.length);
  return data;
};




/**
 * Add and/or extend YFM with given properties or patterns.
 * @param  {[type]} dest    [description]
 * @param  {[type]} src     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.extend = function(dest, src, options) {
  options = options || {};

  return glob.find(src, options).map(function (path) {

    var context = exports.extract(path, options).context;
    context = _.extend({}, options.props, context);

    context = YAML.stringify(context);

    var content = exports.extract(path, options).content;
    return {
      path: path,
      context: context,
      content: content
    };
  }).map(function (obj) {

    function fencedYAML(metadata, content) {
      return  '---\n' + metadata + '\n---\n' + content;
    }

    var name = path.basename(obj.path);
    var page = fencedYAML(obj.context, obj.content);

    file.write(path.join(dest, name), page, function (err) {
      if (err) {throw err;}
      console.log(chalk.cyan('It\'s saved!'));
    });

  }).join('\n');
};


/**
 * Convenience method for extracting YAML front matter only.
 */
exports.extractJSON = function(src, opts) {
  return exports.extract(src, opts).context;
};
exports.readYFM = exports.extractJSON;


/**
 * Convenience method for returning the content of the file,
 * with YFM stipped.
 */
exports.stripYFM = function(src, opts) {
  return exports.extract(src, opts).content;
};
