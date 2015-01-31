var map = require('vinyl-map');

module.exports = function() {
  return map(function(code, filename) {
    code = code.toString();
    var pattern = new RegExp('/\\*doc.*?\\*/', 'gm');
    console.log(pattern);
    code = code.replace(pattern, '');
    return code;
  });
}
