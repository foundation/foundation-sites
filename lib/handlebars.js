var marked     = require('marked');
var handlebars = require('handlebars');
var hljs       = require('highlight.js');
var format     = require('string-template');

// Converts Markdown to HTML
handlebars.registerHelper('md', function(text) {
  return marked(text);
});

// Creates a heading with an anchor link
handlebars.registerHelper('heading', function(level, anchor, options) {
  // Allow for optional second parameter
  if (typeof anchor === 'object') {
    options = anchor;
    anchor = options.fn(this);
  }

  var escapedText = anchor.toLowerCase().replace(/[^\w]+/g, '-');

  return format('<h{0} id="{1}" class="docs-heading"><a class="docs-heading-icon" href="#{1}"></a>{2}</h{0}>', [level, escapedText, options.fn(this)]);
});

// Escapes a string for use as a URL hash
handlebars.registerHelper('escape', function(text) {
  if (typeof text === 'undefined') return '';

  return text.toLowerCase().replace(/[^\w]+/g, '-');
});

// Capitalizes the first letter of a string
handlebars.registerHelper('toUpper', function(str) {
  return str[0].toUpperCase() + str.slice(1);
});

// Makes an entire string lowercase
handlebars.registerHelper('toLower', function(str) {
  if (typeof str === 'undefined') str = '';
  return str.toLowerCase();
});

// Formats a mixin using a SassDoc mixin object to look like this:
// @include mixinName($param, $param) { }
handlebars.registerHelper('writeMixin', function(mixin) {
  var name = mixin['context']['name'];
  var params = mixin['parameter'];

  var str = '@include ';
  str += name;

  if (params) str += '(';

  for (var i in params) {
    str += '$' + params[i]['name'] + ', ';
  }

  if (params) str = str.slice(0, -2) + ')';
  
  if (typeof mixin.content === 'string') {
    str += ' { }';
  }
  else {
    str += ';'
  }

  str = hljs.highlight('scss', str).value;

  return str;
});

// Formats a function using a SassDoc function object to look like this:
// function($param, $param)
handlebars.registerHelper('writeFunction', function(func) {
  var name = func['context']['name'];
  var params = func['parameter'];

  var str = '';
  str += name + '(';

  for (var i in params) {
    str += '$' + params[i]['name'] + ', ';
  }
  if (params) str = str.slice(0, -2);
  str += ')';

  str = hljs.highlight('scss', str).value;

  return str;
});

// Formats a variable declaration using a SassDoc variable object to look like this:
// $name: $value;
handlebars.registerHelper('writeVariable', function(variable) {
  var name = variable['context']['name'];
  var value = variable['context']['value'];
  var str = '$' + name + ': ' + value + ';';
  str = hljs.highlight('scss', str).value;

  return str;
});

// Adds an external link, pulled from a SassDock @link annotation.
handlebars.registerHelper('externalLink', function(link) {
  if (!link) return '';

  return format('<p><strong>Learn more:</strong> <a href="{0}">{1}</a></p>', [link[0].url, link[0].caption]);
});

// Format Sass variable types to read "x or y or z"
handlebars.registerHelper('sassTypes', function(types) {
  if (typeof types === 'undefined') return '';

  var types = types.replace(' ', '').split('|');
  var output = '';

  for (var i in types) {
    output += types[i] + ' or ';
  }

  return output.slice(0, -4);
});

// Format a Sass value to pretty-print a map, or "None" if there's no value
handlebars.registerHelper('sassValue', function(value) {
  if (typeof value === 'undefined') return '<span style="color: #999;">None</span>';

  if (value[0] === '(' && value[value.length - 1] === ')') {
    value = value.slice(1, -1).split(',').join('<br>');
  }

  return value;
});

module.exports = handlebars;
