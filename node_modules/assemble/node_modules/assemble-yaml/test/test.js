/*
 * assemble-yaml
 * https://github.com/assemble/assemble-yaml
 *
 * Copyright (c) 2013 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


/*global require:true */
var yfm = require('../lib/index');
var expect = require('chai').expect;


describe('Reading From Files', function() {

  'use strict';

  var simpleExpected = {
    context: {
      "foo": "bar"
    }
  };

  var complexExpected = {
    context: {
      "foo": "bar",
      "version": 2
    },
    originalContent: "---\nfoo: bar\nversion: 2\n---\n\n<span class=\"alert alert-info\">This is an alert</span>\n",
    content: "\n\n<span class=\"alert alert-info\">This is an alert</span>\n"
  };


  it("YAML file starts with --- no content", function(done) {
    var data = yfm.extractJSON('./test/fixtures/yaml/single.yml');
    expect(data).to.deep.equal(simpleExpected.context);
    done();
  });

  it("YAML file starts and ends with --- no content", function(done) {
    var data = yfm.extractJSON('./test/fixtures/yaml/double.yml');
    expect(data).to.deep.equal(simpleExpected.context);
    done();
  });

  it("YAML file starts and ends with --- has content", function(done) {
    var data = yfm.extract('./test/fixtures/alpha.hbs');
    expect(data.context).to.deep.equal(simpleExpected.context);
    done();
  });

  it("hbs file with complex YAML data and content", function(done) {
    var data = yfm.extract("./test/fixtures/beta.hbs");
    expect(data).to.deep.equal(complexExpected);
    done();
  });

});

describe('Reading From Strings', function() {

  var opts = { fromFile: false };

  var simple1 = "---\nfoo: bar\n";
  var simple2 = "---\nfoo: bar\n---";
  var simple3 = "---\nfoo: bar\n---\n\n<span class=\"alert alert-info\">This is an alert</span>\n";

  var simpleExpected = {
    context: {
      foo: 'bar'
    }
  };

  var complex = "---\nfoo: bar\nversion: 2\n---\n\n<span class=\"alert alert-info\">This is an alert</span>\n";

  var complexExpected = {
    context: {
      "foo": "bar",
      "version": 2
    },
    originalContent: "---\nfoo: bar\nversion: 2\n---\n\n<span class=\"alert alert-info\">This is an alert</span>\n",
    content: "\n\n<span class=\"alert alert-info\">This is an alert</span>\n"
  };

  it("YAML string starts with --- no content", function(done) {
    var data = yfm.extract(simple1, opts);
    expect(data.context).to.deep.equal(simpleExpected.context);
    done();
  });

  it("YAML string starts and ends with --- no content", function(done) {
    var data = yfm.extract(simple2, opts);
    expect(data.context).to.deep.equal(simpleExpected.context);
    done();
  });

  it("YAML string starts and ends with --- has content", function(done) {
    var data = yfm.extract(simple3, opts);
    expect(data.context).to.deep.equal(simpleExpected.context);
    done();
  });

  it("hbs string with complex YAML data and content", function(done) {
    var data = yfm.extract(complex, opts);
    expect(data).to.deep.equal(complexExpected);
    done();
  });

  it("extracts file content, with YAML front matter stripped.", function(done) {
    var data = yfm.stripYFM(complex, opts);
    expect(data).to.deep.equal(complexExpected.content);
    done();
  });

});
