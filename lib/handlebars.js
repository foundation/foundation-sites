var marked     = require('marked');
var handlebars = require('handlebars');

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
  str += name + '(';
  for (var i in params) {
    str += '$' + params[i]['name'] + ', ';
  }
  if (params) str = str.slice(0, -2);
  str += ') { }';

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
