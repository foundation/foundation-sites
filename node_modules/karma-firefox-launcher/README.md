# karma-firefox-launcher

> Launcher for Mozilla Firefox.

## Installation

The easiest way is to keep `karma-firefox-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-firefox-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-firefox-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Firefox'],
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers Firefox,Chrome
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
