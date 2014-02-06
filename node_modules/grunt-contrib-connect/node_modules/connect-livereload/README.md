connect-livereload
==================
connect middleware for adding the livereload script to the response.
no browser plugin is needed.
if you are happy with a browser plugin, then you don't need this middleware.

[![Build Status](https://travis-ci.org/intesso/connect-livereload.png)](https://travis-ci.org/intesso/connect-livereload)

install
=======
```bash
npm install connect-livereload --save-dev
```

use
===
this middleware can be used with a LiveReload server e.g. [grunt-reload](https://github.com/webxl/grunt-reload).

In your connect or express application add this after the static and before the dynamic routes:
```javascript
  var liveReloadPort = 35729;
  var excludeList = ['.woff', '.flv'];
  
  app.use(require('connect-livereload')({
    port: liveReloadPort,
    excludeList: excludeList
  }));
```

please see the [examples](https://github.com/intesso/connect-livereload/tree/master/examples) for the app and Grunt configuration.

	
###note 
if you add this middleware before the static middleware, it will lead to problems. 
If you can't avoid that for some reason, you have to add all of the static file extensions to the `excludeList: ['.css', '.js', '.ico', '.png', 'ect...']`

alternative
===========
An alternative would be to install the [LiveReload browser plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).


credits
=======
* The middleware code is mainly extracted from: [grunt-contrib-livereload/util.js](https://github.com/gruntjs/grunt-contrib-livereload/blob/master/lib/utils.js)
* [LiveReload Creator](http://livereload.com/)

tests
=====
run the tests with 
```
mocha
```

license
=======
[MIT License](https://github.com/intesso/connect-livereload/blob/master/LICENSE)
