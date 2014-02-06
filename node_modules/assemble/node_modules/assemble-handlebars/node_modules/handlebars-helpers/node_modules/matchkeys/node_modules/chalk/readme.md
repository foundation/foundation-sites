# chalk [![Build Status](https://secure.travis-ci.org/sindresorhus/chalk.png?branch=master)](http://travis-ci.org/sindresorhus/chalk)

> Terminal string styling done right.

[colors.js](https://github.com/Marak/colors.js) is currently the most popular string styling module, but it has serious deficiencies like extending String.prototype which causes all kinds of problems. Although there are other ones, they either do too much or not enough.

**Chalk is a clean and focused alternative.**

![screenshot](screenshot.png)


## Why

- **Doesn't extend String.prototype**
- Expressive API
- Clean and focused
- Auto-detects color support
- Actively maintained


## Install

Install with [npm](https://npmjs.org/package/chalk): `npm install --save chalk`


## Example

Chalk comes with an easy to use composable API where you just chain the styles you want.

```js
var chalk = require('chalk');

// style a string
console.log(chalk.blue('Hello world!'));

// combine styled and normal strings
console.log(chalk.blue('Hello') + 'World' + chalk.red('!'));

// compose multiple styles using the chainable API
console.log(chalk.blue.bgRed.bold('Hello world!'));

// nest styles
chalk.red('Hello' + chalk.underline.bgBlue('world') + '!');
```

You can easily define your own themes.

```js
var chalk = require('chalk');
var error = chalk.bold.red;
console.log(error('Error!'));
```


## API

### chalk.\<style>\[.\<style>...](string)

Chain [styles](#styles) and call the last one as a method with a string argument.


### chalk.enabled

Color support is automatically detected, but you can override it.

### chalk.supportsColor

Detect whether the terminal [supports color](https://github.com/sindresorhus/has-color).

Can be overridden by the user with the flags `--color` and `--no-color`.

Used internally and handled for you, but exposed for convenience.

### chalk.styles

Exposes the styles as [ANSI escape codes](https://github.com/sindresorhus/ansi-styles).

```js
var chalk = require('chalk');

console.log(chalk.styles.red);
//=> ['\x1b[31m', '\x1b[39m']

console.log(chalk.styles.red[0] + 'Hello' + chalk.styles.red[1]);
// first item is the style escape code and second is the reset escape code
```

### chalk.stripColor(string)

Strip color from a string.


## Styles

### General

- reset
- bold
- italic
- underline
- inverse
- strikethrough

### Text colors

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray

### Background colors

- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite


## License

MIT License • © [Sindre Sorhus](http://sindresorhus.com)
