
/**
 * Module dependencies.
 */

var connect = require('connect')
  , sass = require('../sass');

// Setup server
// $ curl http://localhost:3000/test.css

var server = connect.createServer(
  sass.middleware({
      src: __dirname
    , dest: __dirname + '/public'
    , debug: true
    , outputStyle: 'compressed'
  }),
  connect.static(__dirname + '/public')
);

server.listen(3000);
console.log('server listening on port 3000');