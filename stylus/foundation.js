
/**
 * Library version.
 */
exports.version = require('../package.json').version;

/**
 * Stylus path.
 */

exports.path = __dirname;

/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */

function plugin() {
  return function(style){
    style.include(__dirname);
    style.use(require('stylus-type-utils')());
  };
}

exports = module.exports = plugin;
