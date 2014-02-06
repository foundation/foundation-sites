# sort-object [![NPM version](https://badge.fury.io/js/frep.png)](http://badge.fury.io/js/sort-object)

> Sort the keys in an object


## Quickstart

```bash
npm i sort-object --save
```

```js
var sort = require('sort-object');
var outOfOrder = {
  'foo': 1,
  'baz': 2,
  'bar': 3
};
console.log('before: ', outOfOrder);


var inOrder = sort(outOfOrder);
console.log('inOrder: ', inOrder);
console.log('after: ', outOfOrder);
```

## Run the tests


```bash
npm i mocha -g
```

then run:

```bash
mocha
```


## Author

+ [github/doowb](https://github/doowb)


## License
Copyright (c) 2013 Brian Woodward
Licensed under the [MIT license](LICENSE-MIT).

***

Project created by [Assemble](https://github.com/assemble).

