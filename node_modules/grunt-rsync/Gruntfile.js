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
                    "tests/*.js",
                    "tasks/*.js"
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
        rsync: {
            options: {
                args: ["--verbose","--progress"]
            },
            single: {
                options: {
                    src: "./tests/fixtures/test.txt",
                    dest: "./tmp/test.txt"
                }
            },
            multiple: {
                options: {
                    src: "./tests/fixtures/multiple/",
                    dest: "./tmp/multiple",
                    recursive: true
                }
            }
        },
        vows: {
            all: {
                src: ["tests/basic.js"],
                options: {
                    reporter: "spec",
                    verbose: false,
                    silent: false,
                    colors: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-vows");

    grunt.loadTasks("tasks");

    grunt.registerTask("test",[
        "jshint",
        "clean:tmp",
        "shell:tmpdir",
        "rsync",
        "vows",
        "clean:tmp"
    ]);
};