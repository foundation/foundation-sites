var yaml = require('js-yaml');
var fs = require('fs');

// Get document, or throw exception on error
//var doc = require('./example.yml');
// pass the string
fs.readFile('example.yml', 'utf8', function (err, data) {
  if (err) {
    // handle error
    return;
  }

  try {
    yaml.loadAll(data, function (doc) {
      console.log(doc.toString());
    });
  } catch(e) {
    console.log(e);
  }
});

//console.log(doc);

