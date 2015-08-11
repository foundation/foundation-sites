var marked     = require('marked');
var handlebars = require('handlebars');
var hljs       = require('highlight.js');

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

handlebars.registerHelper('writeTypes', function(types) {
  if (typeof types === 'undefined') return '';

  var types = types.replace(' ', '').split('|');
  var output = '';

  for (var i in types) {
    output += types[i] + ' or ';
  }

  return output.slice(0, -4);
});

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

// Create an anchor point using the given text as the name
handlebars.registerHelper('anchor', function(text) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return '<a name="'+escapedText+'" href="#'+escapedText+'" class="docs-header-icon"></a>'
});

handlebars.registerHelper('escape', function(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
});

module.exports = handlebars;
