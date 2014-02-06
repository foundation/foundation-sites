/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var runCount = 0;

var after = function(params, next) {
  runCount++;
  params.assemble.options.pages.forEach(function (page) {
    params.grunt.file.write(page.dest, 'AFTER OVERWRITE ' + runCount);
  });
  next();
};

// export options
after.options = {
  stage: 'render:post:pages'
};

module.exports = after;
