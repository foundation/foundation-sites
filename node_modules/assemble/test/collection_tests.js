/*global require:true */
/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var collection = require('../lib/collection');
var expect     = require('chai').expect;
var grunt      = require('grunt');
var path       = require('path');
var _          = require('lodash');



var getCollection = function(file) {
  return grunt.file.readJSON(path.join('./test/fixtures/data/collections', file));
};

var fakeCollection = getCollection('fakeCollection.json');

describe('Collections', function() {

  describe('Sorts', function() {

    it("by item name asc", function(done) {
      var expected = getCollection('expected-sortby-item-asc.json');
      var col = _.cloneDeep(fakeCollection);
      var actual = collection.sort(col);
      grunt.verbose.writeln(require('util').inspect(actual, null, 10));
      expect(actual).to.deep.equal(expected);
      done();
    });

    it("by item name desc", function(done) {
      var expected = getCollection('expected-sortby-item-desc.json');
      var col = _.cloneDeep(fakeCollection);
      col.sortorder = 'DESC';
      var actual = collection.sort(col);
      grunt.verbose.writeln(require('util').inspect(actual, null, 10));
      expect(actual).to.deep.equal(expected);
      done();
    });

    it("by page property asc", function(done) {
      var expected = getCollection('expected-sortby-page-property-asc.json');
      var col = _.cloneDeep(fakeCollection);
      col.sortby = 'title';
      var actual = collection.sort(col);
      grunt.verbose.writeln(require('util').inspect(actual, null, 10));
      expect(actual).to.deep.equal(expected);
      done();
    });

    it("by page property desc", function(done) {
      var expected = getCollection('expected-sortby-page-property-desc.json');
      var col = _.cloneDeep(fakeCollection);
      col.sortorder = 'DESC';
      col.sortby = 'title';
      var actual = collection.sort(col);
      grunt.verbose.writeln(require('util').inspect(actual, null, 10));
      expect(actual).to.deep.equal(expected);
      done();
    });

  });

});

