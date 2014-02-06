# node-browserstack

A node.js JavaScript client for working with [BrowserStack](http://browserstack.com) through its [API](https://github.com/browserstack/api).

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).

## Installation

```
npm install browserstack
```

## Usage

```javascript
var BrowserStack = require( "browserstack" );
var client = BrowserStack.createClient({
	username: "foo",
	password: "p455w0rd!!1"
});

client.getBrowsers(function( error, browsers ) {
	console.log( "The following browsers are available for testing" );
	console.log( browsers );
});
```

## API

*Note: The API documented here is for the latest supported version (v3). For earlier versions, please see [the wiki](https://github.com/scottgonzalez/node-browserstack/wiki/API).*

### browser objects

A common pattern in the API is a "browser object" which is just a plain object with the following properties:

* `os`: The operating system.
* `os_version`: The operating system version.
* `browser`: The browser name.
* `browser_version`: The browser version.
* `device`: The device name.

A browser object may only have one of `browser` or `device` set; which property is set will depend on `os`.

### worker objects

Worker objects are extended [browser objects](#browser-objects) which contain the following additional properties:

* `id`: The worker id.
* `status`: A string representing the current status of the worker.
  * Possible statuses: `"running"`, `"queue"`.

### BrowserStack.createClient( settings )

Creates a new client instance.

* `settings`: A hash of settings that apply to all requests for the new client.
  * `username`: The username for the BrowserStack account.
  * `password`: The password for the BrowserStack account.
  * `version` (optional; default: `3`): Which version of the BrowserStack API to use.
  * `server` (optional; default: `{ host: "api.browserstack.com", port: 80 }`): An object containing `host` and `port` to connect to a different BrowserStack API compatible service.

### client.getBrowsers( callback )

Gets the list of available browsers.

* `callback` (`function( error, browsers )`): A callback to invoke when the API call is complete.
  * `browsers`: An array of [browser objects](#browser-objects).

### client.createWorker( settings, callback )

Creates a worker.

* `settings`: A hash of settings for the worker (an extended [browser object](#browser-objects)).
  * `os`: See [browser object](#browser-objects) for details.
  * `os_version`: See [browser object](#browser-objects) for details.
  * `browser`: See [browser object](#browser-objects) for details.
  * `browser_version`: See [browser object](#browser-objects) for details.
  * `device`: See [browser object](#browser-objects) for details.
  * `url` (optional): Which URL to navigate to upon creation.
  * `timeout` (optional): Maximum life of the worker (in seconds). Use 0 for "forever" (BrowserStack will kill the worker after 1,800 seconds).
* `callback` (`function( error, worker )`): A callback to invoke when the API call is complete.
  * `worker` A [worker object](#worker-objects).

*Note: A special value of `"latest"` is supported for `browser_version`, which will use the latest stable version.*

### client.getWorker( id, callback )

Gets the status of a worker.

* `id`: The id of the worker.
* `callback` (`function( error, worker )`): A callback to invoke when the API call is complete.
  * `worker`: A [worker object](#worker-objects).

### client.terminateWorker( id, callback )

Terminates an active worker.

* `id`: The id of the worker to terminate.
* `callback` (`function( error, data )`): A callback to invoke when the API call is complete.
  * `data`: An object with a `time` property indicating how long the worker was alive.

### client.getWorkers( callback )

Gets the status of all workers.

* `callback` (`function( error, workers )`): A callback to invoke when the API call is complete.
  * `workers`: An array of [worker objects](#worker-objects).

### client.takeScreenshot( id, callback )

Take a screenshot at current state of worker.

* `callback` (`function( error, data )`): A callback to invoke when the API call is complete.
  * `data`: An object with a `url` property having the public url for the screenshot.

### client.getLatest( browser, callback )

Gets the latest version of a browser.

* `browser`: Which browser to get the latest version for. See [browser object](#browser-objects) for details.
* `callback` (`function( error, version )`): A callback to invoke when the version is determined.
  * `version`: The latest version of the browser.

*Note: Since mobile devices do not have version numbers, there is no latest version.*

### client.getLatest( callback )

Gets the latest version of all browsers.

* `callback` (`function( error, versions )`): A callback to invoke when the versions are determined.
  * `versions`: A hash of browser names and versions.

### client.getApiStatus( callback )

* `callback` (`function( error, status )`): A callback to invoke when the status is determined.
  * `used_time`: Time used so far this month, in seconds.
  * `total_available_time`: Total available time, in seconds. Paid plans have unlimited API time and will receive the string `"Unlimited Testing Time"` instead of a number.
  * `running_sessions`: Number of running sessions.
  * `sessions_limit`: Number of allowable concurrent sessions.

## License

Copyright 2013 Scott González. Released under the terms of the MIT license.

---

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).
