"use strict";
var BaseRollingFileStream = require('./BaseRollingFileStream')
, debug = require('../debug')('RollingFileStream')
, util = require('util')
, path = require('path')
, fs = require('fs')
, async = require('async');

module.exports = RollingFileStream;

function RollingFileStream (filename, size, backups, options) {
  this.size = size;
  this.backups = backups || 1;
  
  function throwErrorIfArgumentsAreNotValid() {
    if (!filename || !size || size <= 0) {
      throw new Error("You must specify a filename and file size");
    }
  }
  
  throwErrorIfArgumentsAreNotValid();
  
  RollingFileStream.super_.call(this, filename, options);
}
util.inherits(RollingFileStream, BaseRollingFileStream);

RollingFileStream.prototype.shouldRoll = function() {
  debug("should roll with current size %d, and max size %d", this.currentSize, this.size);
  return this.currentSize >= this.size;
};

RollingFileStream.prototype.roll = function(filename, callback) {
  var that = this,
  nameMatcher = new RegExp('^' + path.basename(filename));
  
  function justTheseFiles (item) {
    return nameMatcher.test(item);
  }
  
  function index(filename_) {
    return parseInt(filename_.substring((path.basename(filename) + '.').length), 10) || 0;
  }
  
  function byIndex(a, b) {
    if (index(a) > index(b)) {
      return 1;
    } else if (index(a) < index(b) ) {
      return -1;
    } else {
      return 0;
    }
  }

  function increaseFileIndex (fileToRename, cb) {
    var idx = index(fileToRename);
    debug('Index of ' + fileToRename + ' is ' + idx);
    if (idx < that.backups) {
      //on windows, you can get a EEXIST error if you rename a file to an existing file
      //so, we'll try to delete the file we're renaming to first
      fs.unlink(filename + '.' + (idx+1), function (err) {
        //ignore err: if we could not delete, it's most likely that it doesn't exist
        debug('Renaming ' + fileToRename + ' -> ' + filename + '.' + (idx+1));
        fs.rename(path.join(path.dirname(filename), fileToRename), filename + '.' + (idx + 1), cb);
      });
    } else {
      cb();
    }
  }

  function renameTheFiles(cb) {
    //roll the backups (rename file.n to file.n+1, where n <= numBackups)
    debug("Renaming the old files");
    fs.readdir(path.dirname(filename), function (err, files) {
      async.forEachSeries(
        files.filter(justTheseFiles).sort(byIndex).reverse(),
        increaseFileIndex,
        cb
      );
    });
  }

  debug("Rolling, rolling, rolling");
  async.series([
    this.closeTheStream.bind(this),
    renameTheFiles,
    this.openTheStream.bind(this)
  ], callback);

};
