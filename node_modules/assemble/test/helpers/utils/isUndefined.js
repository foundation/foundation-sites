/**
 * isUndefined
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
module.exports = function (value) {
  /*jshint eqnull: true */
  return value === 'undefined' || Utils.toString.call(value) === '[object Function]' || (value.hash != null);
};