var empty = require('is-empty-object');
var unique = require('array-uniq');
var path = require('path');

// custom module names where needed
const MODULES = {
  'offcanvas': 'OffCanvas'
};

/**
 * Creates an array of file paths that can be passed to `gulp.src()`.
 * @param {Object} config - Customizer configuration file.
 * @param {String[]} modules - Modules to include in the file list.
 * @returns {String[]} Array of file paths.
 */

module.exports = function(config, modules) {
  var dir = path.resolve(__dirname, '../../js/');
  var entry = "import $ from 'jquery';\n" +
              "import { Foundation } from '" + dir + "/foundation.core';\n" +
              "Foundation.addToJQuery($);\n";

  var libraries = [];

  if (empty(modules)) {
    modules = Object.keys(config);
  }

  for (var i in modules) {
    var name = modules[i];

    // Check if the module has JS files
    if (config[name] && config[name].js) {
      libraries.push(config[name].js);
    }
  }

  // add plugins into entry
  for (var i in libraries) {
    var file = libraries[i];
    var moduleName = MODULES[file] || file.charAt(0).toUpperCase() + file.slice(1);
    entry = entry + "import { " + moduleName + " } from '" + dir + "/foundation." + file + "';\n";
    entry = entry + "Foundation.plugin(" + moduleName + ", '" + moduleName + "');\n";
  }

  // return entry file as string
  return entry;
}
