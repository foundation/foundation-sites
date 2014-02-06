/**
 * Get extension
 *
 * Assemble <http://assemble.io>
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var path = require('path');

module.exports = function(str) {
  if (path.extname(str)) {str = path.extname(str);}
  if (str[0] === ".") {str = str.substring(1);}
  return str;
};