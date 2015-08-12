var fs = require('fs');
var path = require('path');
var format = require('string-template');

var outputFolder = path.join(process.cwd(), 'dist/data');
var outputPath = path.join(process.cwd(), 'dist/data/search.json');

module.exports = function(data, cb) {
  var tree = [];
  var sortOrder = ['page', 'component', 'sass variable', 'sass mixin', 'sass function', 'js class', 'js function', 'js event'];

  for (var i in data) {
    var item = data[i];
    var link = path.relative('docs/pages', item.fileName).replace('md', 'html');

    // Pages
    tree.push({
      type: (item.sass || item.js) ? 'component' : 'page',
      name: item.title,
      description: item.description,
      link: link
    });

    if (item.sass) {
      var sassItems = [].concat(item.sass.variable || [], item.sass.mixin || [], item.sass.function || []);

      for (var j in sassItems) {
        var name = sassItems[j].context.name;
        var type = sassItems[j].context.type;
        var description = sassItems[j].description.replace('\n', '');

        if (type === 'variable') name = '$' + name;
        if (type === 'mixin' || type === 'function') name = name + '()';

        tree.push({
          name: name,
          type: 'sass ' + type,
          description: description,
          link: link
        });
      }
    }

    if (item.js) {
      var jsItems = [].concat(item.js.class || [], item.js.function || [], item.js.event || []);

      for (var k in jsItems) {
        var name = jsItems[k].name;
        var type = jsItems[k].kind;
        var description = jsItems[k].description.replace('\n', '');

        if (type === 'class') name = 'Foundation.' + name;
        if (type === 'function') {
          name = jsItems[k].meta.code.name.replace('prototype.', '') + '()';
        }

        tree.push({
          type: 'js ' + type,
          name: name,
          description: description,
          link: link
        });
      }
    }
  }

  tree = tree.sort(function(a, b) {
    return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
  });

  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder)
  fs.writeFile(outputPath, JSON.stringify(tree, null, '  '), cb);
}