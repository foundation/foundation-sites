"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper").rsync;

var srcFile = "single.txt";
var srcFilePath = "./tests/fixtures/"+srcFile;
var destDir = "user@example.com:tmp/";
var copiedFile = destDir+srcFile;

exports.suite = vows.describe("Copy file to remote dest test").addBatch({
    "Copying a single file to remote dest": {
        topic: function() {
            rsync({
                src: srcFilePath,
                dest: destDir,
                ssh: true,
                port: "1234",
                privateKey: "~/.ssh/aws.pem",
                noExec: true
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in an rsync command that should work": function(error,stdout,stderr,cmd) {
            assert.equal(cmd, 'rsync ./tests/fixtures/single.txt user@example.com:tmp/ --rsh "ssh -p 1234 -i ~/.ssh/aws.pem"');
        }
    }
});
