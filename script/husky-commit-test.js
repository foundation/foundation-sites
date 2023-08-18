const { yellow, red } = require('kleur');
const spawn = require('child_process').spawn

console.log(yellow('🐶  Checking tests before committing...'))

const child = spawn('yarn test', [], { shell: true })

child.stdout.on('data', function (data) {
  process.stdout.write(data)
})

child.on('error', function (err) {
  console.log(red(err))
})

child.on('exit', function (code) {
  if(code === 0){
    console.log(yellow('🐶  ✓ Tests run well, we can commit...'))
  } else {
    console.log(yellow('🐶  ✗ Tests are failing, please fix them before committing.'))
    process.exit(code);
  }
})
