"use strict";
var vows = require('vows')
, assert = require('assert')
, levels = require('../lib/levels')
, Logger = require('../lib/logger').Logger;

vows.describe('../lib/logger').addBatch({
  'constructor with no parameters': {
    topic: new Logger(),
    'should use default category': function(logger) {
      assert.equal(logger.category, Logger.DEFAULT_CATEGORY);
    },
    'should use TRACE log level': function(logger) {
      assert.equal(logger.level, levels.TRACE);
    }
  },

  'constructor with category': {
    topic: new Logger('cheese'),
    'should use category': function(logger) {
      assert.equal(logger.category, 'cheese');
    },
    'should use TRACE log level': function(logger) {
      assert.equal(logger.level, levels.TRACE);
    }
  },

  'constructor with category and level': {
    topic: new Logger('cheese', 'debug'),
    'should use category': function(logger) {
      assert.equal(logger.category, 'cheese');
    },
    'should use level': function(logger) {
      assert.equal(logger.level, levels.DEBUG);
    }
  },

  'isLevelEnabled': {
    topic: new Logger('cheese', 'info'),
    'should provide a level enabled function for all levels': function(logger) {
      assert.isFunction(logger.isTraceEnabled);
      assert.isFunction(logger.isDebugEnabled);
      assert.isFunction(logger.isInfoEnabled);
      assert.isFunction(logger.isWarnEnabled);
      assert.isFunction(logger.isErrorEnabled);
      assert.isFunction(logger.isFatalEnabled);
    },
    'should return the right values': function(logger) {
      assert.isFalse(logger.isTraceEnabled());
      assert.isFalse(logger.isDebugEnabled());
      assert.isTrue(logger.isInfoEnabled());
      assert.isTrue(logger.isWarnEnabled());
      assert.isTrue(logger.isErrorEnabled());
      assert.isTrue(logger.isFatalEnabled());
    }
  }
}).exportTo(module);
