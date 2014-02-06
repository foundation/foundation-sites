/**
 * Handlebars Helpers Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


/**
 * Accepts two objects (a,b) and returning 1 if a >= b otherwise -1.
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function compareFn(val) {
  val = val || function (a, b) {
    if (a.index >= b.index) {
      return 1;
    } else {
      return -1;
    }
  };
}

module.exports = exports = compareFn;
