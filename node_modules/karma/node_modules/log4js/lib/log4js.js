"use strict";
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview log4js is a library to log in JavaScript in similar manner
 * than in log4j for Java. The API should be nearly the same.
 *
 * <h3>Example:</h3>
 * <pre>
 *  var logging = require('log4js');
 *  //add an appender that logs all messages to stdout.
 *  logging.addAppender(logging.consoleAppender());
 *  //add an appender that logs "some-category" to a file
 *  logging.addAppender(logging.fileAppender("file.log"), "some-category");
 *  //get a logger
 *  var log = logging.getLogger("some-category");
 *  log.setLevel(logging.levels.TRACE); //set the Level
 *
 *  ...
 *
 *  //call the log
 *  log.trace("trace me" );
 * </pre>
 *
 * NOTE: the authors below are the original browser-based log4js authors
 * don't try to contact them about bugs in this version :)
 * @version 1.0
 * @author Stephan Strittmatter - http://jroller.com/page/stritti
 * @author Seth Chisamore - http://www.chisamore.com
 * @since 2005-05-20
 * @static
 * Website: http://log4js.berlios.de
 */
var events = require('events')
, fs = require('fs')
, path = require('path')
, util = require('util')
, layouts = require('./layouts')
, levels = require('./levels')
, LoggingEvent = require('./logger').LoggingEvent
, Logger = require('./logger').Logger
, ALL_CATEGORIES = '[all]'
, appenders = {}
, loggers = {}
, appenderMakers = {}
, defaultConfig =   {
  appenders: [
    { type: "console" }
  ],
  replaceConsole: false
};

/**
 * Get a logger instance. Instance is cached on categoryName level.
 * @param  {String} categoryName name of category to log to.
 * @return {Logger} instance of logger for the category
 * @static
 */
function getLogger (categoryName) {

  // Use default logger if categoryName is not specified or invalid
  if (typeof categoryName !== "string") {
    categoryName = Logger.DEFAULT_CATEGORY;
  }

  var appenderList;
  if (!loggers[categoryName]) {
    // Create the logger for this name if it doesn't already exist
    loggers[categoryName] = new Logger(categoryName);
    if (appenders[categoryName]) {
      appenderList = appenders[categoryName];
      appenderList.forEach(function(appender) {
        loggers[categoryName].addListener("log", appender);
      });
    }
    if (appenders[ALL_CATEGORIES]) {
      appenderList = appenders[ALL_CATEGORIES];
      appenderList.forEach(function(appender) {
        loggers[categoryName].addListener("log", appender);
      });
    }
  }
  
  return loggers[categoryName];
}

/**
 * args are appender, then zero or more categories
 */
function addAppender () {
  var args = Array.prototype.slice.call(arguments);
  var appender = args.shift();
  if (args.length === 0 || args[0] === undefined) {
    args = [ ALL_CATEGORIES ];
  }
  //argument may already be an array
  if (Array.isArray(args[0])) {
    args = args[0];
  }
  
  args.forEach(function(category) {
    addAppenderToCategory(appender, category);
    
    if (category === ALL_CATEGORIES) {
      addAppenderToAllLoggers(appender);
    } else if (loggers[category]) {
      loggers[category].addListener("log", appender);
    }
  });
}

function addAppenderToAllLoggers(appender) {
  for (var logger in loggers) {
    if (loggers.hasOwnProperty(logger)) {
      loggers[logger].addListener("log", appender);
    }
  }
}

function addAppenderToCategory(appender, category) {
  if (!appenders[category]) {
    appenders[category] = [];
  }
  appenders[category].push(appender);
}

function clearAppenders () {
  appenders = {};
  for (var logger in loggers) {
    if (loggers.hasOwnProperty(logger)) {
      loggers[logger].removeAllListeners("log");
    }
  }
}

function configureAppenders(appenderList, options) {
  clearAppenders();
  if (appenderList) {
    appenderList.forEach(function(appenderConfig) {
      loadAppender(appenderConfig.type);
      var appender;
      appenderConfig.makers = appenderMakers;
      try {
        appender = appenderMakers[appenderConfig.type](appenderConfig, options);
        addAppender(appender, appenderConfig.category);
      } catch(e) {
        throw new Error("log4js configuration problem for " + util.inspect(appenderConfig), e);
      }
    });
  }
}

