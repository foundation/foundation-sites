var spawn = require('child_process').spawn;

// Only rebuild the binaries if on Mac OS or Linux, as we're assuming that
// the toolchain exists. This is here to not rebuild on windows, as that
// had issues as of https://github.com/andrew/node-sass/issues/123
if (process.platform === 'darwin' || process.platform === 'linux') {
  spawn('node-gyp', ['rebuild'], {stdio: 'inherit'});
}
