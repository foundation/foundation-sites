/*
 * assemble-yaml
 * https://github.com/assemble/assemble-yaml
 *
 * Copyright (c) 2013 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


var filterProps = function (data) {
  return Object.keys(data).filter(function (key) {
    // Don't display empty arrays.
    return !(Array.isArray(data[key]) && data[key].length === 0);
  }).map(function (key) {
    var val = data[key];
    return '--' + (val === false ? 'no-' : '') + key +
      (typeof val === 'boolean' ? '' : '=' + val);
  });
};
