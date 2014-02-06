"use strict";

var vows = require("vows");
var assert = require("assert");

var rsyncwrapper = require("../lib/rsyncwrapper");

exports.suite = vows.describe("Package tests").addBatch({
    "The RSyncWrapper package": {
        topic: rsyncwrapper,
        "is not null": function (topic) {
            assert.isNotNull(topic);
        },
        "has a 'rsync()' function": function (topic) {
            assert.isFunction(topic.rsync);
        },
        "errors when started without options": function (topic) {
            assert.throws(topic.rsync,Error);
        }
    }
});