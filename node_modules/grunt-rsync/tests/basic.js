"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");

exports.suite = vows.describe("Basic tests").addBatch({
    "A file previously copied by the rsync task": {
        topic: function() {
            fs.stat("./tmp/test.txt",this.callback);
        },
        "is readable": function (error,stats) {
            assert.isNull(error);
        }
    },
    "A directory previously synced by the rsync task": {
        topic: function () {
            fs.readdir("./tmp/multiple",this.callback);
        },
        "is readable": function (error,files) {
            assert.isNull(error);
        },
        "has the correct contents": function (files) {
            assert.equal(files.length,3);
        }
    }
});