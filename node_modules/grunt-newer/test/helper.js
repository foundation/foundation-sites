var path = require('path');
var cp = require('child_process');
var fs = require('fs');

var chai = require('chai');
var tmp = require('tmp');
var wrench = require('wrench');

var fixtures = path.join(__dirname, 'integration', 'fixtures');
var tmpDir = 'tmp';


/**
 * Spawn a Grunt process.
 * @param {string} dir Directory with gruntfile.js.
 * @param {function(Error, Process)} done Callback.
 */
function spawnGrunt(dir, done) {
  var gruntfile = path.join(dir, 'gruntfile.js');
  if (!fs.existsSync(gruntfile)) {
    done(new Error('Cannot find gruntfile.js: ' + gruntfile));
  } else {
    var node = process.argv[0];
    var grunt = process.argv[1]; // assumes grunt drives these tests
    var child = cp.spawn(node, [grunt, '--verbose', '--stack'], {cwd: dir});
    done(null, child);
  }
}


/**
 * Set up before running tests.
 * @param {string} name Fixture name.
 * @param {function} done Callback.
 */
function cloneFixture(name, done) {
  var fixture = path.join(fixtures, name);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  tmp.dir({dir: tmpDir}, function(error, dir) {
    if (error) {
      return done(error);
    }
    var scratch = path.join(dir, name);
    wrench.copyDirRecursive(fixture, scratch, function(error) {
      done(error, scratch);
    });
  });
}


/**
 * Clone a fixture and run the default Grunt task in it.
 * @param {string} name Fixture name.
 * @param {function(Error, scratch)} done Called with an error if the task
 *     fails.  Called with the cloned fixture directory if the task succeeds.
 */
exports.buildFixture = function(name, done) {
  cloneFixture(name, function(error, scratch) {
    if (error) {
      return done(error);
    }
    spawnGrunt(scratch, function(error, child) {
      if (error) {
        return done(error);
      }
      var messages = [];
      child.stderr.on('data', function(chunk) {
        messages.push(chunk.toString());
      });
      child.stdout.on('data', function(chunk) {
        messages.push(chunk.toString());
      });
      child.on('close', function(code) {
        if (code !== 0) {
          done(new Error('Task failed: ' + messages.join('')));
        } else {
          done(null, scratch);
        }
      });
    });
  });
};


/**
 * Clean up after running tests.
 * @param {string} scratch Path to scratch directory.
 * @param {function} done Callback.
 */
exports.afterFixture = function(scratch, done) {
  var error;
  if (scratch) {
    try {
      wrench.rmdirSyncRecursive(scratch, false);
      wrench.rmdirSyncRecursive(tmpDir, false);
    } catch (err) {
      error = err;
    }
  }
  done(error);
};


/** @type {boolean} */
chai.Assertion.includeStack = true;


/**
 * Chai's assert function configured to include stacks on failure.
 * @type {function}
 */
exports.assert = chai.assert;
