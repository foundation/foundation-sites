var empty = require('is-empty-object');
var unique = require('array-uniq');

/**
 * Creates an array of file paths that can be passed to `gulp.src()`.
 * @param {Object} config - Customizer configuration file.
 * @param {String[]} modules - Modules to include in the file list.
 * @returns {String[]} Array of file paths.
 */
module.exports = function(config, modules) {
  var files = ['core'];
  var utils = ['mediaQuery'];
  var libraries = [];

  if (empty(modules)) {
    modules = Object.keys(config);
  }

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

  // Prune duplicate entries from the list of utility files
  utils = unique(utils).map(function(name) {
    return 'util.' + name;
  });

  // Combine foundation.core.js, utilities, and plugins into one array
  files = files.concat(utils, libraries);

  // Format the modules as paths
  return files.map(function(file) {
    return 'js/foundation.' + file + '.js';
  });
}
