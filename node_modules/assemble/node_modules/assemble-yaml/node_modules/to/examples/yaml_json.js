/**
 * Very simple yaml to json sample
 */
var to = require('..');

// load the yaml 
var yamldoc = to.format.yaml.load(__dirname + '/sample.yml');

console.log('yaml doc');
console.log('==============');
console.log(to.format.yaml.stringify(yamldoc));

// lets print it as json
console.log('json doc');
console.log('==============');
console.log(to.format.json.stringify(yamldoc));
