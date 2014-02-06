/**
 * matchkeys
 * https://github.com/jonschlinkert/matchkeys
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var _ = require('lodash');

// This module.
var keys = require('../');



// TODO: assert


function readJSON(src) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), src)), 'utf8');
}

// Create our test objects and keywords arrays.
var pkgs = readJSON('./test/fixtures/multi.json');
var pkg = readJSON('./test/fixtures/package.json');


var multiArr = [
  {
    keywords: ['A', 'B', 'C', 'D', 'E', 'F']
  },
  {
    keywords: ['A', 'B', 'C', 'D', 'I', 'F']
  }
];

var first = {
  keywords: ['A', 'B', 'C', 'D', 'E', 'F']
};
var second = {
  keywords: ['C', 'E', 'G', 'I', 'J']
};


var config = {
  keywords: ['baz', 'bar', 'foo', 'node-foo']
};


console.log(chalk.cyan("keys.match"), keys.match(first, second));
console.log(chalk.cyan("keys.matchPkgs"), keys.matchPkgs(pkg, pkgs));
console.log(chalk.cyan("keys.isMatch"), keys.isMatch(first, second));
console.log(chalk.cyan("keys.filter"), keys.filter('*'));
console.log(chalk.cyan("keys.filter"), keys.filter('*', config));
console.log(chalk.cyan("keys.resolve"), keys.resolve('*'));
console.log(chalk.cyan("keys.resolve"), keys.resolve('*', config));
console.log(chalk.cyan("keys.resolveDev"), keys.resolveDev('*'));
console.log(chalk.cyan("keys.resolveDev"), keys.resolveDev('*', config));
console.log(chalk.cyan("keys.resolveAll"), keys.resolveAll('*'));
console.log(chalk.cyan("keys.resolveAll"), keys.resolveAll('*', config));
