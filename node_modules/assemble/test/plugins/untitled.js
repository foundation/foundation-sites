/**
 * Adds "Untitled" to any page that doesn't have a title in the page context.
 * Use `page.title` in your templates.
 * @author: https://github.com/adjohnson916,
 * https://github.com/assemble/assemble/pull/325#issuecomment-25510116
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */

var _ = require('lodash');

var untitled = function(params, callback) {
  var context = params.context;
  context.page.data = context.page.data || {};
  context.page.data.title = context.page.data.title || 'Untitled';
  _.extend(context.page, context.page.data);
  _.extend(context, context.page.data);
  callback();
};

module.exports = untitled;