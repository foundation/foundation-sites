"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper").rsync;

var srcDir = "./tests/fixtures/multiple/";
var destDir = "./tmp/multiple";
var destDirExclude = "./tmp/multiple-exclude";
var destDirDryRun = "./tmp/multiple-dry-run";

exports.suite = vows.describe("Multi file copy tests").addBatch({
    "Copying multiple files into a dir": {
        topic: function() {
            rsync({
                src: srcDir,
                dest: destDir,
                recursive: true
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in a dir that": {
            topic: function () {
                fs.readdir(destDir,this.callback);
            },
            "has contents": function (error,files) {
                assert.isNull(error);
                assert.equal(files.length,3);
            }
        }
    }
}).addBatch({
    "Copying multiple files into a dir with an exclude pattern": {
        topic: function() {
            rsync({
                src: srcDir,
                dest: destDirExclude,
                recursive: true,
                exclude: ["multiple3.txt"]
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in": {
            topic: function () {
                fs.readdir(destDirExclude,this.callback);
            },
            "a dir with a reduced number of files": function (error,files) {
                assert.isNull(error);
                assert.equal(files.length,2);
            }
        }
    }
}).addBatch({
    "Copying multiple files to a new dir in a dry run": {
        topic: function() {
            rsync({
                src: srcDir,
                dest: destDirDryRun,
                recursive: true,
                dryRun: true,
                onStdout: function (data) {
                    console.log(data);
                }
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "produces stdout": function (error,stdout,stderr) {
            assert.isNotNull(stdout);
        },
        "results in": {
            topic: function () {
                fs.readdir(destDirDryRun,this.callback);
            },
            "a dir that does not exist": function (error,files) {
                assert.isNotNull(error);
            }
        }
    }
});