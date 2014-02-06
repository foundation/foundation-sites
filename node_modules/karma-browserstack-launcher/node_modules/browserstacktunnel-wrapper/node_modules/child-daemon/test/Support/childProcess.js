var http = require('http');
var port = process.argv[2];
var server = http.createServer(function(request, response) {
  response.end();
});
server.listen(port, function() {
  console.log('Listening on port ' + port);
});
