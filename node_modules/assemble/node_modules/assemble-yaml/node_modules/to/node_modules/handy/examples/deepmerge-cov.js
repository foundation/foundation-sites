  // instrument by jscoverage, do not modifly this file
  if (typeof _$jscoverage === 'undefined') {
    _$jscoverage = {};
    _$jscoverage_done = function (file, line) {
      _$jscoverage[file][line] ++;
    };
    _$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
  if (typeof _$jscoverage_cond === 'undefined') {
    _$jscoverage_cond = {};
    _$jscoverage_cond_done = function (file, line, express) {
      _$jscoverage_cond[file][line] ++;
      return express;
    };
  }
  if (typeof window === 'object') {
    window._$jscoverage = _$jscoverage;
    window._$jscoverage_cond = _$jscoverage_cond;
  } else if (typeof global === 'object') {
    global._$jscoverage = _$jscoverage;
    global._$jscoverage_cond = _$jscoverage_cond;
  }
_$jscoverage_init(_$jscoverage, "examples/deepmerge.js",["0","1","2","3"]);
_$jscoverage_init(_$jscoverage_cond, "examples/deepmerge.js",[]);
_$jscoverage["examples/deepmerge.js"].source = ["var handy = require('..');","var x = {a:1,p:{a:5}}, y={b:2}, z={a:4,c:5,p:{a:3,b:11}};","var r = handy.deepMerge(x,y,z);","console.log(r);",""];
_$jscoverage_done("examples/deepmerge.js", "0");
var handy = require("..");

_$jscoverage_done("examples/deepmerge.js", "1");
var x = {
    a: 1,
    p: {
        a: 5
    }
}, y = {
    b: 2
}, z = {
    a: 4,
    c: 5,
    p: {
        a: 3,
        b: 11
    }
};

_$jscoverage_done("examples/deepmerge.js", "2");
var r = handy.deepMerge(x, y, z);

_$jscoverage_done("examples/deepmerge.js", "3");
console.log(r);