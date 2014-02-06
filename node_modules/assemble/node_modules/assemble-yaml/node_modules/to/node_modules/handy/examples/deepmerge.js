var handy = require('..');
var x = {a:1,p:{a:5}}, y={b:2}, z={a:4,c:5,p:{a:3,b:11}};
var r = handy.deepMerge(x,y,z);
console.log(r);
