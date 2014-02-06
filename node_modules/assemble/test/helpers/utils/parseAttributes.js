/**
 * parseAttributes
 * @param  {[type]} hash [description]
 * @return {[type]}      [description]
 */
module.exports = function(hash) {
  return Object.keys(hash).map(function(key) {
    return "" + key + "=\"" + hash[key] + "\"";
  }).join(' ');
};
