/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var Benchmark = require('benchmark');
var sort = require('./sort-object');
var _ = require('lodash');

var suite = new Benchmark.Suite;

function withoutLodash(obj) {
  var keys = [];
  for (var k in obj) {
    if(obj.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  return keys;
};

suite.add('With Lodash', function() {
  var outOfOrder = {
    'foo': 1,
    'baz': 2,
    'bar': 3
  };
  var actual = sort(outOfOrder);
})
.add('Without Lodash', function() {
  var outOfOrder = {
    'foo': 1,
    'baz': 2,
    'bar': 3
  };
  var actual = sort(outOfOrder, { keys: withoutLodash });
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({'async': true});