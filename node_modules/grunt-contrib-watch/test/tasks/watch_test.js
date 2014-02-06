'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');
var helper = require('./helper');

var fixtures = helper.fixtures;
var useFixtures = ['multiTargets', 'oneTarget', 'atBegin', 'dateFormat'];

function cleanUp() {
  useFixtures.forEach(function(fixture) {
    helper.cleanUp(fixture + '/node_modules');
  });
}

exports.watch = {
  setUp: function(done) {
    cleanUp();
    useFixtures.forEach(function(fixture) {
      fs.symlinkSync(path.join(__dirname, '../../node_modules'), path.join(fixtures, fixture, 'node_modules'));
    });
    done();
  },
  tearDown: function(done) {
    cleanUp();
    done();
  },
  atBegin: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'atBegin');
    var assertWatch = helper.assertTask(['watch', '--debug'], {cwd:cwd});
    assertWatch(function() {
       // noop. Does not modify any watched files.
    }, function(result) {
      helper.verboseLog(result);
      var firstIndex = result.indexOf('one has changed');
      test.ok(firstIndex !== -1, 'Watch should have fired even though no file was changed.');
      test.done();
    });
  },
  dateFormat: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'dateFormat');
    var assertWatch = helper.assertTask(['watch', '--debug'], {cwd:cwd});
    assertWatch(function() {
       grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('dateFormat has worked!') !== -1, 'Should have displayed a custom dateFormat.');
      test.done();
    });
  },
  oneTarget: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'oneTarget');
    var assertWatch = helper.assertTask(['watch', '--debug'], {cwd:cwd});
    assertWatch(function() {
      var write = 'var test = true;';
      grunt.file.write(path.join(cwd, 'lib', 'one.js'), write);
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('File "lib' + path.sep + 'one.js" changed') !== -1, 'Watch should have fired when oneTarget/lib/one.js has changed.');
      test.ok(result.indexOf('I do absolutely nothing.') !== -1, 'echo task should have fired.');
      test.done();
    });
  },
  multiTargetsTriggerOneNotTwo: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch(function() {
      var write = 'var test = true;';
      grunt.file.write(path.join(cwd, 'lib', 'one.js'), write);
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('one has changed') !== -1, 'Only task echo:one should of emit.');
      test.ok(result.indexOf('two has changed') === -1, 'Task echo:two should NOT emit.');
      test.done();
    });
  },
  multiTargetsSequentialFilesChangeTriggerBoth: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch([function() {
      grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var test = true;');
    }, function() {
      grunt.file.write(path.join(cwd, 'lib', 'two.js'), 'var test = true;');
    }], function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('one has changed') !== -1, 'Task echo:one should of emit.');
      test.ok(result.indexOf('two has changed') !== -1, 'Task echo:two should of emit.');
      test.done();
    });
  },
  multiTargetsSimultaneousFilesChangeTriggerBoth: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch([function() {
      grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var test = true;');
      grunt.file.write(path.join(cwd, 'lib', 'two.js'), 'var test = true;');
    }], function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('one has changed') !== -1, 'Task echo:one should of emit.');
      test.ok(result.indexOf('two has changed') !== -1, 'Task echo:two should of emit.');
      test.done();
    });
  },
  spawnOneAtATime: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch(function() {
      grunt.file.write(path.join(cwd, 'lib', 'wait.js'), 'var wait = false;');
      setTimeout(function() {
        grunt.file.write(path.join(cwd, 'lib', 'wait.js'), 'var wait = true;');
      }, 500);
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('I waited 2s') !== -1, 'Task should have waited 2s and only spawned once.');
      test.done();
    });
  },
  interrupt: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch(function() {
      grunt.file.write(path.join(cwd, 'lib', 'interrupt.js'), 'var interrupt = false;');
      setTimeout(function() {
        grunt.file.write(path.join(cwd, 'lib', 'interrupt.js'), 'var interrupt = true;');
      }, 1000);
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.indexOf('have been interrupted') !== -1, 'Task should have been interrupted.');
      test.done();
    });
  },
  failingTask: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'multiTargets');
    var assertWatch = helper.assertTask('watch', {cwd:cwd});
    assertWatch(function() {
      grunt.file.write(path.join(cwd, 'lib', 'fail.js'), 'var fail = false;');
    }, function(result) {
      helper.verboseLog(result);
      test.ok(result.toLowerCase().indexOf('fatal') !== -1, 'Task should have been fatal.');
      test.equal(grunt.util._(result).count('Waiting...'), 2, 'Should have displayed "Wating..." twice');
      test.done();
    });
  }
};
