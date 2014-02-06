// print the package version

var handy = require('..');
var path = require('path');

console.log(handy.getVersion(path.join(__dirname,"..")));