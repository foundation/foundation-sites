#Node-watch
A [fs.watch](http://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener) wrapper to watch files or directories(recursively by default).  


### Installation

```bash
npm install node-watch
```

### Example

```js
var watch = require('node-watch');

watch('somedir_or_somefile', function(filename) {
  console.log(filename, ' changed.');
});
``` 

### Why fs.watch wrapper

* Some editors will generate temporary files which will cause the callback function to be triggered multiple times.
* when watching a single file the callback function will only be triggered one time and then is seem to be unwatched.
* Missing an option to watch a directory recursively.
 
 
### The difference
This module **currently** does not differentiate event like `rename` or `delete`. Once there is a change, the callback function will be triggered.


### Options

`recursive`:Watch it recursively or not (defaults to **true**). 

`followSymLinks`: Follow symbolic links or not (defaults to **false**).

`maxSymLevel`: The max number of following symbolic links, in order to prevent circular links (defaults to **1**). 


```js
watch('somedir', { recursive: false, followSymLinks: true }, function(filename) {
  console.log(filename, ' changed.');
});
```

###FAQ

#### 1. How to watch mutiple files or directories

```js
watch(['file1', 'file2'], function(file) {
  //
});
```

#### 2. How to filter files

Write your own filter function as a higher-order function. For example:

```js
var filter = function(pattern, fn) {
  return function(filename) {
    if (pattern.test(filename)) {
      fn(filename);
    }
  }
}

// only watch for js files
watch('mydir', filter(/\.js$/, function(filename) {
  // 
}));
```
