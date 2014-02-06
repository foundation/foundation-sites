module.exports = function(hljs) {

  function copy(mode, parent) {
    var result = {};
    for (var key in mode) {
      if (key != 'contains') {
        result[key] = mode[key];
      }
      var contains = [];
      for (var i = 0; mode.contains && i < mode.contains.length; i++) {
        contains.push(copy(mode.contains[i], mode));
      }
      contains = HANDLEBARS_CONTAINS.concat(contains);
      if (contains.length) {
        result.contains = contains;
      }
    }
    return result;
  }

  var EXPRESSION_KEYWORDS = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";

  var VARIABLE_CONTAINS = 
  {
    className: 'variable', begin: '[a-zA-Z\.]+',
    keywords: EXPRESSION_KEYWORDS
  };

  var HANDLEBARS_CONTAINS = [
    {
      className: 'expression',
      begin: '{{', end: '}}',
      contains: [
        {
          className: 'begin-block', begin: '\#[a-zA-Z\ \.]+',
          keywords: EXPRESSION_KEYWORDS
        },
        {
          className: 'string',
          begin: '"', end: '"'
        },        
        {
          className: 'end-block', begin: '\\\/[a-zA-Z\ \.]+',
          keywords: EXPRESSION_KEYWORDS
        },        
        {
          className: 'variable', begin: '[a-zA-Z\.]+',
          keywords: EXPRESSION_KEYWORDS
        }               
      ]
    }
  ];

  var result = copy(hljs.LANGUAGES.xml);
  result.case_insensitive = true;
  return result;
};