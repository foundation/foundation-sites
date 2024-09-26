var path = require('path');
var sassTrue = require('sass-true');
var sass = require('sass-embedded');

// Test Files
var breakpointFile = path.join(__dirname, '_breakpoint.scss');
var colorFile = path.join(__dirname, '_color.scss');
var selectorFile = path.join(__dirname, '_selector.scss');
var unitFile = path.join(__dirname, '_unit.scss');
var valueFile = path.join(__dirname, '_value.scss');
var componentsFile = path.join(__dirname, '_components.scss');

// Run Tests
sassTrue.runSass({describe, it, sass }, breakpointFile);
sassTrue.runSass({describe, it, sass }, colorFile);
sassTrue.runSass({describe, it, sass }, selectorFile);
sassTrue.runSass({describe, it, sass }, unitFile);
sassTrue.runSass({describe, it, sass }, valueFile);
sassTrue.runSass({describe, it, sass }, componentsFile);