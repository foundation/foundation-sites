module.exports = function(hljs) {
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  var CHAR = {
    className: 'char',
    begin: '\\$.{1}'
  };
  var SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    keywords: 'self super nil true false thisContext', // only 6
    contains: [
      {
        className: 'comment',
        begin: '"', end: '"',
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      {
        className: 'class',
        begin: '\\b[A-Z][A-Za-z0-9_]*',
        relevance: 0
      },
      {
        className: 'method',
        begin: VAR_IDENT_RE + ':'
      },
      hljs.C_NUMBER_MODE,
      SYMBOL,
      CHAR,
      {
        className: 'localvars',
        begin: '\\|\\s*((' + VAR_IDENT_RE + ')\\s*)+\\|'
      },
      {
        className: 'array',
        begin: '\\#\\(', end: '\\)',
        contains: [
          hljs.APOS_STRING_MODE,
          CHAR,
          hljs.C_NUMBER_MODE,
          SYMBOL
        ]
      }
    ]
  };
};