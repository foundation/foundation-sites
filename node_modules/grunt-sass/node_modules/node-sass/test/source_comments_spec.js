/*jshint multistr:true */
var sass = require('../sass');
var assert = require('assert');

var sampleFilename = require('path').resolve(__dirname, 'sample.scss');

var scssStr = '#navbar {\
  width: 80%;\
  height: 23px; }\
  #navbar ul {\
    list-style-type: none; }\
  #navbar li {\
    float: left;\
    a {\
      font-weight: bold; }}\
  @mixin keyAnimation($name, $attr, $value) {\
    @-webkit-keyframes #{$name} {\
      0%   { #{$attr}: $value; }\
    }\
  }';

var expectedCommentsScssStr = '/* line 1, ' + sampleFilename + ' */\n\
#navbar {\n\
  width: 80%;\n\
  height: 23px; }\n\
\n\
/* line 5, ' + sampleFilename + ' */\n\
#navbar ul {\n\
  list-style-type: none; }\n\
\n\
/* line 8, ' + sampleFilename + ' */\n\
#navbar li {\n\
  float: left; }\n\
  /* line 10, ' + sampleFilename + ' */\n\
  #navbar li a {\n\
    font-weight: bold; }\n';

var expectedDebugScssStr = '@media -sass-debug-info{filename{font-family:file\:' + sampleFilename  + '}line{font-family:\\000031}}\n\
#navbar {\n\
  width: 80%;\n\
  height: 23px; }\n\
\n\
@media -sass-debug-info{filename{font-family:file\:' + sampleFilename  + '}line{font-family:\\000035}}\n\
#navbar ul {\n\
  list-style-type: none; }\n\
\n\
@media -sass-debug-info{filename{font-family:file\:' + sampleFilename  + '}line{font-family:\\000038}}\n\
#navbar li {\n\
  float: left; }\n\
  @media -sass-debug-info{filename{font-family:file\:' + sampleFilename  + '}line{font-family:\\0000310}}\n\
  #navbar li a {\n\
    font-weight: bold; }\n';


describe("compile file with source comments", function() {
  it("should compile with render and comment outputs", function(done) {
    sass.render({
      file: sampleFilename,
      source_comments: 'normal',
      success: function (css) {
        done(assert.equal(css, expectedCommentsScssStr));
      },
      error: function (error) {
        done(error);
      }
    });
  });
});
