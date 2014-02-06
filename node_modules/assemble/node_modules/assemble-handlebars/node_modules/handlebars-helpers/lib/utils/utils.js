/**
 * Handlebars Helpers: Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var path = require('path');
var fs   = require('path');


// node_modules
var minimatch = require('minimatch');
var iconv     = require('iconv-lite');
var grunt     = require('grunt');
var _         = require('lodash');


// YAML lib.
var to   = require('to');
var YAML = to.format.yaml;


// Internal libs.
var Handlebars = require('../helpers/helpers').Handlebars;


// Config object.
var config = grunt.file.readJSON('./package.json');


// The module to be exported.
var Utils = module.exports = exports = {};


/**
 * String byte order marks from source string
 * @param  {String} str
 * @return {String}
 */
Utils.stripBom = function (str) {
  str = iconv.decode(str, 'utf8');
  // Strip any BOM that might exist.
  if (str.charCodeAt(0) === 0xFEFF) {
    str = str.substring(1);
  }
};


Utils.isFunction = function (obj) {
  return typeof obj === 'function';
};


Utils.isBoolean = function (obj) {
  var undef = void 0;
  var type = typeof obj;
  return obj !== undef && type === 'boolean' || type === 'Boolean';
};


Utils.isNumber = function (obj) {
  var undef = void 0;
  return obj !== undef && obj !== null && (typeof obj === 'number' || obj instanceof Number);
};


Utils.isObject = function (obj) {
  var undef = void 0;
  return obj !== null && obj !== undef && typeof obj === 'object';
};


Utils.isRegExp = function (obj) {
  var undef = void 0;
  return obj !== undef && obj !== null && (obj instanceof RegExp);
};


Utils.detectType = function (value) {
  switch (typeof value) {
  case 'string':
    return 'str';
  case 'number':
    return 'num';
  case 'object':
    return 'obj';
  default:
    return 'other';
  }
};

/**
 * String Utils
 */

Utils.safeString = function (str) {
  return new Handlebars.SafeString(str);
};

var toString = function (val) {
  if (val == null) {
    return '';
  } else {
    return val.toString();
  }
};
Utils.toString = Object.prototype.toString;

Utils.lowerCase = function (str) {
  str = toString(str);
  return str.toLowerCase();
};

Utils.isUndefined = function (value) {
  return value === 'undefined' || Utils.toString.call(value) === '[object Function]' || (value.hash != null);
};

Utils.trim = function (str) {
  var trim = /\S/.test('\xA0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g;
  return str.toString().replace(trim, '');
};

/**
 * Trim space on left and right of a string
 * @param {String} myString source string
 * @return {String} trimmed string
 */
Utils.trimWhitspace = function (str) {
  return str.replace(/^s+/g, '').replace(/\s+$/g, '');
};


Utils.escapeString = function (str, except) {
  return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+\^])/g, function (ch) {
    if (except && except.indexOf(ch) !== -1) {
      return ch;
    }
    return '\\' + ch;
  });
};


Utils.escapeExpression = function (str) {
  return Handlebars.Utils.escapeExpression(str);
};


Utils.stringifyYAML = function (src) {
  return YAML.stringify(src);
};


Utils.stringifyObj = function (src, type) {
  var output;
  switch (type) {
  case 'json':
    output = JSON.stringify(src, null, 2);
    break;
  case 'yml':
  case 'yaml':
    output = YAML.stringify(src);
  }
  return output;
};

/*
  # Object Utils
  */
Utils.eachProperty = function (context, options) {
  var ret = '';
  for (var prop in context) {
    ret = ret + options.fn({
      property: prop,
      value: context[prop]
    });
  }
  return ret;
};


Utils.prop = function (name) {
  return function (obj) {
    return obj[name];
  };
};


Utils.showProps = function (obj, objName) {
  var result = '';
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  return result;
};


Utils.listAllProperties = function (obj) {
  var objectToInspect = void 0;
  var result = [];
  objectToInspect = obj;
  while (objectToInspect !== null) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    objectToInspect = Object.getPrototypeOf(objectToInspect);
  }
  return result;
};


Utils.listProps = function (obj) {
  var value;
  var result = [];
  if (!obj) {return [];}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      result.push(value);
    }
  }
  return result;
};



/**
 * Path utils
 */

Utils.getBasename = function (filename) {
  return path.basename(filename, path.extname(filename));
};


Utils.getRelativePath = function (from, to) {
  var relativePath = path.relative(path.dirname(from), path.dirname(to));
  return Utils.urlNormalize(path.join(relativePath, path.basename(to)));
};


/**
 * Ensure that a URL path is returned, instead of a filesystem path.
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
Utils.urlNormalize = function (filepath) {
  return filepath.replace(/\\/g, '/');
};



/**
 * fs utils
 */

/**
 * Read file synchronously. Based on grunt.file.read.
 * @param  {String} filepath
 * @return {String}
 */
Utils.readFileSync = function(filepath, opts) {
  var contents;
  opts = opts || {};
  opts.defaultEncoding = 'utf8';
  try {
    contents = fs.readFileSync(String(filepath));
    // If encoding is not explicitly null, convert from encoded buffer to a
    // string. If no encoding was specified, use the default.
    if (opts.encoding !== null) {
      contents = iconv.decode(contents, opts.encoding || opts.defaultEncoding);
      // Strip any BOM that might exist.
      if (contents.charCodeAt(0) === 0xFEFF) {
        contents = contents.substring(1);
      }
    }
    grunt.verbose.ok();
    return contents;
  } catch(e) {
    grunt.verbose.error();
    throw grunt.util.error('Unable to read "' + filepath + '" file (Error code: ' + e.code + ').', e);
  }
};

