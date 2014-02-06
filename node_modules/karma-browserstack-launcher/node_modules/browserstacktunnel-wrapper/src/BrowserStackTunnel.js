var util = require('util'),
    ChildDaemon = require('child-daemon');

function BrowserStackTunnel(options) {
  options.jarFile = options.jarFile || __dirname + '/../bin/BrowserStackTunnel.jar';
  var params = '';
  options.hosts.forEach(function(host) {
    if (params.length > 0) {
      params += ',';
    }
    params += host.name + ',' + host.port + ',' + host.sslFlag;
  });
  ChildDaemon.call(
    this,
    'java',
    ['-jar', options.jarFile, options.key, params],
    new RegExp('Press Ctrl-C to exit')
  );
  
  this.superStart = this.start;
  this.start = function(callback) {
    this.superStart(function(error, matched) {
      // don't bother forwarding the matched array
      callback(error);
    });
  };
}
util.inherits(BrowserStackTunnel, ChildDaemon);

module.exports = BrowserStackTunnel;