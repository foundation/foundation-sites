# has-color [![Build Status](https://secure.travis-ci.org/sindresorhus/has-color.png?branch=master)](http://travis-ci.org/sindresorhus/has-color)

> Detect whether a terminal supports color.

Used in the terminal color module [chalk](https://github.com/sindresorhus/chalk).


## Install

Install with [npm](https://npmjs.org/package/has-color): `npm install --save has-color`


## Example

```js
var hasColor = require('has-color');

if (hasColor) {
	console.log('Terminal supports color.');
}
```

It obeys the CLI flags `--color` and `--no-color`.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
