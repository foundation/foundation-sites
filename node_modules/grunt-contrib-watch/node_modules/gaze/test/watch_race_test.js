'use strict';

var gaze = require('../lib/gaze.js');
var grunt = require('grunt');
var path = require('path');
var fs = require('fs');
var cp = require('child_process');

// Clean up helper to call in setUp and tearDown
function cleanUp(done) {
  [
    'nested/sub/poller.js'
  ].forEach(function(d) {
    var p = path.resolve(__dirname, 'fixtures', d);
    if (fs.existsSync(p)) { fs.unlinkSync(p); }
  });
  done();
}

exports.watch_race = {
  setUp: function(done) {
    process.chdir(path.resolve(__dirname, 'fixtures'));
    cleanUp(done);
  },
  tearDown: cleanUp,
  initWatchDirOnClose: function(test) {
    var times = 5,
        TIMEOUT = 5000,
        firedWhenClosed = 0,
        watchers = [],
        watcherIdxes = [],
        polled_file = ['fixtures', 'nested', 'sub', 'poller.js'],
        expected_path = path.join.apply(path, polled_file.slice(1));
    test.expect(times);
    for (var i = times; i--;) {
      watcherIdxes.unshift(i);
    }
    // Create the file so that it can be watched
    fs.writeFileSync(path.resolve.apply(path, [__dirname].concat(polled_file)), '');
    // Create a poller that keeps making changes to the file until timeout
    var child_poller = cp.fork(
      '../file_poller.js',
      [times * TIMEOUT].concat(polled_file)
    );
    grunt.util.async.forEachSeries(watcherIdxes, function(idx, next) {
      var watcher = new gaze.Gaze('**/poller.js', function(err, watcher) {
        var timeout = setTimeout(function () {
          test.ok(false, 'watcher ' + idx + ' did not fire event on polled file.');
          watcher.close();
        }, TIMEOUT);
        watcher.on('all', function (status, filepath) {
          if (!filepath) { return; }
          var expected = path.relative(process.cwd(), filepath);
          test.equal(expected_path, expected, 'watcher ' + idx +
            ' emitted unexpected event.');
          clearTimeout(timeout);
          watcher.close();
        });
        watcher.on('end', function () {
          // After watcher is closed and all event listeners have been removed,
          // re-add a listener to see if anything is going on on this watcher.
          process.nextTick(function () {
            watcher.once('added', function () {
              test.ok(false, 'watcher ' + idx + ' should not fire added' +
               ' event on polled file after being closed.');
            });
          });
          next();
        });
      });
      watchers.push(watcher);
    }, function () {
      child_poller.kill();
      watchers.forEach(function (watcher) {
        try {
          watcher.close();
        } catch (e) {
          // Ignore if this fails
        }
      });
      test.done();
    });
  },
};
