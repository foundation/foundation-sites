# karma-ie-launcher

> Launcher for Internet Explorer.

## Installation

The easiest way is to keep `karma-ie-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-ie-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-ie-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['IE']
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers IE
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
