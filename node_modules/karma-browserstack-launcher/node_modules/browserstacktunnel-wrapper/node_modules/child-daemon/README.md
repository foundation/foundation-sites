node-ChildDaemon
=========

Start and stop child daemon processes without cutting them loose

## Features

- should start and stop child daemon processes
- should error if an invalid child is specified
- should error if stopped before started
- should error if started when already running
- should work with processes that buffer output when there is no tty
- should support windows and *nix systems

## Installation

```
npm install child-daemon
```

## API

```javascript
var ChildDaemon = require('child-daemon');

var childDaemon = new ChildDaemon(
  command, // command
  args, // argument array
  new RegExp(regexString) // regular expression which when matched to ouput from stdout or stderr will indicate that the daemon has started and is ready 
);

childDaemon.start(function(error, matched) {
  if (error) {
    // Daemon failed to start, or exited before the regular expression was matched
    console.log(error);
  } else {
    // Daemon started, the matched parameter will be the returned array from the matched regular expression

    childDaemon.stop(function(error) {
      if (error) {
        // Daemon failed to stop (perhaps the daemon is no longer running)
        console.log(error)
      } else {
        // Daemon was stopped
      }
    });
  }
});
```

## Roadmap

- nothing yet

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using ``./grunt.sh`` or ``.\grunt.bat``.

## License
Copyright (c) 2012 Peter Halliday  
Licensed under the MIT license.