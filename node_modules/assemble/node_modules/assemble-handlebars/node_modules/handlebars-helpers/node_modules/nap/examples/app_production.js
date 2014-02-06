// 
// Typical express setup
// 

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// 
// Nap configuration
// 

global.nap = require(process.cwd() + '../../lib');

nap({
  mode: 'production',
  assets: {
    js: {
      alerts: [
        '/scripts/one.js', 
        '/scripts/two.js', 
        '/scripts/**/**.coffee'
      ]
    },
    css: {
      all: [
        '/stylesheets/text.styl',
        '/stylesheets/bg.css'
      ]
    },
    jst: {
      templates: [
        '/templates/**/*.jade'
      ]
    }
  }
});
nap.package()