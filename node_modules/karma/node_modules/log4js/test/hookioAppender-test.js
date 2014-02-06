"use strict";
var vows = require('vows')
, assert = require('assert')
, sandbox = require('sandboxed-module');

function fancyResultingHookioAppender(hookNotReady) {
  var emitHook = !hookNotReady
  , result = { ons: {}, emissions: {}, logged: [], configs: [] };

  var fakeLog4Js = {
    appenderMakers: {}
  };
  fakeLog4Js.loadAppender = function (appender) {
    fakeLog4Js.appenderMakers[appender] = function (config) {
      result.actualLoggerConfig = config;
      return function log(logEvent) {
        result.logged.push(logEvent);
      };
    };
  };

  var fakeHookIo = { Hook: function(config) { result.configs.push(config); } };
  fakeHookIo.Hook.prototype.start = function () {
    result.startCalled = true;
  };
  fakeHookIo.Hook.prototype.on = function (eventName, functionToExec) {
    result.ons[eventName] = { functionToExec: functionToExec };
    if (emitHook && eventName === 'hook::ready') {
      functionToExec();
    }
  };
  fakeHookIo.Hook.prototype.emit = function (eventName, data) {
    result.emissions[eventName] = result.emissions[eventName] || [];
    result.emissions[eventName].push({data: data});
    var on = '*::' + eventName;
    if (eventName !== 'hook::ready' && result.ons[on]) {
      result.ons[on].callingCount = 
        result.ons[on].callingCount ? result.ons[on].callingCount += 1 : 1;
      result.ons[on].functionToExec(data);
    }
  };

  return { theResult: result,
    theModule: sandbox.require('../lib/appenders/hookio', {
      requires: {
        '../log4js': fakeLog4Js,
        'hook.io': fakeHookIo
      }
    })
  };
}


vows.describe('log4js hookioAppender').addBatch({
  'master': {
    topic: function() {
      var fancy = fancyResultingHookioAppender();
      var logger = fancy.theModule.configure(
        { 
          name: 'ohno', 
          mode: 'master', 
          'hook-port': 5001, 
          appender: { type: 'file' } 
        }
      );
      logger(
        { 
          level: { levelStr: 'INFO' }, 
          data: "ALRIGHTY THEN", 
          startTime: '2011-10-27T03:53:16.031Z' 
        }
      );
      logger(
        { 
          level: { levelStr: 'DEBUG' }, 
          data: "OH WOW", 
          startTime: '2011-10-27T04:53:16.031Z'
        }
      );
      return fancy.theResult;
    },

    'should write to the actual appender': function (result) {
      assert.isTrue(result.startCalled);
      assert.equal(result.configs.length, 1);
      assert.equal(result.configs[0]['hook-port'], 5001);
      assert.equal(result.logged.length, 2);
      assert.equal(result.emissions['ohno::log'].length, 2);
      assert.equal(result.ons['*::ohno::log'].callingCount, 2);
    },

    'data written should be formatted correctly': function (result) {
      assert.equal(result.logged[0].level.toString(), 'INFO');
      assert.equal(result.logged[0].data, 'ALRIGHTY THEN');
      assert.isTrue(typeof(result.logged[0].startTime) === 'object');
      assert.equal(result.logged[1].level.toString(), 'DEBUG');
      assert.equal(result.logged[1].data, 'OH WOW');
      assert.isTrue(typeof(result.logged[1].startTime) === 'object');
    },

    'the actual logger should get the right config': function (result) {
      assert.equal(result.actualLoggerConfig.type, 'file');
    }
  },
  'worker': {
    'should emit logging events to the master': {
      topic: function() {
        var fancy = fancyResultingHookioAppender();
        var logger = fancy.theModule.configure({ 
          name: 'ohno', 
          mode: 'worker', 
          appender: { type: 'file' } 
        });
        logger({ 
          level: { levelStr: 'INFO' }, 
          data: "ALRIGHTY THEN", 
          startTime: '2011-10-27T03:53:16.031Z' 
        });
        logger({ 
          level: { levelStr: 'DEBUG' }, 
          data: "OH WOW", 
          startTime: '2011-10-27T04:53:16.031Z'
        });
        return fancy.theResult;
      },

      'should not write to the actual appender': function (result) {
        assert.isTrue(result.startCalled);
        assert.equal(result.logged.length, 0);
        assert.equal(result.emissions['ohno::log'].length, 2);
        assert.isUndefined(result.ons['*::ohno::log']);
      }
    }
  },
  'when hook not ready': {
    topic: function() {
      var fancy = fancyResultingHookioAppender(true)
      , logger = fancy.theModule.configure({
        name: 'ohno', 
        mode: 'worker'
      });

      logger({ 
        level: { levelStr: 'INFO' },
        data: "something",
        startTime: '2011-10-27T03:45:12.031Z'
      });
      return fancy;
    },
    'should buffer the log events': function(fancy) {
      assert.isUndefined(fancy.theResult.emissions['ohno::log']);
    },
  },
  'when hook ready': {
    topic: function() {
      var fancy = fancyResultingHookioAppender(true)
      , logger = fancy.theModule.configure({
        name: 'ohno', 
        mode: 'worker'
      });

      logger({ 
        level: { levelStr: 'INFO' },
        data: "something",
        startTime: '2011-10-27T03:45:12.031Z'
      });

      fancy.theResult.ons['hook::ready'].functionToExec();
      return fancy;
    },
    'should emit the buffered events': function(fancy) {
      assert.equal(fancy.theResult.emissions['ohno::log'].length, 1);
    }
  }

}).exportTo(module);
