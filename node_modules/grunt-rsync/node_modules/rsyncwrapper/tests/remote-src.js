"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper").rsync;

var srcFile = "single.txt";
var srcFilePath = "user@example.com:tests/fixtures/"+srcFile;
var destDir = "./tmp/";
var copiedFile = destDir+srcFile;

exports.suite = vows.describe("Copy remote file to local dest test").addBatch({
    "Copying a single remote file to local dest": {
        topic: function() {
            rsync({
                src: srcFilePath,
                dest: destDir,
                ssh: true,
                noExec: true
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in an rsync command that should work": function(error,stdout,stderr,cmd) {
            assert.equal(cmd, 'rsync user@example.com:tests/fixtures/single.txt ./tmp/ --rsh ssh');
        }
    }
});
