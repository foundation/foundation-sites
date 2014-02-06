/**
 * Handlebars Helpers Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


/**
 * [eachProperty description]
 * @param  {[type]} context [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.eachProperty = function(context, options) {
  var ret = "";
  for (var prop in context) {
    ret = ret + options.fn({
      property: prop,
      value: context[prop]
    });
  }
  return ret;
};
