var path = require('path');
var sassTrue = require('sass-true');

// Test file
var sassFile = path.join(__dirname, 'test.scss');

// Run tests
sassTrue.runSass({file: sassFile}, describe, it);
