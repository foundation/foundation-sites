/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var bar = function(msg) {
  return '<!-- foo -->\n<!-- ' + msg + ' -->';
};

module.exports.bar = bar;
