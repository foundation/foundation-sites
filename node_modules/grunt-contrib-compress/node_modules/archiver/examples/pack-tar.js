var fs = require('fs');

var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/example-output.tar');
var archive = archiver('tar');

output.on('close', function() {
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

var file1 = __dirname + '/fixtures/file1.txt';
var file2 = __dirname + '/fixtures/file2.txt';

archive
  .append(fs.createReadStream(file1), { name: 'file1.txt' })
  .append(fs.createReadStream(file2), { name: 'file2.txt' });

archive.finalize(function(err, bytes) {
  if (err) {
    throw err;
  }

  console.log(bytes + ' total bytes');
});