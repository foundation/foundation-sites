var { red } = require('kleur');

module.exports = function(err) {
  console.log(
    red(
      err.fileName +
      (
          err.loc ?
          '(' + err.loc.line + ',' + err.loc.column + '): ' :
          ': '
      )
    ) +
    'error Babel: ' + err.message + '\n' +
    err.codeFrame
  );
}
