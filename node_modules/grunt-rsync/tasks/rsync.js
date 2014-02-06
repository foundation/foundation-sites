"use strict";

var rsync = require("rsyncwrapper").rsync;

module.exports = function (grunt) {

    grunt.task.registerMultiTask("rsync","Performs rsync tasks.",function () {

        var done = this.async();

        var options = this.options();

        grunt.log.writelns("rsyncing "+options.src+" >>> "+options.dest);

        if ( !options.onStdout ) {
            options.onStdout = function (data) {
                grunt.log.write(data.grey);
            };
        }

        try {
            rsync(options,function (error,stdout,stderr,cmd) {
                grunt.log.writeln("Shell command was: "+cmd);
                if ( error ) {
                    grunt.log.error();
                    grunt.log.writeln(error.toString().red);
                    done(false);
                } else {
                    grunt.log.ok();
                    done(true);
                }
            });
        } catch (error) {
            grunt.log.writeln("\n"+error.toString().red);
            done(false);
        }
    });
};
