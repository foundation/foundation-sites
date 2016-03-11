var format = require('util').format;
var multiline = require('multiline');

var SASS_TEMPLATE = multiline(function() {/*
  @charset 'utf-8';

  // Variables go here
  %s

  // Core imports go here
  @import 'foundation';
  @import 'motion-ui';

  // Modules go here
  %s

  // Motion UI goes here
  @include motion-ui-transitions;
  @include motion-ui-animations;
*/});

module.exports = function(config, modules, variables) {
  var CONFIG = config;
  var variableList = [];
  var exportList = ['@include foundation-global-styles;'];

  // Create variable overrides code
  for (var i in variables) {
    var name = i.replace('_', '-');
    variableList.push(`$${name}: ${variables[i]};`);
  }

  // Create module exports with @include
  for (var i in modules) {
    var name = modules[i];

    if (CONFIG[name] && CONFIG[name].sass) {
      exportList.push(`@include foundation-${CONFIG[name].sass};`);
    }
  }

  return format(SASS_TEMPLATE, variableList.join('\n'), exportList.join('\n  '))
}
