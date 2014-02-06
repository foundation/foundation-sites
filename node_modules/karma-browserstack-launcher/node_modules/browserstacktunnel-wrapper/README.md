node-BrowserStackTunnel
=========

A Node.js wrapper for the BrowserStack java tunnel client

http://www.browserstack.com/

## Features

- should start the tunnel using the default jar file included in the package
- should error if an invalid jar file is specified
- should error if stopped before started
- should error if no server listening on the specified host and port
- should error if started when already running

## Installation

```
npm install browserstacktunnel-wrapper
```

## API

```javascript
var BrowserStackTunnel = require('browserstacktunnel-wrapper');

var browserStackTunnel = new BrowserStackTunnel({
  key: YOUR_KEY,
  hosts: [{
    name: 'localhost',
    port: 8080,
    sslFlag: 0
  }]
});

browserStackTunnel.start(function(error) {
  if (error) {
    console.log(error);
  } else {
    // tunnel has started
    
    browserStackTunnel.stop(function(error) {
      if (error) {
        console.log(error);
      } else {
        // tunnel has stopped
      }
    });
  }
});
```

## Roadmap

- Nothing yet

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using ``./grunt.sh`` or ``.\grunt.bat``.

Additionally you will have to use you own BrowserStack credentials to run the tests. To set this add a config file in the location...

``test/Support/BrowserStackConfig.js``

with the following contents (substitute your own key as supplied by BrowserStack)...

```Javascript
module.exports = {
  key: YOUR_KEY
};
```

There is a template located at...

``test/Support/BrowserStackConfig.example.js``

## License
Copyright (c) 2012 Peter Halliday  
Licensed under the MIT license.