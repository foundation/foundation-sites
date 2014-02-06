// var util = require('util');
// var sass = require('../sass');
// var fs = require('fs');
// 
// var bigScssStr = fs.readFileSync(require('path').resolve(__dirname,'large_test.scss'));
// var numTestCases = 1000;
// var numCompiled = 0;
// console.log(util.inspect(process.memoryUsage()));
// for (var i = 0; i < numTestCases; i++) {
//     sass.render({
//         data: bigScssStr,
//         success: function() {
//             numCompiled++;
//             if (numCompiled === numTestCases) {
//                 console.log(util.inspect(process.memoryUsage()));
//             }
//         }
//     });
// }
