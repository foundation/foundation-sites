/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var sort = require('../sort-object');
var assert = require('assert');

describe('Sort Object', function () {

  it('should sort the keys on an object', function () {

    var outOfOrder = {
      'foo': 1,
      'baz': 2,
      'bar': 3
    };

    var expected = {
      'bar': 3,
      'baz': 2,
      'foo': 1
    };

    var actual = sort(outOfOrder);

    assert.deepEqual(expected, actual);

  });

  it('should sort the keys on an object in decending order', function () {

    var outOfOrder = {
      'foo': 1,
      'baz': 2,
      'bar': 3
    };

    var expected = {
      'foo': 1,
      'bar': 3,
      'baz': 2
    };

    var actual = sort(outOfOrder, { order: 'desc' });

    assert.deepEqual(expected, actual);

  });

  it('should sort the properties on an object', function () {

    var outOfOrder = {
      'bar': 3,
      'foo': 1,
      'baz': 2
    };

    var expected = {
      'foo': 1,
      'baz': 2,
      'bar': 3
    };

    var actual = sort(outOfOrder, { property: true });

    assert.deepEqual(expected, actual);

  });

  it('should sort the properties on an object in decending order', function () {

    var outOfOrder = {
      'baz': 3,
      'foo': 1,
      'bar': 2
    };

    var expected = {
      'baz': 3,
      'bar': 2,
      'foo': 1
    };

    var actual = sort(outOfOrder, { order: 'desc', property: true });

    assert.deepEqual(expected, actual);

  });

  it('should sort the objects by their properties', function () {

    var outOfOrder = {
      'baz': { 'a': 3, 'b': 2, 'c': 1 },
      'foo': { 'a': 1, 'b': 3, 'c': 2 },
      'bar': { 'a': 2, 'b': 1, 'c': 3 }
    };

    var expected = {
      'foo': { 'a': 1, 'b': 3, 'c': 2 },
      'bar': { 'a': 2, 'b': 1, 'c': 3 },
      'baz': { 'a': 3, 'b': 2, 'c': 1 }
    };

    var actual = sort(outOfOrder, { property: 'a' });

    assert.deepEqual(expected, actual);

  });

  it('should sort the objects by their properties on an object in decending order', function () {

    var outOfOrder = {
      'baz': { 'a': 3, 'b': 2, 'c': 1 },
      'foo': { 'a': 1, 'b': 3, 'c': 2 },
      'bar': { 'a': 2, 'b': 1, 'c': 3 }
    };

    var expected = {
      'baz': { 'a': 3, 'b': 2, 'c': 1 },
      'bar': { 'a': 2, 'b': 1, 'c': 3 },
      'foo': { 'a': 1, 'b': 3, 'c': 2 }
    };

    var actual = sort(outOfOrder, { order: 'desc', property: 'a' });

    assert.deepEqual(expected, actual);

  });

});