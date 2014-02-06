"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper").rsync;

var srcArray = ["./tests/fixtures/multiple/multiple1.txt","./tests/fixtures/multiple/multiple2.txt"]
var destDir = "./tmp/src-as-array";

exports.suite = vows.describe("Copy multiple files using src as array").addBatch({
    "Copying multiple files into a dir": {
        topic: function() {
            rsync({
                src: srcArray,
                dest: destDir
            },this.callback);
        },
        "does not error": function (error,stdout,stderr,cmd) {
            assert.isNull(error);
        },
        "results in a dir that": {
            topic: function () {
                fs.readdir(destDir,this.callback);
            },
            "has contents": function (error,files) {
                assert.isNull(error);
                assert.equal(files.length,2);
            }
        }
    }
});