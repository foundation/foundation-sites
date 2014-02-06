/*
 * grunt-contrib-connect
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var connect = require('connect');
  var http = require('http');
  var https = require('https');
  var injectLiveReload = require('connect-livereload');
  var open = require('open');

  grunt.registerMultiTask('connect', 'Start a connect web server.', function() {
    // Merge task-specific options with these defaults.
    var options = this.options({
      protocol: 'http',
      port: 8000,
      hostname: 'localhost',
      base: '.',
      directory: null,
      keepalive: false,
      debug: false,
      livereload: false,
      open: false,
      middleware: function(connect, options) {
        var middlewares = [];
        var directory = options.directory || options.base[options.base.length - 1];
        if (!Array.isArray(options.base)) {
          options.base = [options.base];
        }
        options.base.forEach(function(base) {
          // Serve static files.
          middlewares.push(connect.static(base));
        });
        // Make directory browse-able.
        middlewares.push(connect.directory(directory));
        return middlewares;
      }
    });

    if (options.protocol !== 'http' && options.protocol !== 'https') {
      grunt.fatal('protocol option must be \'http\' or \'https\'');
    }

    // Connect requires the base path to be absolute.
    if (Array.isArray(options.base)) {
      options.base = options.base.map(function(base) {
        return path.resolve(base);
      });
    } else {
      options.base = path.resolve(options.base);
    }

    // Connect will listen to all interfaces if hostname is null.
    if (options.hostname === '*') {
      options.hostname = null;
    }

    // Connect will listen to ephemeral port if asked
    if (options.port === '?') {
      options.port = 0;
    }

    var middleware = options.middleware ? options.middleware.call(this, connect, options) : [];

    // If --debug was specified, enable logging.
    if (grunt.option('debug') || options.debug === true) {
      connect.logger.format('grunt', ('[D] server :method :url :status ' +
        ':res[content-length] - :response-time ms').magenta);
      middleware.unshift(connect.logger('grunt'));
    }

    // Inject live reload snippet
    if (options.livereload !== false) {
      if (options.livereload === true) {
        options.livereload = 35729;
      }
      middleware.unshift(injectLiveReload({port: options.livereload}));
    }

    // Start server.
    var done = this.async();
    var taskTarget = this.target;
    var keepAlive = this.flags.keepalive || options.keepalive;

    var app = connect.apply(null, middleware);
    var server = null;

    if (options.protocol === 'https') {
      server = https.createServer({
        key: options.key || grunt.file.read(path.join(__dirname, 'certs', 'server.key')).toString(),
        cert: options.cert || grunt.file.read(path.join(__dirname, 'certs', 'server.crt')).toString(),
        ca: options.ca || grunt.file.read(path.join(__dirname, 'certs', 'ca.crt')).toString(),
        passphrase: options.passphrase || 'grunt',
      }, app);
    } else {
      server = http.createServer(app);
    }

    server
      .listen(options.port, options.hostname)
      .on('listening', function() {
        var address = server.address();
        grunt.log.writeln('Started connect web server on ' + (address.address || 'localhost') + ':' + address.port + '.');
        grunt.config.set('connect.' + taskTarget + '.options.hostname', address.address || 'localhost');
        grunt.config.set('connect.' + taskTarget + '.options.port', address.port);

        grunt.event.emit('connect.' + taskTarget + '.listening', (address.address || 'localhost'), address.port);

        if (options.open === true) {
          open(options.protocol + '://' + address.address + ':' + address.port);
        } else if (typeof options.open === 'string') {
          open(options.open);
        }

        if (!keepAlive) {
          done();
        }
      })
      .on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
          grunt.fatal('Port ' + options.port + ' is already in use by another process.');
        } else {
          grunt.fatal(err);
        }
      });

    // So many people expect this task to keep alive that I'm adding an option
    // for it. Running the task explicitly as grunt:keepalive will override any
    // value stored in the config. Have fun, people.
    if (keepAlive) {
      // This is now an async task. Since we don't call the "done"
      // function, this task will never, ever, ever terminate. Have fun!
      grunt.log.write('Waiting forever...\n');
    }
  });
};
