var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function ChildDaemon(command, args, match) {
  var self = this,
      started = false,
      child;

  function killChild() {
    child.kill();
  }

  self.start = function(callback) {
    self.once('start', callback);
    if (started) {
      self.emit('start', new Error('child already started'));
    } else {
      var stdoutData = '';
      var onData;
      var checkMatch = function() {
        var matched = match.exec(stdoutData);
        if (matched && !started) {
          started = true;
          self.emit('start', null, matched);
        }
        return started;
      };

      var pty;
      try {
        // if pty.js is not installed then this will throw an error (and it
        // should mean we are on windows)
        pty = require('pty.js');
      } catch (error) {
        if (process.platform !== 'win32') {
          // on non windows platforms log a warning to watch out for output buffering
          console.warn('pty.js not found and not on windows - ouput buffering may prevent proper detection of a correctly started process');
        }
      }

      var onExit = function(error) {
        child = null;
        if (!started) {
          self.emit('start', new Error('child failed to start:\n' + stdoutData));
        } else {
          started = false;
          self.emit('stop');
        }
      };

      if (pty) {
        // use pty to make sure the output of the spawned process is not buffered
        child = pty.spawn(command, args);
        child.setEncoding();
        onData = function(data) {
          stdoutData += data.toString();
          if (checkMatch()) {
            child.removeListener('data', onData);
          }
        };
        child.on('data', onData);
      } else {
        // Likely we are on windows and pty.js failed to install.
        // Luckily on windows we don't have to worry about output buffering.
        // If for some reason pty.js is not available on another platform
        // that does buffer output then we may be in trouble.
        var spawn = require('child_process').spawn;
        child = spawn(command, args);
        child.stdout.setEncoding();
        child.stderr.setEncoding();
        onData = function(data) {
          stdoutData += data.toString();
          if (checkMatch()) {
            child.stdout.removeListener('data', onData);
            child.stderr.removeListener('data', onData);
            child.removeListener('error', onExit);
          }
        };
        child.stdout.on('data', onData);
        child.stderr.on('data', onData);
        child.on('error', onExit);
      }

      child.on('exit', onExit);
    }
  };
  
  self.stop = function(callback) {
    self.once('stop', callback);
    if (!started) {
      self.emit('stop', new Error('child not started'));
    } else {
      killChild();
    }
  };
}
util.inherits(ChildDaemon, EventEmitter);

module.exports = ChildDaemon;