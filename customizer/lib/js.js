var unique = require('array-uniq');

module.exports = function(config, modules) {
  var files = ['core'];
  var utils = [];
  var libraries = [];

  for (var i in modules) {
    var name = modules[i];

    // Check if the module has JS files
    if (config[name] && config[name].js) {
      libraries.push(config[name].js);

      // Check if the module has dependencies
      if (config[name].js_utils) {
        utils = utils.concat(config[name].js_utils);
      }
    }
  }

  utils = unique(utils);
  files = files.concat(utils, libraries);

  return files.map(function(file) {
    return 'js/foundation.' + file + '.js';
  });
}
