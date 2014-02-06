"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                "node": true,
                "es5": true,
                "globalstrict": true
            },
            files: {
                src: [
                    "grunt.js",
                    "vows/**/*.js",
                    "lib/**/*.js"
                ]
            }
        },
        shell: {
            tmpdir : {
                command: "mkdir tmp"
            }
        },
        clean: {
            tmp: ["tmp"]
        },
        vows: {
            all: {
                src: [
                    "tests/package.js",
                    "tests/single-copy.js",
                    "tests/multi-copy.js",
                    "tests/src-as-array.js",
                    "tests/remote-host.js",
                    "tests/remote-dest.js",
                    "tests/remote-src.js"
                ],
                options: {
                    reporter: "spec",
                    verbose: false,
                    silent: false,
                    colors: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-vows");

    grunt.registerTask("test",["jshint","clean:tmp","shell:tmpdir","vows","clean:tmp"]);
};
