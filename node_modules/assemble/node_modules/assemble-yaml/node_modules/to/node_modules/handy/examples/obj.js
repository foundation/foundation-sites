var handy = require('..');
var x = {a:'hello', b:{scores:[1,2,3], name:'tal'}, id:123}, y={id:123,a:'hello',b:{name:'tal',scores:[1,2,3]}};
var r = handy.isObjectEqual(x,y);
console.log(r);

