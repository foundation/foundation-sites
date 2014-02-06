/**
 * Very simple json to json sample
 */
var to = require('..');

// load the json 
var jsondoc = to.format.json.load(__dirname + '/sample.json');

console.log('json doc');
console.log('==============');
console.log(to.format.json.stringify(jsondoc));

// lets print it as yaml
console.log('yaml doc');
console.log('==============');
console.log(to.format.yaml.stringify(jsondoc));
