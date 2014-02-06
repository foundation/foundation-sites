/**
 * Handlebars Helpers: {{rel}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */


// Node.js
var path   = require('path');
var fs     = require('fs');


// Export helpers
module.exports.register = function (Handlebars, options, params) {
  'use strict';

  /**
   * {{rel}}
   */
  exports.rel = function(context) {
    var newDest      = this.dest;
    var destDirname  = path.dirname(context);
    var relativePath = path.relative(path.resolve(destDirname), path.resolve(newDest));

    return relativePath.replace(/\\/g, '/');
  };

  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
