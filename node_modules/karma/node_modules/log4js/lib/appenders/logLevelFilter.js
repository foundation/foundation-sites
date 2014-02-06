"use strict";
var levels = require('../levels')
, log4js = require('../log4js');

function logLevelFilter (levelString, appender) {
  var level = levels.toLevel(levelString);
  return function(logEvent) {
    if (logEvent.level.isGreaterThanOrEqualTo(level)) {
      appender(logEvent);
    }
  };
}

function configure(config) {
  log4js.loadAppender(config.appender.type);
  var appender = log4js.appenderMakers[config.appender.type](config.appender);
  return logLevelFilter(config.level, appender);
}

exports.appender = logLevelFilter;
exports.configure = configure;
