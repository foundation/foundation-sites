"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper").rsync;

var srcFile = "single.txt";
var srcFilePath = "./tests/fixtures/"+srcFile;
var destDir = "./tmp/";
var copiedFile = destDir+srcFile;

exports.suite = vows.describe("Single file copy tests").addBatch({
    "Copying a single file into a dir": {
        topic: function() {
            rsync({
                src: srcFilePath,
                dest: destDir
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in a file that": {
            topic: function () {
                fs.stat(copiedFile,this.callback);
            },
            "can be accessed": function (error,stats) {
                assert.isNull(error);
            },
            "has non-zero size": function (stats) {
                assert.isNotZero(stats.size);
            }
        }
    }
});