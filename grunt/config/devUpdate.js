module.exports = {
       main: {
           options: {
               updateType: 'report', //just report outdated packages
               reportUpdated: false, //don't report up-to-date packages
               semver: true, //stay within semver when updating
               packages: {
                   devDependencies: true, //only check for devDependencies
                   dependencies: false
               },
               packageJson: null, //use matchdep default findup to locate package.json
               reportOnlyPkgs: [] //use updateType action on all packages
           }
       }
   }
