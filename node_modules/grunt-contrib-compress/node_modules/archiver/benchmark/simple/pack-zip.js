var fs = require('fs');

var mkdir = require('mkdirp');
var streamBench = require('stream-bench');

var archiver = require('../../lib/archiver');
var common = require('../common');

var binaryBuffer = common.binaryBuffer;

var BITS_IN_BYTE = 1024;
var BITS_IN_MBYTE = BITS_IN_BYTE * 1024;

var file = false;
var level = 1;

if (process.argv[2]) {
  if (isNaN(parseInt(process.argv[2], 10))) {
    file = process.argv[2];

    if (process.argv[3]) {
      level = parseInt(process.argv[3], 10);

      if (level > 9) {
        level = 1;
      }
    }
  } else {
    level = parseInt(process.argv[2], 10);
  }
}

var archive = archiver('zip', {
  zlib: {
    level: level
  }
});

if (file === false) {
  mkdir.sync('tmp');

  file = 'tmp/20mb.dat';
  fs.writeFileSync(file, binaryBuffer(BITS_IN_MBYTE * 20));
}

console.log('zlib level: ' + level);

archive
  .addFile(fs.createReadStream(file), { name: 'large file' })
  .finalize();

var bench = streamBench({
  logReport: true,
  interval: 500,
  dump: true
});

archive.pipe(bench);