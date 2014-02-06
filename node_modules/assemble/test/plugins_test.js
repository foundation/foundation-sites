/*global require:true */
/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var grunt = require('grunt');
var assemble = require('../lib/assemble');
var expect   = require('chai').expect;

describe("plugins", function() {

  describe("core", function () {

    it('should load plugins from node modules', function() {
      // pretend some node modules are plugins
      var plugins = assemble.plugins.resolve(['lodash', 'inflection']);

      expect(plugins.length).to.equal(2);
      expect(plugins[0].VERSION).to.be.a('string');
      expect(plugins[1].version).to.be.a('string');
    });

    it('should load plugins from glob', function() {
      var plugins = assemble.plugins.resolve(['./test/plugins/*one.js', ]);

      expect(plugins.length).to.equal(1);
      expect(plugins[0]).to.be.a('function');
    });

    it('should load plugins as functions', function() {
      var plugin = function () {};
      var plugins = assemble.plugins.resolve([plugin]);

      expect(plugins.length).to.equal(1);
      expect(plugins[0]).to.be.a('function');
    });

  });

  describe("examples: ", function () {

    describe("before :", function () {

      it('should run once and first', function() {
        var contents = grunt.file.read('./test/actual/plugin_before.html');
        expect(contents.trim()).to.equal('BEFORE TITLE 1');
      });

    });

    describe("after :", function () {

      it('should run once and last', function() {
        var contents = grunt.file.read('./test/actual/plugin_after.html');
        expect(contents).to.equal('AFTER OVERWRITE 1');
      });

    });

  });

});

