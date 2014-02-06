
var sass = require('../sass'),
    colors = require('colors'),
    fs = require('fs');

var cwd = process.cwd();

function render(options, emitter) {

  sass.render({
    file: options.inFile,
    includePaths: options.includePaths,
    outputStyle: options.outputStyle,
    sourceComments: options.sourceComments,
    success: function(css) {

      emitter.emit('warn', 'Rendering Complete, saving .css file...'.green);

      fs.writeFile(options.outFile, css, function(err) {
        if (err) return emitter.emit('error', ('Error: ' + err).red);
        emitter.emit('warn', ('Wrote CSS to ' + options.outFile).green);
        emitter.emit('write', err, options.outFile, css);
        if (options.stdout) {
          emitter.emit('log', css);
        }
        emitter.emit('render', css);
      });
    },
    error: function(error) {
      emitter.emit('error', error);
    }
  });
}

module.exports = render;
