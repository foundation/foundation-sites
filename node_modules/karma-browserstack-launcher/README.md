# karma-browserstack-launcher

> Use any browser on [BrowserStack](http://www.browserstack.com/)!


## Installation

The easiest way is to keep `karma-browserstack-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-browserstack-launcher": "~0.1"
  }
}
```

You can also add it by this command:
```bash
npm install karma-browserstack-launcher --save-dev
```


## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    // global config of your BrowserStack account
    browserStack: {
      username: 'jamesbond',
      accessKey: '007'
    },

    // define browsers
    customLaunchers: {
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '21.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },
      bs_iphone5: {
        base: 'BrowserStack',
        device: 'iPhone 5',
        os: 'ios',
        os_version: '6.0'
      }
    },

    browsers: ['bs_firefox_mac', 'bs_iphone5']
  });
};
```

### Global options
- `username` your BS username (email), you can also use `BROWSER_STACK_USERNAME` env variable.
- `accessKey` your BS access key (password), you can also use `BROWSER_STACK_ACCESS_KEY` env variable.
- `startTunnel` do you wanna establish the BrowserStack tunnel ? (defaults to `true`)


### Per browser options
- `device` name of the device
- `browser` name of the browser
- `browser_version` version of the browser
- `os` which platform ?
- `os_version` version of the platform


For an example project of, check out Karma's [e2e test](https://github.com/karma-runner/karma/tree/master/test/e2e/browserstack).


----

For more information on Karma see the [homepage](http://karma-runner.github.io).
