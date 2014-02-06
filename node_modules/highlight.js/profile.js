module.exports = function(hljs) {
  return {
    contains: [
      hljs.C_NUMBER_MODE,
      {
        className: 'builtin',
        begin: '{', end: '}$',
        excludeBegin: true, excludeEnd: true,
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE],
        relevance: 0
      },
      {
        className: 'filename',
        begin: '[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}', end: ':',
        excludeEnd: true
      },
      {
        className: 'header',
        begin: '(ncalls|tottime|cumtime)', end: '$',
        keywords: 'ncalls tottime|10 cumtime|10 filename',
        relevance: 10
      },
      {
        className: 'summary',
        begin: 'function calls', end: '$',
        contains: [hljs.C_NUMBER_MODE],
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'function',
        begin: '\\(', end: '\\)$',
        contains: [{
          className: 'title',
          begin: hljs.UNDERSCORE_IDENT_RE,
          relevance: 0
        }],
        relevance: 0
      }
    ]
  };
};