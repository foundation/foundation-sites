var marked     = require('marked');
var handlebars = require('handlebars');
var hljs       = require('highlight.js');
var format     = require('string-template');

// Capitalizes the first letter of a string
handlebars.registerHelper('toUpper', function(str) {
  return str[0].toUpperCase() + str.slice(1);
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

// Format Sass variable types to read "x or y or z"
handlebars.registerHelper('writeTypes', function(types) {
  if (typeof types === 'undefined') return '';

  var types = types.replace(' ', '').split('|');
  var output = '';

  for (var i in types) {
    output += types[i] + ' or ';
  }

  return output.slice(0, -4);
});

// Format a Sass value to pretty-print a map, or "None" if there's no value
handlebars.registerHelper('writeValue', function(value) {
  if (typeof value === 'undefined') return '<span style="color: #999;">None</span>';

  if (value[0] === '(' && value[value.length - 1] === ')') {
    value = value.slice(1, -1).split(',').join('<br>');
  }

  return value;
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
  // var types = variable['type'].replace(' ', '').split('|');
  var str = '$' + name + ': ' + value + ';';
  str = hljs.highlight('scss', str).value;

  return str;
});

// Converts a Markdown string to HTML
handlebars.registerHelper('md', function(text) {
  return marked(text);
});

handlebars.registerHelper('heading', function(level, anchor, options) {
  if (typeof anchor === 'object') {
    options = anchor;
    anchor = options.fn(this);
  }
  var escapedText = anchor.toLowerCase().replace(/[^\w]+/g, '-');

  return format('<h{0} class="docs-heading"><a name="{1}" class="docs-heading-icon" href="#{1}"></a>{2}</h{0}>', [level, escapedText, options.fn(this)]);
});

// Escape a string for use as a URL hash
handlebars.registerHelper('escape', function(text) {
  if (typeof text === 'undefined') return '';

  return text.toLowerCase().replace(/[^\w]+/g, '-');
});

module.exports = handlebars;
