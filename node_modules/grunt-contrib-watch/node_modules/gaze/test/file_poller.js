'use strict';

var path = require('path');
var fs = require('fs');

var timeout = +process.argv[2];
if (!timeout || isNaN(timeout)) {
  throw 'No specified timeout';
}
setTimeout(function () {
  process.exit();
}, timeout);

var pathArg = process.argv.slice(3);
if (!pathArg.length) {
  throw 'No path arguments';
}
var filepath = path.resolve.apply(path, [ __dirname ].concat(pathArg));

function writeToFile() {
  setTimeout(function () {
    fs.writeFile(filepath, '');
    return writeToFile();
  }, 0);
}

writeToFile();