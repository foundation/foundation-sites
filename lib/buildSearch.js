// This function builds a search result library out of a map of components created by Supercollider, the documentation generator.

var format = require('string-template');
var fs     = require('fs');
var path   = require('path');
var escape = require('./escape');

// Path to write the search terms file to
var outputFolder = path.join(process.cwd(), '_build/data');
var outputPath = path.join(outputFolder, 'search.json');

// Links to old Foundation versions
var oldFoundations = {
  '2': '2.2.1',
  '3': '3.2.5',
  '4': '4.3.2',
  '5': '5.5.3'
}

// Search results are pre-sorted by type
// The important thing is that pages and components are shown first, because that's what people search for most often
var sortOrder = ['page', 'component', 'sass variable', 'sass mixin', 'sass function', 'js class', 'js function', 'js plugin option', 'js event'];

module.exports = buildSearch;

// Builds a JSON object of search results out of a list of components and writes it to a file.
// @param {Object} data - Supercollider-generated object of components to use.
// @param {Function} cb - Callback to run when finished writing to disk.
function buildSearch(data, cb) {
  var tree = [];

  // Add results for old Foundation documentation
  for (var i in oldFoundations) {
    // lol
    var index = (i > 3) ? '/index.html' : '/';

    tree.push({
      type: 'page',
      name: 'Foundation ' + i,
      description: 'Documentation for Foundation  v' + oldFoundations[i],
      link: 'http://foundation.zurb.com/sites/docs/v/' + oldFoundations[i] + index,
      tags: ['old', 'previous']
    })
  }

  // Each item in "data" is a page or component
  for (var i in data) {
    var item = data[i];
    var link = path.relative('docs/pages', item.fileName).replace('md', 'html');
    var type = 'page';

    if (item.sass || item.js) {
      type = 'component';
    }
    if (item.library) {
      type = 'library';
    }

    // Add the page itself as a search result
    tree.push({
      type: type,
      name: item.title,
      description: item.description,
      link: link,
      tags: item.tags || []
    });

    // Add Sass variables, mixins, and functions as search results
    if (item.sass) {
      var sassItems = [].concat(item.sass.variable || [], item.sass.mixin || [], item.sass.function || []);

      for (var j in sassItems) {
        var name = sassItems[j].context.name;
        var type = sassItems[j].context.type;
        var description = sassItems[j].description.replace('\n', '');
        var hash = '#';

        if (type === 'variable') {
          name = '$' + name;
          hash += 'sass-variables';
        }

        if (type === 'mixin' || type === 'function') {
          hash += escape(name);
          name = name + '()';
        }

        tree.push({
          name: name,
          type: 'sass ' + type,
          description: description,
          link: link + hash
        });
      }
    }

    // Add JavaScript classes, functions, events, and plugin options as search results
    if (item.js) {
      var jsItems = [].concat(item.js.class || [], item.js.function || [], item.js.event || [], item.js.member || []);

      for (var k in jsItems) {
        var name = jsItems[k].name;
        var type = jsItems[k].kind;
        var description = jsItems[k].description.replace('\n', '');
        var hash = '#js-' + type.replace('plugin ', '') + 's';

        if (type === 'class') {
          name = 'Foundation.' + name;
          hash = hash.slice(0, -1)
        }

        if (type === 'member') {
          type = 'plugin option'
        }

        if (type === 'function') {
          name = jsItems[k].meta.code.name.replace('prototype.', '');
          hash = '#' + name.split('.')[1];
          name += '()';
        }

        tree.push({
          type: 'js ' + type,
          name: name,
          description: description,
          link: link + hash
        });
      }
    }
  }

  // Re-order search results to show pages and components first, then Sass/JS items
  tree = tree.sort(function(a, b) {
    return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
  });

  // Write the search file to disk
  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder)
  fs.writeFile(outputPath, JSON.stringify(tree, null, '  '), cb);
}
