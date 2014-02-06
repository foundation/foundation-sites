"use strict";
var vows = require('vows')
, fs = require('fs')
, assert = require('assert');

function remove(filename) {
  try {
    fs.unlinkSync(filename);
  } catch (e) {
    //doesn't really matter if it failed
  }
}

vows.describe('log4js logLevelFilter').addBatch({
  'appender': {
    topic: function() {
      var log4js = require('../lib/log4js'), logEvents = [], logger;
      log4js.clearAppenders();
      log4js.addAppender(
        require('../lib/appenders/logLevelFilter')
          .appender(
            'ERROR', 
            function(evt) { logEvents.push(evt); }
          ), 
        "logLevelTest"
      );
      
      logger = log4js.getLogger("logLevelTest");
      logger.debug('this should not trigger an event');
      logger.warn('neither should this');
      logger.error('this should, though');
      logger.fatal('so should this');
      return logEvents;
    },
    'should only pass log events greater than or equal to its own level' : function(logEvents) {
      assert.equal(logEvents.length, 2);
      assert.equal(logEvents[0].data[0], 'this should, though');
      assert.equal(logEvents[1].data[0], 'so should this');
    }
  },

  'configure': {
    topic: function() {
      var log4js = require('../lib/log4js')
      , logger;
      
      remove(__dirname + '/logLevelFilter.log');
      remove(__dirname + '/logLevelFilter-warnings.log');
      
      log4js.configure('test/with-logLevelFilter.json');
      logger = log4js.getLogger("tests");
      logger.info('main');
      logger.error('both');
      logger.warn('both');
      logger.debug('main');
      //wait for the file system to catch up
      setTimeout(this.callback, 100);
    },
    'tmp-tests.log': {
      topic: function() {
        fs.readFile(__dirname + '/logLevelFilter.log', 'utf8', this.callback);
      },
      'should contain all log messages': function(contents) {
        var messages = contents.trim().split('\n');
        assert.deepEqual(messages, ['main','both','both','main']);
      }
    },
    'tmp-tests-warnings.log': {
      topic: function() {
        fs.readFile(__dirname + '/logLevelFilter-warnings.log','utf8',this.callback);
      },
      'should contain only error and warning log messages': function(contents) {
        var messages = contents.trim().split('\n');
        assert.deepEqual(messages, ['both','both']);
      }
    }
  }
}).export(module);
