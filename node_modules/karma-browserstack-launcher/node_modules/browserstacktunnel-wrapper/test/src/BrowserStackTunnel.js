var expect = require('expect.js'),
    BrowserStackTunnel = require('../../'),
    http = require('http'),
    fork = require('child_process').fork;

var INVALID_JAR_FILE = './bin/unknown.jar',
    HOST_NAME = 'localhost',
    PORT = 8080,
    INVALID_PORT = 8081,
    SSL_FLAG = 0,
    CONFIG = require('../Support/BrowserStackConfig');

var TEST_RESPONSE = "This is a test";

describe('BrowserStackTunnel', function() {
  var server;
  
  before(function(done) {
    server = http.createServer(function(request, response) {
      response.end(TEST_RESPONSE);
    });
    server.listen(PORT, done);
  });

  it('should start the tunnel using the default jar file included in the package', function(done) {
    this.timeout(10000);
    var browserStackTunnel = new BrowserStackTunnel({
      key: CONFIG.key,
      hosts: [{
        name: HOST_NAME,
        port: PORT,
        sslFlag: SSL_FLAG
      }]
    });
    browserStackTunnel.start(function(error) {
      if (error) {
        expect().fail('Error encountered starting the tunnel:\n' + error);
      }
      // TODO: check if tunnel is really running
      browserStackTunnel.stop(function(error) {
        if (error) {
          expect().fail('Error encountered stopping the tunnel:\n' + error);
        }
        done();
      });
    });
  });
  
  it('should error if an invalid jar file is specified', function(done) {
    var browserStackTunnel = new BrowserStackTunnel({
      key: CONFIG.key, 
      hosts: [{
        name: HOST_NAME,
        port: PORT,
        sslFlag: SSL_FLAG
      }],
      jarFile: INVALID_JAR_FILE
    });
    browserStackTunnel.start(function(error) {
      expect(error.message).to.contain('child failed to start');
      done();
    });
  });

  it('should error if stopped before started', function(done) {
    var browserStackTunnel = new BrowserStackTunnel({
      key: CONFIG.key,
      hosts: [{
        name: HOST_NAME,
        port: PORT,
        sslFlag: SSL_FLAG
      }]
    });
    browserStackTunnel.stop(function(error) {
      expect(error.message).to.be('child not started');
      done();
    });    
  });

  it('should error if no server listening on the specified host and port', function(done) {
    this.timeout(5000);
    var browserStackTunnel = new BrowserStackTunnel({
      key: CONFIG.key,
      hosts: [{
        name: HOST_NAME,
        port: INVALID_PORT,
        sslFlag: SSL_FLAG
      }]
    });
    browserStackTunnel.start(function(error) {
      expect(error.message).to.contain('child failed to start');
      expect(error.message).to.contain('No one listening on ' + HOST_NAME + ':' + INVALID_PORT);
      done();
    });
  });

  it('should error if started when already running', function(done) {
    this.timeout(5000);
    var browserStackTunnel = new BrowserStackTunnel({
      key: CONFIG.key,
      hosts: [{
        name: HOST_NAME,
        port: PORT,
        sslFlag: SSL_FLAG
      }]
    });
    browserStackTunnel.start(function(error) {
      if (error) {
        expect().fail('Error encountered starting the tunnel:\n' + error);
      }
      browserStackTunnel.start(function(error) {
        expect(error.message).to.be('child already started');
        browserStackTunnel.stop(function(error) {
          if (error) {
            expect().fail('Error encountered stopping the tunnel:\n' + error);
          }
          done();
        });
      });
    });
  });
  
  after(function(done) {
    server.close(done);
  });
});