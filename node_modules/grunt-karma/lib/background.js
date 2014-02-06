var server = require('karma').server;
var data = JSON.parse(process.argv[2]);
server.start(data);