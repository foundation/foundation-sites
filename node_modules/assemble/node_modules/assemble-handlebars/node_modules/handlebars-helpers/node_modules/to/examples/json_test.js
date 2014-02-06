/**
 * Very simple json test
 */
var to = require('..');

// load the json
var jsondoc = to.load(__dirname + '/sample.json');

// lets print it on the screen - internal format
console.log('internal js objects');
console.log('======================');
console.log(to.stringify(jsondoc));

// lets print it as json
console.log('json output');
console.log('================');
console.log(to.format.json.stringify(jsondoc));
