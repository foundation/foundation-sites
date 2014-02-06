# karma-safari-launcher

> Launcher for Safari.

## Installation

The easiest way is to keep `karma-safari-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-safari-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-safari-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Safari']
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers Safari
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
