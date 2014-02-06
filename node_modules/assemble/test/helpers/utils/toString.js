/**
 * toString
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
module.exports = function(val) {
  /*jshint eqnull: true */

  if (val == null) {
    return "";
  } else {
    return val.toString();
  }
};