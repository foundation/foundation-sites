define(
  ["./parser","./ast","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var parser = __dependency1__["default"];
    var AST = __dependency2__["default"];

    __exports__.parser = parser;

    function parse(input) {
      // Just return if an already-compile AST was passed in.
      if(input.constructor === AST.ProgramNode) { return input; }

      parser.yy = AST;
      return parser.parse(input);
    }

    __exports__.parse = parse;
  });