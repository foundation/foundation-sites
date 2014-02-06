/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var runCount = 0;

var before = function(params, next) {
  runCount++;
  params.assemble.options.pages.forEach(function (page) {
    page.data.title = 'BEFORE TITLE ' + runCount;
  });
  next();
};

// export options
before.options = {
  stage: 'render:pre:pages'
};

module.exports = before;
