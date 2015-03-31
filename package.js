Package.describe({
  name: 'zurb:foundation',
  summary: 'The most advanced responsive front-end framework in the world.',
  version: '6.0.0-alpha',
  git: 'https://github.com/zurb/foundation.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.0');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/foundation.css',
    'dist/css/foundation.js'
  ], 'client');
});