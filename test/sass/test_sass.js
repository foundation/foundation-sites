var path = require('path');
var sassTrue = require('sass-true');

// Test Files
var unitFile = path.join(__dirname, '_unit.scss');

// Run Tests
sassTrue.runSass({file: unitFile}, describe, it);