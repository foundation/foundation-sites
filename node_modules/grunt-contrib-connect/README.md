# grunt-contrib-connect v0.5.0 [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-connect.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-connect)

> Start a connect web server.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-connect --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-connect');
```




## Connect task
_Run this task with the `grunt connect` command._

Note that this server only runs as long as grunt is running. Once grunt's tasks have completed, the web server stops. This behavior can be changed with the [keepalive](#keepalive) option, and can be enabled ad-hoc by running the task like `grunt connect:keepalive`.

This task was designed to be used in conjunction with another task that is run immediately afterwards, like the [grunt-contrib-qunit plugin](https://github.com/gruntjs/grunt-contrib-qunit) `qunit` task.
### Options

#### port
Type: `Integer`  
Default: `8000`

The port on which the webserver will respond. The task will fail if the specified port is already in use. You can use the special values `0` or `'?'` to use a system-assigned port.

#### protocol
Type: `String`  
Default: `'http'`

May be `'http'` or `'https'`.

#### hostname
Type: `String`  
Default: `'localhost'`

The hostname the webserver will use.

Setting it to `'*'` will make the server accessible from anywhere.

#### base
Type: `String` or `Array`  
Default: `'.'`

The base (or root) directory from which files will be served. Defaults to the project Gruntfile's directory.

Can be an array of bases to serve multiple directories. The last base given will be the directory to become browse-able.

#### directory
Type: `String`  
Default: `null`

Set to the directory you wish to be browse-able. Used to override the `base` option browse-able directory.

#### keepalive
Type: `Boolean`  
Default: `false`

Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will _never run_. By default, once grunt's tasks have completed, the web server stops. This option changes that behavior.

This option can also be enabled ad-hoc by running the task like `grunt connect:targetname:keepalive`

#### debug
Type: `Boolean`  
Default: `false`

Set the `debug` option to true to enable logging instead of using the `--debug` flag.

#### livereload
Type: `Boolean` or `Number`  
Default: `false`

Set to `true` or a port number to inject a live reload script tag into your page using [connect-livereload](https://github.com/intesso/connect-livereload).

*This does not perform live reloading. It is intended to be used in tandem with grunt-contrib-watch or another task that will trigger a live reload server upon files changing.*

#### open
Type: `Boolean` or `String`
Default: `false`

Open the served page in your default browser. Specifying `true` opens the default server URL, while specifying a URL opens that URL.

#### middleware
Type: `Function`  
Default:

```js
function(connect, options) {
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
```

Lets you add in your own Connect middlewares. This option expects a function that returns an array of middlewares. See the [project Gruntfile][] and [project unit tests][] for a usage example.

[project Gruntfile]: Gruntfile.js
[project unit tests]: test/connect_test.js

### Usage examples

#### Basic Use
In this example, `grunt connect` (or more verbosely, `grunt connect:server`) will start a static web server at `http://localhost:9001/`, with its base path set to the `www-root` directory relative to the gruntfile, and any tasks run afterwards will be able to access it.

```javascript
// Project configuration.
grunt.initConfig({
  connect: {
    server: {
      options: {
        port: 9001,
        base: 'www-root'
      }
    }
  }
});
```

If you want your web server to use the default options, just omit the `options` object. You still need to specify a target (`uses_defaults` in this example), but the target's configuration object can otherwise be empty or nonexistent. In this example, `grunt connect` (or more verbosely, `grunt connect:uses_defaults`) will start a static web server using the default options.

```javascript
// Project configuration.
grunt.initConfig({
  connect: {
    uses_defaults: {}
  }
});
```

#### Multiple Servers
You can specify multiple servers to be run alone or simultaneously by creating a target for each server. In this example, running either `grunt connect:site1` or `grunt connect:site2` will  start the appropriate web server, but running `grunt connect` will run _both_. Note that any server for which the [keepalive](#keepalive) option is specified will prevent _any_ task or target from running after it.

```javascript
// Project configuration.
grunt.initConfig({
  connect: {
    site1: {
      options: {
        port: 9000,
        base: 'www-roots/site1'
      }
    },
    site2: {
      options: {
        port: 9001,
        base: 'www-roots/site2'
      }
    }
  }
});
```

#### Roll Your Own
Like the [Basic Use](#basic-use) example, this example will start a static web server at `http://localhost:9001/`, with its base path set to the `www-root` directory relative to the gruntfile. Unlike the other example, this is done by creating a brand new task. in fact, this plugin isn't even installed!

```javascript
// Project configuration.
grunt.initConfig({ /* Nothing needed here! */ });

// After running "npm install connect --save-dev" to add connect as a dev
// dependency of your project, you can require it in your gruntfile with:
var connect = require('connect');

// Now you can define a "connect" task that starts a webserver, using the
// connect lib, with whatever options and configuration you need:
grunt.registerTask('connect', 'Start a custom static web server.', function() {
  grunt.log.writeln('Starting static web server in "www-root" on port 9001.');
  connect(connect.static('www-root')).listen(9001);
});
```

#### Support for HTTPS

A default certificate authority, certificate and key file are provided and pre-
configured for use when `protocol` has been set to `https`.

NOTE: The passphrase used on the files is `grunt`

####### Advanced HTTPS config

If the default certificate setup is unsuitable for your environment, OpenSSL
can be used to create a set of self-signed certificates with a local ca root.

```shell
### Generate the CA key
### Set a passphrase and remember what it is
openssl genrsa -des3 -out ca.key 2048
### Generate a CA root
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt

### Generate the server key
openssl genrsa -out server.key 1024
### Generate the request to the self-signed CA root
openssl req -new -key server.key -out server.csr
### Generate the server certificate
openssl x509 -req -in server.csr -out server.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 3650
```

For more details on the various options that can be set when configuring SSL,
please see the Node documentation for [TLS][].

Grunt configuration would become

```javascript
// Project configuration.
grunt.initConfig({
  connect: {
    server: {
      options: {
        protocol: 'https',
        port: 8443,
        key: grunt.file.read('server.key').toString(),
        cert: grunt.file.read('server.crt').toString(),
        ca: grunt.file.read('ca.crt').toString(),
        passphrase: 'grunt',
      },
    },
  },
});
```

[TLS]: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener

#### Grunt Events
The connect plugin will emit a grunt event, `connect.{taskName}.listening`, once the server has started. You can listen for this event to run things against a keepalive server, for example:

```javascript
grunt.registerTask('jasmine-server', 'start web server for jasmine tests in browser', function() {
  grunt.task.run('jasmine:tests:build');

  grunt.event.once('connect.tests.listening', function(host, port) {
    var specRunnerUrl = 'http://' + host + ':' + port + '/_SpecRunner.html';
    grunt.log.writeln('Jasmine specs available at: ' + specRunnerUrl);
    require('open')(specRunnerUrl);
  });

  grunt.task.run('connect:tests:keepalive');
});
```


## Release History

 * 2013-09-05   v0.5.0   Add 'open' option.
 * 2013-09-05   v0.4.2   Un-normalize options.base as it should be a string or an array as the user has set. Fix setting target hostname option.
 * 2013-09-02   v0.4.1   Browse-able directory is the last item supplied to bases. Added directory option to override browse-able directory.
 * 2013-09-01   v0.4.0   Fix logging of which server address. Ability to set multiple bases. Event emitted when server starts listening. Support for HTTPS. debug option added to display debug logging like the --debug flag. livereload option added to inject a livereload snippet into the page.
 * 2013-04-10   v0.3.0   Add ability to listen on system-assigned port.
 * 2013-03-07   v0.2.0   Upgrade connect dependency.
 * 2013-02-17   v0.1.2   Ensure Gruntfile.js is included on npm.
 * 2013-02-15   v0.1.1   First official release for Grunt 0.4.0.
 * 2013-01-18   v0.1.1rc6   Updating grunt/gruntplugin dependencies to rc6. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.1.1rc5   Updating to work with grunt v0.4.0rc5.
 * 2012-11-01   v0.1.0   Work in progress, not yet officially released.

---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com)

*This file was generated on Thu Sep 05 2013 14:09:10.*
