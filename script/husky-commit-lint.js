const { yellow, red } = require('kleur');
const spawn = require('child_process').spawn

const args = process.argv.splice(process.execArgv.length + 2);

console.log(yellow('🐶  Checking the commit message...'))

const child = spawn('commitlint', args, { shell: true })

child.stdout.on('data', function (data) {
  process.stdout.write(data)
})

child.on('error', function (err) {
  console.log(red(err))
})

child.on('exit', function (code) {
  if(code !== 0){
    console.log(yellow('🐶  ✗ Commit message is invalid.'))
    console.log(yellow('     See https://git.io/contribute for help'))
    process.exit(code);
  }
})
