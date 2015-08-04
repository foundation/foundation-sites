var fs = require('fs');
var path = require('path');

var outputFolder = path.join(process.cwd(), 'dist/data');
var outputPath = path.join(process.cwd(), 'dist/data/search.json');

module.exports = function(data, cb) {
  var tree = [];

  for (var i in data) {
    var item = data[i];

    // Pages
    tree.push({
      type: 'page',
      name: item.title,
      description: item.description
    });

    if (item.sass) {
      var sassItems = [].concat(item.sass.variable || [], item.sass.mixin || [], item.sass.function || []);

      for (var j in sassItems) {
        var type = sassItems[j].context.type;
        var name = sassItems[j].context.name;
        var description = sassItems[j].description.replace('\n', '');

        if (type === 'variable') name = '$' + name;
        if (type === 'mixin' || type === 'function') name = name + '()';

        tree.push({
          type: 'sass.' + type,
          name: name,
          description: description
        });
      }
    }
  }

  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder)
  fs.writeFile(outputPath, JSON.stringify(tree, null, '  '), cb);
}