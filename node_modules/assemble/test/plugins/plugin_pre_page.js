/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


var plugin = function(params, next) {
  params.context.page.page = "W00T!!!";
  next();
};

// export options
plugin.options = {
  stage: 'render:pre:page'
};

module.exports = plugin;
