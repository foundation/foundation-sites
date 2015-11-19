var escape = require('./escape')
var marked = require('marked');
var format = require('string-template');
var hljs   = require('highlight.js');

var mdRenderer = new marked.Renderer();

// Adds an anchor link to each heading created
mdRenderer.heading = function(text, level) {
  var escapedText = escape(text);
  var magellan = (level === 2) ? format(' data-magellan-target="{0}"', [escapedText]) : '';

  return format('<h{0} id="{1}" class="docs-heading"{3}><a class="docs-heading-icon" href="#{1}"></a>{2}</h{0}>', [level, escapedText, text, magellan]);
}

// Adds special formatting to each code block created
// If the language is suffixed with "_example", the raw HTML is printed after the code sample, creating a live example.
mdRenderer.code = function(code, language) {
  var extraOutput = '';

  if (typeof language === 'undefined') language = 'html';

  // If the language is *_example, live code will print out along with the sample
  if (language.match(/_example$/)) {
    extraOutput = format('\n\n<div class="docs-code-live">{0}</div>', [code]);
    language = language.replace(/_example$/, '');
  }

  var renderedCode = hljs.highlight(language, code).value;
  var output = format('<div class="docs-code" data-docs-code><pre><code class="{0}">{1}</code></pre></div>', [language, renderedCode]);

  return output + extraOutput;
}

module.exports = mdRenderer;
