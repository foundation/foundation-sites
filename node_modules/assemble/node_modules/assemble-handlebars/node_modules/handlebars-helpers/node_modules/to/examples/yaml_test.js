/**
 * Very simple yaml test
 */
var to = require('..');

// load the yaml 
var yamldoc = to.format.yaml.load(__dirname + '/sample.yml');

// lets print it on the screen - internal format
console.log('internal js objects');
console.log('======================');
console.log(to.stringify(yamldoc));

// lets print it as yaml
console.log('yaml output');
console.log('================');
console.log(to.format.yaml.stringify(yamldoc));
