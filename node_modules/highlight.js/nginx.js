module.exports = function(hljs) {
  var VARS = [
    {
      className: 'variable', begin: '\\$\\d+'
    },
    {
      className: 'variable', begin: '\\${', end: '}'
    },
    {
      className: 'variable', begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE
    }
  ];
  var DEFAULT = {
    endsWithParent: true,
    lexems: '[a-z/_]+',
    keywords: {
      built_in:
        'on off yes no true false none blocked debug info notice warn error crit ' +
        'select break last permanent redirect kqueue rtsig epoll poll /dev/poll'
    },
    relevance: 0,
    illegal: '=>',
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS),
        relevance: 0
      },
      {
        className: 'string',
        begin: "'", end: "'",
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS),
        relevance: 0
      },
      {
        className: 'url',
        begin: '([a-z]+):/', end: '\\s', endsWithParent: true, excludeEnd: true
      },
      {
        className: 'regexp',
        begin: "\\s\\^", end: "\\s|{|;", returnEnd: true,
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)
      },
      // regexp locations (~, ~*)
      {
        className: 'regexp',
        begin: "~\\*?\\s+", end: "\\s|{|;", returnEnd: true,
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)
      },
      // *.example.com
      {
        className: 'regexp',
        begin: "\\*(\\.[a-z\\-]+)+",
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)
      },
      // sub.example.*
      {
        className: 'regexp',
        begin: "([a-z\\-]+\\.)+\\*",
        contains: [hljs.BACKSLASH_ESCAPE].concat(VARS)
      },
      // IP
      {
        className: 'number',
        begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b'
      },
      // units
      {
        className: 'number',
        begin: '\\b\\d+[kKmMgGdshdwy]*\\b',
        relevance: 0
      }
    ].concat(VARS)
  };

  return {
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: hljs.UNDERSCORE_IDENT_RE + '\\s', end: ';|{', returnBegin: true,
        contains: [
          {
            className: 'title',
            begin: hljs.UNDERSCORE_IDENT_RE,
            starts: DEFAULT
          }
        ]
      }
    ],
    illegal: '[^\\s\\}]'
  };
};