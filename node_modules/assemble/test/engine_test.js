/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var assembleEngine  = require('../lib/engine');
var expect          = require('chai').expect;

var pluginParams = {
  grunt: require('grunt')
};



describe('Loading default handlebars engine', function() {

  it('loads handlebars engine', function(done) {
    var engine = assembleEngine.load('handlebars');
    done();
  });

  it('compiles a handlebars template', function(done) {
    var engine = assembleEngine.load('handlebars');
    var template;
    engine.compile('{{foo}}', null, function(err, tmpl) {
      if(err) {
        console.log('error: ' + err);
        done(false);
      }
      template = tmpl;
      done();
    });
  });

  it('renders a template', function(done) {
    var engine = assembleEngine.load('handlebars');
    var expected = 'bar';
    engine.compile('{{baz}}', null, function(err, tmpl) {
      if(err) {
        console.log('error: ' + err);
        done(false);
      }
      engine.render(tmpl, {baz: 'bar'}, function(err, content) {
        if(err) {
          console.log('error: ' + err);
          done(false);
        }
        expect(content).to.equal(expected);
        done();
      });
    });
  });

  describe('Loading custom helpers', function() {

    var runTest = function(engine, done) {
      var expected = '<!-- foo -->\n<!-- bar -->';
      engine.compile("{{{bar 'bar'}}}", null, function(err, tmpl) {
        if(err) {
          console.log('error: ' + err);
          done(false);
        }
        engine.render(tmpl, {}, function(err, content) {
          if(err) {
            console.log('error: ' + err);
            done(false);
          }
          expect(content).to.equal(expected);
          done();
        });
      });
    };

    it('loads a custom helper from a file path', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({
        cwd: __dirname,
        helpers: './helpers/helpers.js'
      }, pluginParams);
      runTest(engine, done);
    });

    it('loads a custom helper from a glob pattern', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({
        cwd: __dirname,
        helpers: './helpers/helpers/*.js'
      }, pluginParams);
      runTest(engine, done);
    });

    it('loads a custom helper without needing to set the cwd', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({helpers: './test/helpers/*.js'}, pluginParams);
      var expected = '<!-- bar -->';
      engine.compile("{{{foo 'bar'}}}", null, function(err, tmpl) {
        if(err) {
          console.log('error: ' + err);
          done(false);
        }
        engine.render(tmpl, {}, function(err, content) {
          if(err) {
            console.log('error: ' + err);
            done(false);
          }
          expect(content).to.equal(expected);
          done();
        });
      });
    });

  });
});
