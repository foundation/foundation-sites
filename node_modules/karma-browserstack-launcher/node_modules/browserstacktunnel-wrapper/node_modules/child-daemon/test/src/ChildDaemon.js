var expect = require('expect.js'),
    ChildDaemon = require('../../'),
    fork = require('child_process').fork,
    http = require('http');

var PORT = 8080;

describe('ChildDaemon', function() {
  it('should start and stop child daemon processes', function(done) {
    var childDaemon = new ChildDaemon(
      'node',
      ['./test/Support/childProcess.js', PORT],
      new RegExp('Listening on port ([0-9]+)')
    );
    childDaemon.start(function(error, matched) {
      if (error) {
        expect().fail('Error encountered starting child:\n' + error);
      } else {
        expect(matched[1]).to.eql(PORT);
        http.get('http://localhost:' + PORT, function(response) {
          expect(response.statusCode).to.equal(200);
          response.on('end', function() {
            childDaemon.stop(function(error) {
              if (error) {
                expect().fail('Error encountered stopping child:\n' + error);
              } else {
                http.get('http://localhost:' + PORT, function(response) {
                  expect().fail('should not get a response after child has been stopped:\n' + response);
                }).on('error', function(error) {
                  // child http server should have been stopped
                  done();
                });
              }
            });
          });
          response.resume();
        }).on('error', function(error) {
          expect().fail('Error encountered communicating with child:\n' + error);
        });
      }
    });
  });
  
  it('should error if an invalid child is specified', function(done) {
    var childDaemon = new ChildDaemon(
      'blahblahblah',
      ['./test/Support/childProcess.js', PORT],
      new RegExp('Listening on port ([0-9]+)')
    );
    childDaemon.start(function(error, matched) {
      expect(error.message).to.contain('child failed to start');
      expect(matched).to.not.be.ok();
      done();
    });
  });

  it('should error if stopped before started', function(done) {
    var childDaemon = new ChildDaemon(
      'node',
      ['./test/Support/childProcess.js', PORT],
      new RegExp('Listening on port ([0-9]+)')
    );
    childDaemon.stop(function(error) {
      expect(error.message).to.be('child not started');
      done();
    });    
  });

  it('should error if started when already running', function(done) {
    var childDaemon = new ChildDaemon(
      'node',
      ['./test/Support/childProcess.js', PORT],
      new RegExp('Listening on port ([0-9]+)')
    );
    childDaemon.start(function(error, matched) {
      if (error) {
        expect().fail('Error encountered starting child:\n' + error);
      } else {
        expect(matched[1]).to.eql(PORT);
        childDaemon.start(function(error, matched) {
          expect(error.message).to.be('child already started');
          expect(matched).to.not.be.ok();
          childDaemon.stop(function(error) {
            if (error) {
              expect().fail('Error encountered stopping child:\n' + error);
            }
            done();
          });
        });
      }
    });
  });

  it.skip('should work with processes that buffer output when no tty', function(done) {
    // TODO: i know some programs that do this (eg. ruby) but not sure
    // how to integrate the test. For now i am leaving this with the knowledge
    // that the use of pty.js fixes the problem (it is only a problem on *.nix
    // systems afaik) and I have tested it outside of these tests - at the moment i do
    // not want to make the tests dependent on other programs though
    done();
  });
});