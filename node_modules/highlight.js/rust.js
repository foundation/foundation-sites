module.exports = function(hljs) {
  var TITLE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE
  };
  var NUMBER = {
    className: 'number',
    begin: '\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)',
    relevance: 0
  };
  var KEYWORDS =
    'alt any as assert be bind block bool break char check claim const cont dir do else enum ' +
    'export f32 f64 fail false float fn for i16 i32 i64 i8 if iface impl import in int let ' +
    'log mod mutable native note of prove pure resource ret self str syntax true type u16 u32 ' +
    'u64 u8 uint unchecked unsafe use vec while';
  return {
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      hljs.APOS_STRING_MODE,
      NUMBER,
      {
        className: 'function',
        beginWithKeyword: true, end: '(\\(|<)',
        keywords: 'fn',
        contains: [TITLE]
      },
      {
        className: 'preprocessor',
        begin: '#\\[', end: '\\]'
      },
      {
        beginWithKeyword: true, end: '(=|<)',
        keywords: 'type',
        contains: [TITLE],
        illegal: '\\S'
      },
      {
        beginWithKeyword: true, end: '({|<)',
        keywords: 'iface enum',
        contains: [TITLE],
        illegal: '\\S'
      }
    ]
  };
};