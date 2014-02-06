/**
 * Assemble Engine Factory
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

// node_modules
var grunt   = require('grunt');

// Internal libs.
var helpers = require('./helpers');


var EngineFactory = function() {
  'use strict';

  var engineName = '';

  var functionExists = function(fn) {
    var getType = {};
    return fn && getType.toString.call(fn) === '[object Function]';
  };

  var tryRequireEngine = function(eng, obj) {
    try {
      obj.engine = require('assemble-' + eng);
    } catch(ex1) {
      try {
        obj.engine = require(eng);
      } catch(ex2) {
        grunt.log.writeln('Error loading engine: ' + eng);
        grunt.log.writeln(ex2);
        grunt.log.writeln('Run `npm install assemble-' + eng + '` to use ' + eng);
      }
    }
  };

  var load = function(eng) {
    engineName = eng;
    tryRequireEngine(eng, this);
    if(!this.engine) {
      return false;
    }

    // set some defaults
    this.startDelimiter = this.engine.startDelimiter || '{{';
    this.endDelimiter = this.engine.endDelimiter || '}}';

    var search = this.startDelimiter + "\\s*body\\s*" + this.endDelimiter;
    this.bodyRegex = new RegExp(search, 'i');

    return this;
  };

  var init = function(options, params) {
    if(functionExists(this.engine.init)) {
      this.engine.init(options, params);
    }
    if(options && typeof options.helpers !== 'undefined') {
      if(this.toString.call(options.helpers) !== '[object Array]'){
        options.helpers = [options.helpers];
      }
      var engineEngine = this.engine[engineName] || this.engine;
      options.helpers.forEach(function(file) {
        helpers.register(file, this.engine, engineEngine, options, params);
      }, this);
    }
  };

  var compile = function(src, options, callback) {
    if(!functionExists(this.engine.compile)) {
      grunt.log.writeln(engineName + ' does not support compile.');
      callback(engineName + ' does not support compile.', null);
    }
    this.engine.compile(src, options, callback);
  };

  var render = function(tmpl, options, callback) {
    if(!functionExists(this.engine.render)) {
      grunt.log.writeln(engineName + ' does not support render.');
      callback(engineName + ' does not support render.', null);
    }
    this.engine.render(tmpl, options, callback);
  };
  // Helpers, filters etc. depending on template engine
  var registerFunctions = function(helperFunctions) {
    if(functionExists(this.engine.registerFunctions)) {
      this.engine.registerFunctions(helperFunctions);
    }
  };

  var registerPartial = function(filename, content) {
    if(functionExists(this.engine.registerPartial)) {
      this.engine.registerPartial(filename, content);
    }
  };

  return {
    load: load,
    init: init,
    compile: compile,
    render: render,
    registerFunctions: registerFunctions,
    registerPartial: registerPartial
  };

};

module.exports = exports = new EngineFactory();
