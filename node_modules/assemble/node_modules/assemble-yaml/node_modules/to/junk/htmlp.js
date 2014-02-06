var $ = require('jquery');
var http = require('http');

var options = {
    host: 'jquery.com',
    port: 80,
    path: '/'
};

var html = '';
http.get(options, function(res) {
    res.on('data', function(data) {
        // collect the data chunks to the variable named "html"
        html += data;
    }).on('end', function() {
        // the whole of webpage data has been collected. parsing time!
      //console.log(html);
      $ = $(html);
console.log($('body').toHTML);
      //console.log($(html).toHTML);
      //var title = $(html).find('title').text();
      //console.log(title);
    });
});

