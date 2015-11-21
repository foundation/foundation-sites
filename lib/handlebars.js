var marked      = require('marked');
var multiline   = require('multiline');
var handlebars  = require('handlebars');
var hljs        = require('highlight.js');
var format      = require('string-template');
var querystring = require('querystring');
var escape      = require('./escape');

var ISSUE_TEXT = multiline(function() {/*
**How can we reproduce this bug?**

1. Step one
2. Step two
3. Step three

**What did you expect to happen?**

**What happened instead?**

**Test case**

Give us a link to a [CodePen](http://codepen.io) or [JSFiddle](http://jsfiddle.net) that recreates the issue.
*/});

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

  var escapedText = escape(anchor);
  var magellan = (level === 2) ? format(' data-magellan-target="{0}"', [escapedText]) : '';

  return format('<h{0} id="{1}" class="docs-heading"{3}><a class="docs-heading-icon" href="#{1}"></a>{2}</h{0}>', [level, escapedText, options.fn(this), magellan]);
});

// Escapes a string for use as a URL hash
handlebars.registerHelper('escape', function(text) {
  return escape(text || '');
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

handlebars.registerHelper('jsModuleName', function(value) {
  return value.replace('module:', '') + '.js';
});

handlebars.registerHelper('editLink', function(value) {
  return format('https://github.com/zurb/foundation-sites/edit/develop/{0}', [value.replace('.html', '.md')]);
});

handlebars.registerHelper('issueLink', function(name) {
  return 'https://github.com/zurb/foundation-sites/issues/new?' + querystring.stringify({
    title: format('[{0}] ISSUE NAME HERE', [name]),
    body: ISSUE_TEXT
  });
});

handlebars.registerHelper('sourceLink', function(files) {
  var output = '';
  var text = {
    'sass': 'Sass',
    'js': 'JavaScript'
  }
  var both = files.sass && files.js;

  for (var i in files) {
    var module = files[i];
    if (typeof module === 'string') module = [module];
    module = module.filter(function(val) {
      return val[0] !== '!';
    }).map(function(val) {
      if (val.indexOf('*') > -1) {
        val = val.split('*')[0];
      }
      return val;
    })[0];
    output += format('<li><a href="{0}">{1}</a></li>', [
      'https://github.com/zurb/foundation-sites/tree/master/' + module,
      (both ? 'View ' + text[i] + ' Source' : 'View Source')
    ]);
  }

  return output;
});

handlebars.registerHelper('filter', function(item, options) {
  if (item.access === 'private' || item.alias) return '';
  return options.fn(this);
});

handlebars.registerHelper('raw', function(content) {
  return content.fn(this);
});

module.exports = handlebars;
