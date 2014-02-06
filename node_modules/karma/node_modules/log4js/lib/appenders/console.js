"use strict";
var layouts = require('../layouts')
, consoleLog = console.log.bind(console);

function consoleAppender (layout) {
  layout = layout || layouts.colouredLayout;
  return function(loggingEvent) {
    consoleLog(layout(loggingEvent));
  };
}

function configure(config) {
  var layout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return consoleAppender(layout);
}

exports.appender = consoleAppender;
exports.configure = configure;
