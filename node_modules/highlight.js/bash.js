module.exports = function(hljs) {
  var BASH_LITERAL = 'true false';
  var BASH_KEYWORD = 'if then else elif fi for break continue while in do done echo exit return set declare';
  var VAR1 = {
    className: 'variable', begin: '\\$[a-zA-Z0-9_#]+'
  };
  var VAR2 = {
    className: 'variable', begin: '\\${([^}]|\\\\})+}'
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2],
    relevance: 0
  };
  var APOS_STRING = {
    className: 'string',
    begin: '\'', end: '\'',
    contains: [{begin: '\'\''}],
    relevance: 0
  };
  var TEST_CONDITION = {
    className: 'test_condition',
    begin: '', end: '',
    contains: [QUOTE_STRING, APOS_STRING, VAR1, VAR2],
    keywords: {
      literal: BASH_LITERAL
    },
    relevance: 0
  };

  return {
    keywords: {
      keyword: BASH_KEYWORD,
      literal: BASH_LITERAL
    },
    contains: [
      {
        className: 'shebang',
        begin: '(#!\\/bin\\/bash)|(#!\\/bin\\/sh)',
        relevance: 10
      },
      VAR1,
      VAR2,
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      hljs.inherit(TEST_CONDITION, {begin: '\\[ ', end: ' \\]', relevance: 0}),
      hljs.inherit(TEST_CONDITION, {begin: '\\[\\[ ', end: ' \\]\\]'})
    ]
  };
};