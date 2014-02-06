/*!
 * assemble-handlebars
 * https://github.com/assemble/assemble-handlebars
 *
 * Copyright (c) 2013 Assemble
 * Licensed under the MIT license.
 */


var _ = require('lodash');
var handlebars = require('handlebars');
var helpers = null;

try {
  helpers = require('handlebars-helpers');
} catch (ex) {
  console.log('WARNING: ', ex);
  console.log('To use handlebars-helpers run `npm install handlebars-helpers`');
}

var plugin = function() {
  'use strict';

  var init = function(options, params) {
    // register built-in helpers
    if(helpers && helpers.register) {
      helpers.register(handlebars, options, params);
    }
  };

  var compile = function(src, options, callback) {
    var tmpl;
    try {
      tmpl = handlebars.compile(src, options);
    } catch(ex) {
      callback(ex, null);
    }
    callback(null, tmpl);
  };

  var render = function(tmpl, options, callback) {
    var content;
    try {
      if(typeof tmpl === 'string') {
        tmpl = handlebars.compile(tmpl, options);
      }
      content = tmpl(options);
    } catch (ex) {
      callback(ex, null);
    }
    callback(null, content);
  };

  var registerFunctions = function(helperFunctions) {
    if(helperFunctions) {
      _.forOwn(helperFunctions, function(fn, key) {
        handlebars.registerHelper(key, fn);
      });
    }
  };

  var registerPartial = function(filename, content) {
    try {
      handlebars.registerPartial(filename, content);
    } catch (ex) {}
  };


  return {
    init: init,
    compile: compile,
    render: render,
    registerFunctions: registerFunctions,
    registerPartial: registerPartial,
    handlebars: handlebars
  };

};

module.exports = exports = plugin();
