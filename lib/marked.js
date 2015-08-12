var marked = require('marked');
var format = require('string-template');
var hljs   = require('highlight.js');

var mdRenderer = new marked.Renderer();

mdRenderer.heading = function(text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return format('<h{0} id="{1}" class="docs-heading"><a class="docs-heading-icon" href="#{1}"></a>{2}</h{0}>', [level, escapedText, text]);
}

mdRenderer.code = function(code, language) {
  var extraOutput = '';

  if (typeof language === 'undefined') language = 'html';

  // If the language is *_example, live code will print out along with the sample
  if (language.match(/_example$/)) {
    extraOutput = '\n\n' + code;
    language = language.replace(/_example$/, '');
  }

  var renderedCode = hljs.highlight(language, code).value;
  var output = format('<div class="docs-code" data-docs-code><pre><code class="{0}">{1}</code></pre></div>', [language, renderedCode]);

  return output + extraOutput;
}

module.exports = mdRenderer;
