function arrayClear(array) {
  return array.filter(function (v) { return !!v });
}

// Convert an external config object for UMD modules
// See: https://webpack.js.org/configuration/externals/#object
module.exports.umdExternals = function(externals, options) {
  options = Object.assign({ namespace: '' }, options);

  return Object.keys(externals).reduce(function(obj, k) {
    obj[k] = {
      root: arrayClear([options.namespace, externals[k]]),
      amd: k,
      commonjs: k,
      commonjs2: k,
    };
    return obj;
  }, {});
};