function configureLevels(levels) {
  if (levels) {
    for (var category in levels) {
      if (levels.hasOwnProperty(category)) {
        getLogger(category).setLevel(levels[category]);
      }
    }
  }
}

function setGlobalLogLevel(level) {
  Logger.prototype.level = levels.toLevel(level, levels.TRACE);
}

/**
 * Get the default logger instance.
 * @return {Logger} instance of default logger
 * @static
 */
function getDefaultLogger () {
  return getLogger(Logger.DEFAULT_CATEGORY);
}

var configState = {};

function loadConfigurationFile(filename) {
  if (filename) {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  }
  return undefined;
}

function configureOnceOff(config, options) {
  if (config) {
    try {
      configureAppenders(config.appenders, options);
      configureLevels(config.levels);
      
      if (config.replaceConsole) {
        replaceConsole();
      } else {
        restoreConsole();
      }
    } catch (e) {
      throw new Error(
        "Problem reading log4js config " + util.inspect(config) + 
          ". Error was \"" + e.message + "\" (" + e.stack + ")"
      );
    }
  }
}

function reloadConfiguration() {
  var mtime = getMTime(configState.filename);
  if (!mtime) return;

  if (configState.lastMTime && (mtime.getTime() > configState.lastMTime.getTime())) {
    configureOnceOff(loadConfigurationFile(configState.filename));
  }
  configState.lastMTime = mtime;
}

function getMTime(filename) {
  var mtime;
  try {
    mtime = fs.statSync(configState.filename).mtime;
  } catch (e) {
    getLogger('log4js').warn('Failed to load configuration file ' + filename);
  }
  return mtime;
}

function initReloadConfiguration(filename, options) {
  if (configState.timerId) {
    clearInterval(configState.timerId);
    delete configState.timerId;
  }
  configState.filename = filename;
  configState.lastMTime = getMTime(filename);
  configState.timerId = setInterval(reloadConfiguration, options.reloadSecs*1000);
}

function configure(configurationFileOrObject, options) {
  var config = configurationFileOrObject;
  config = config || process.env.LOG4JS_CONFIG;
  options = options || {};
  
  if (config === undefined || config === null || typeof(config) === 'string') {
    if (options.reloadSecs) {
      initReloadConfiguration(config, options);
    }
    config = loadConfigurationFile(config) || defaultConfig;
  } else {
    if (options.reloadSecs) {
      getLogger('log4js').warn(
        'Ignoring configuration reload parameter for "object" configuration.'
      );
    }
  }
  configureOnceOff(config, options);
}

var originalConsoleFunctions = {
  log: console.log,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error
};

function replaceConsole(logger) {
  function replaceWith(fn) {
    return function() {
      fn.apply(logger, arguments);
    };
  }
  logger = logger || getLogger("console");
  ['log','debug','info','warn','error'].forEach(function (item) {
    console[item] = replaceWith(item === 'log' ? logger.info : logger[item]);
  });
}

function restoreConsole() {
  ['log', 'debug', 'info', 'warn', 'error'].forEach(function (item) {
    console[item] = originalConsoleFunctions[item];
  });
}

function loadAppender(appender) {
  var appenderModule;
  try {
    appenderModule = require('./appenders/' + appender);
  } catch (e) {
    appenderModule = require(appender);
  }
  module.exports.appenders[appender] = appenderModule.appender.bind(appenderModule);
  appenderMakers[appender] = appenderModule.configure.bind(appenderModule);
}

module.exports = {
  getLogger: getLogger,
  getDefaultLogger: getDefaultLogger,
  
  addAppender: addAppender,
  loadAppender: loadAppender,
  clearAppenders: clearAppenders,
  configure: configure,
  
  replaceConsole: replaceConsole,
  restoreConsole: restoreConsole,
  
  levels: levels,
  setGlobalLogLevel: setGlobalLogLevel,
  
  layouts: layouts,
  appenders: {},
  appenderMakers: appenderMakers,
  connectLogger: require('./connect-logger').connectLogger
};

//set ourselves up
configure();

