/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


var options = {
  stage: 'render:post:page'
};

/**
 * postprocess
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function (params, callback) {
  'use strict';

  var grunt = params.grunt;

  grunt.verbose.subhead('Running:'.bold, '"assemble-contrib-postprocess"');
  grunt.verbose.writeln('Stage:  '.bold, '"render:post:page"\n');

  var content = params.content;
  var p = params.assemble.options.postprocess;

  function postprocess(src, fn) {return fn(src);}
  var processFn = function(src) {return src;};

  params.content = postprocess(content, p || processFn);
  callback();
};

module.exports.options = options;