// Read a file, parse its contents, return an object.
Utils.readJSON = function (filepath, indent) {
  indent = indent || 2;
  return JSON.parse(Utils.readFileSync(filepath, null, indent));
};



/**
 * Read 'Optional' JSON
 * @author: 'Cowbow' Ben Alman <http://github.com/cowboy>
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
Utils.readOptionalJSON = function (filepath) {
  var data = {};
  try {
    data = grunt.file.readJSON(filepath);
    grunt.verbose.write('Reading ' + filepath + '...').ok();
  } catch (_error) {}
  return data;
};

/**
 * Read 'Optional' YAML
 * @author: 'Cowbow' Ben Alman <http://github.com/cowboy>
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
Utils.readOptionalYAML = function (filepath) {
  var data = {};
  try {
    data = grunt.file.readYAML(filepath);
    grunt.verbose.write('Reading ' + filepath + '...').ok();
  } catch (_error) {}
  return data;
};


Utils.readPackageJSON = function (filepath) {
  var data = {};
  try {
    data = grunt.file.readJSON(filepath);
  } catch (_error) {}
  try {
    data = grunt.file.readJSON('package.json');
    grunt.verbose.write('Reading ' + filepath + '...').ok();
  } catch (_error) {}
  return data;
};


/**
 * Conditional output
 */

Utils.getExt = function (str) {
  var extname = path.extname(str);
  if (extname) {
    str = extname;
  }
  if (str[0] === '.') {
    str = str.substring(1);
  }
  return str;
};

Utils.toggleOutput = function (ext, md, html) {
  if (ext === '') {
    return md;
  } else {
    return html;
  }
};

/**
 * Generate HTML or markdown based on extension defined.
 * @param  {String} ext      The extension defined.
 * @param  {String} markdown The content to use for markdown
 * @param  {String} html     The content to use for HTML
 * @return {String}
 */
Utils.switchOutput = function (ext, markdown, html) {
  var output;
  switch (ext) {

  // return markdown
  case '.markdown':
  case '.md':
    output = markdown;
    break;

  // return HTML
  case '.html':
  case '.htm':
    output = html;
    break;

  default:
    output = html;
  }
  return output;
};

Utils.switchType = function (ext) {
  var reader = grunt.file.readJSON;
  Utils.getExt(ext);
  switch (ext) {
  case '.json':
    reader = grunt.file.readJSON;
    break;
  case '.yml':
  case '.yaml':
    reader = grunt.file.readYAML;
  }
  return reader;
};





/**
 * Conveniene Utils
 */


/**
 * Extract the homepage from package.json
 * @return {[type]} [description]
 */
Utils.homepage = function () {
  if(config.homepage) {
    return config.homepage;
  } else {
    return config.repository.url.replace(/^git@([^:]+):(.+)(?:.git)/, 'https://$1/$2');
  }
};


Utils.contributors = function (sep) {
  sep = sep || '';
  if(config.contributors) {
    return _.pluck(config.contributors, 'name').join('\n') + sep;
  } else {return; }
};


/**
 * _.safename("helper-foo")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 */
Utils.safename = function (name, patterns) {
  var prefixes = ['grunt', 'helper', 'mixin'];
  prefixes = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + prefixes.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};
Utils.shortname = function (name, patterns) {
  return _.safename(name, patterns);
};


/**
 * Detect and return the indentation of a string.
 * @param   {String} str [description]
 * @returns {[type]}     Actual indentation, or undefined.
 */
Utils.detectIndentation = function (str) {
  var tabs        = str.match(/^[\t]+/g) || [];
  var spaces      = str.match(/^[ ]+/g)  || [];
  var prevalent   = (tabs.length >= spaces.length ? tabs : spaces);
  var indentation = void 0;

  var i = 0;
  var il = prevalent.length;

  while (i < il) {
    if (!indentation || prevalent[i].length < indentation.length) {
      indentation = prevalent[i];
    }
    i++;
  }
  return indentation;
};


/**
 * Grunt convenience utils.
 */


Utils.detectDestType = function (dest) {
  if (grunt.util._.endsWith(dest, '/')) {
    return 'directory';
  } else {
    return 'file';
  }
};

Utils.endsWith = function(str, search) {
  var result = str.indexOf(search, str.length - search.length);
  return result !== -1;
};

// Grunt.file.exists True if the file path exists.
Utils.exists = function (file) {
  return grunt.file.exists(file);
};

// Read a file, return its contents.
Utils.read = function (filepath, options) {
  return grunt.file.read(filepath, options);
};

// Read a YAML file, parse its contents, return an object.
Utils.readYAML = function (filepath, options) {
  return grunt.file.readYAML(filepath, options);
};

// Write a file.
Utils.write = function (filepath, contents, options) {
  return grunt.file.write(filepath, contents, options);
};

// Copy file from A to B
Utils.copyFile = function (filepath, options) {
  return grunt.file.copy(filepath, options);
};

// Create a directory along with any intermediate directories.
Utils.mkDir = function (dirpath, mode) {
  return grunt.file.mdDir(dirpath, mode);
};

// Normalize linefeeds in a string.
Utils.normalizelf = function (str) {
  return grunt.util.normalizelf(str);
};

/**
 * Return all matches in the given string.
 * @param  {String} string [the input string]
 * @param  {RegEx}  regex  [regular expression pattern]
 * @param  {[type]} index  [description]
 * @return {[type]}        [description]
 */
Utils.getMatches = function (string, regex, index) {
  // default to the first capturing group
  index = index || (index = 1);
  var matches = [];
  var match = void 0;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
};

