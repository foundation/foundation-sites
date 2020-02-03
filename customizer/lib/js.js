const empty = require('is-empty-object');
const path = require('path');

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
  const dir = path.resolve(__dirname, '../../js/');
  var entry = "import $ from 'jquery';\n" +
              "import { Foundation } from '" + dir + "/foundation.core';\n" +
              "Foundation.addToJquery($);\n" +
              "import { MediaQuery } from '" + dir + "/foundation.util.mediaQuery';\n" +
              "Foundation.MediaQuery = MediaQuery;\n" +
              "import { Triggers } from '" + dir + "/foundation.util.triggers';\n" +
              "Triggers.init($, Foundation);\n";

  // last 2 pieces work around https://github.com/foundation/foundation-sites/issues/10287

  const libraries = [];

  if (empty(modules)) {
    modules = Object.keys(config);
  }

  for (let i in modules) {
    let name = modules[i];

    // Check if the module has JS files
    if (config[name] && config[name].js) {
      libraries.push(config[name].js);
    }
  }

  // add plugins into entry
  for (let i in libraries) {
    let file = libraries[i];
    let moduleName = MODULES[file] || file.charAt(0).toUpperCase() + file.slice(1);
    entry = entry + "import { " + moduleName + " } from '" + dir + "/foundation." + file + "';\n";
    entry = entry + "Foundation.plugin(" + moduleName + ", '" + moduleName + "');\n";
  }

  // return entry file as string
  return entry;
}
