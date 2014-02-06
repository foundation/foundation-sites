"use strict";
var log4js = require('../log4js')
, layouts = require('../layouts')
, Hook = require('hook.io').Hook
, util = require('util');

var Logger = function createLogger(options) {
  var self = this;
  var actualAppender = options.actualAppender;
  Hook.call(self, options);
  self.on('hook::ready', function hookReady() {
    self.on('*::' + options.name + '::log', function log(loggingEvent) {
      deserializeLoggingEvent(loggingEvent);
      actualAppender(loggingEvent);
    });
  });
};
util.inherits(Logger, Hook);

function deserializeLoggingEvent(loggingEvent) {
  loggingEvent.startTime = new Date(loggingEvent.startTime);
  loggingEvent.level.toString = function levelToString() {
    return loggingEvent.level.levelStr;
  };
}

function initHook(hookioOptions) {
  var loggerHook;
  if (hookioOptions.mode === 'master') {
    // Start the master hook, handling the actual logging
    loggerHook = new Logger(hookioOptions);
  } else {
    // Start a worker, just emitting events for a master
    loggerHook = new Hook(hookioOptions);
  }
  loggerHook.start();
  return loggerHook;
}

function getBufferedHook(hook, eventName) {
  var hookBuffer = [];
  var hookReady = false;
  hook.on('hook::ready', function emptyBuffer() {
    hookBuffer.forEach(function logBufferItem(loggingEvent) {
      hook.emit(eventName, loggingEvent);
    });
    hookReady = true;
  });

  return function log(loggingEvent) {
    if (hookReady) {
      hook.emit(eventName, loggingEvent);
    } else {
      hookBuffer.push(loggingEvent);
    }
  };
}

function createAppender(hookioOptions) {
  var loggerHook = initHook(hookioOptions);
  var loggerEvent = hookioOptions.name + '::log';
  return getBufferedHook(loggerHook, loggerEvent);
}

function configure(config) {
  var actualAppender;
  if (config.appender && config.mode === 'master') {
    log4js.loadAppender(config.appender.type);
    actualAppender = log4js.appenderMakers[config.appender.type](config.appender);
    config.actualAppender = actualAppender;
  }
  return createAppender(config);
}

exports.appender = createAppender;
exports.configure = configure;
