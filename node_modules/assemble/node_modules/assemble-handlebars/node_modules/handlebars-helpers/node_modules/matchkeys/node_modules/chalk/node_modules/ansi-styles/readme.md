# ansi-styles [![Build Status](https://secure.travis-ci.org/sindresorhus/ansi-styles.png?branch=master)](http://travis-ci.org/sindresorhus/ansi-styles)

> ANSI escape codes for colorizing strings in the terminal.

You probably want the higher-level [chalk](https://github.com/sindresorhus/chalk) module for styling your strings.

![screenshot](screenshot.png)


## Install

Install with [npm](https://npmjs.org/package/ansi-styles): `npm install --save ansi-styles`


## Example

```js
var ansi = require('ansi-styles');

console.log(ansi.green[0] + 'Hello world!' + ansi.green[1]);
```

## API

Each style is an array of a start and end escape code.


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
