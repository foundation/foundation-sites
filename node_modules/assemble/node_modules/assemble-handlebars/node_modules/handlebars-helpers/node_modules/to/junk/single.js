var inspect = require('util').inspect,
    jsyaml = require('js-yaml'),
    doc;

try {
  doc = require(__dirname + '/app.yml');
  console.log(inspect(doc, false, 10, true));
} catch (e) {
  console.log(e.stack || e.toString());
}

