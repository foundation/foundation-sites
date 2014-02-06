var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initRequireJs = function(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(__dirname + '/require.js'));
};

initRequireJs.$inject = ['config.files'];

module.exports = {
  'framework:requirejs': ['factory', initRequireJs]
};
