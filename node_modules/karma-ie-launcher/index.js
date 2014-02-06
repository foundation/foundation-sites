var IEBrowser = function(baseBrowserDecorator) {
  baseBrowserDecorator(this);
};

IEBrowser.prototype = {
  name: 'IE',
  DEFAULT_CMD: {
    win32: process.env.ProgramFiles + '\\Internet Explorer\\iexplore.exe'
  },
  ENV_CMD: 'IE_BIN'
};

IEBrowser.$inject = ['baseBrowserDecorator'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:IE': ['type', IEBrowser]
};
