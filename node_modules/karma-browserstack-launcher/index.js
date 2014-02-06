var q = require('q');
var api = require('browserstack');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');


var createBrowserStackTunnel = function(logger, config, emitter) {
  var log = logger.create('launcher.browserstack');
  var bsConfig = config.browserStack || {};

  if (bsConfig.startTunnel === false) {
    return q();
  }

  log.debug('Establishing the tunnel on %s:%s', config.hostname, config.port);

  var deferred = q.defer();
  var tunnel = new BrowserStackTunnel({
    key: process.env.BROWSER_STACK_ACCESS_KEY || bsConfig.accessKey,
    hosts: [{
      name: config.hostname,
      port: config.port,
      sslFlag: 0
    }]
  });

  tunnel.start(function(error) {
    if (error) {
      log.error('Can not establish the tunnel.');
      deferred.reject(error);
    } else {
      log.debug('Tunnel established.')
      deferred.resolve();
    }
  });

  emitter.on('exit', function(done) {
    log.debug('Shutting down the tunnel.');
    tunnel.stop(function(error) {
      done();
    });
  });

  return deferred.promise;
};



var createBrowserStackClient = function(/* config.browserStack */ config) {
  var env = process.env;

  // TODO(vojta): handle no username/pwd
  return api.createClient({
    username: env.BROWSER_STACK_USERNAME || config.username,
    password: env.BROWSER_STACK_ACCESS_KEY || config.accessKey
  });
};

var formatError = function(error) {
  if (error.message === 'Validation Failed') {
    return '  Validation Failed: you probably misconfigured the browser ' +
           'or given browser is not available.';
  }

  return error.toString();
};


var BrowserStackBrowser = function(id, emitter, args, logger,
    /* browserStackTunnel */ tunnel, /* browserStackClient */ client) {

  var self = this;
  var workerId = null;
  var captured = false;
  var log = logger.create('launcher.browserstack');
  var browserName = (args.browser || args.device) + (args.browser_version ? ' ' + args.browser_version : '') +
                    ' (' + args.os + ' ' + args.os_version +  ')' + ' on BrowserStack';

  this.id = id;
  this.name = browserName;

  this.start = function(url) {
    // TODO(vojta): handle non os/browser/version
    var settings = {
      os: args.os,
      os_version: args.os_version,
      device: args.device,
      browser: args.browser,
      // TODO(vojta): remove "version" (only for B-C)
      browser_version: args.browser_version || args.version || 'latest',
      url: url + '?id=' + id
    };

    tunnel.then(function() {
      client.createWorker(settings, function(error, worker) {
        if (error) {
          log.error('Can not start %s\n  %s', browserName, formatError(error));
          return emitter.emit('browser_process_failure', self);
        }

        log.debug('Browser %s started with id %s', browserName, worker.id);
        workerId = worker.id;
      });
    }, function() {
        emitter.emit('browser_process_failure', self);
    });
  };

  this.kill = function(done) {
    if (!workerId) {
      done();
    }

    log.debug('Killing worker %s', workerId);
    client.terminateWorker(workerId, done);
  };


  this.markCaptured = function() {
    captured = true;
  };

  this.isCaptured = function() {
    return captured;
  };

  this.toString = function() {
    return this.name;
  };
};


// PUBLISH DI MODULE
module.exports = {
  'browserStackTunnel': ['factory', createBrowserStackTunnel],
  'browserStackClient': ['factory', createBrowserStackClient],
  'launcher:BrowserStack': ['type', BrowserStackBrowser]
};
