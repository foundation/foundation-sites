# grunt-sass [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-sass.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-sass)

[Grunt][grunt] tasks to compile SCSS to CSS using [node-sass](https://github.com/andrew/node-sass)

*Requires grunt 0.4. Use version 0.2.5 for grunt 0.3 compatibility.*


## Overview

This task uses the experimental and superfast Node.js based Sass compiler [node-sass](https://github.com/andrew/node-sass) (which only compiles .scss files).

*Note that node-sass is currently under heavy development and might be unstable, there are also some stuff missing, like a compression option. Check out [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) (based on Ruby Sass) if you want something stable that also supports the old syntax, but in turn much slower.*


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install --save-dev grunt-sass
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](https://github.com/sindresorhus/grunt-sass/blob/master/Gruntfile.js) in this repo for a full example.


### Options

#### includePaths

Type: `Array`  
Default: `[]`

Import paths to include.


#### outputStyle

Type: `String`  
Default: `nested`

Specify the CSS output style. Available styles are 'nested', 'expanded', 'compact', 'compressed'.

*According to the [node-sass](https://github.com/andrew/node-sass) documentation, there is currently a problem with lib-sass so this option is best avoided for the time being.*


### Example config

```javascript
grunt.initConfig({
	sass: {									// Task
		dist: {								// Target
			files: {						// Dictionary of files
				'main.css': 'main.scss'		// 'destination': 'source'
			}
		},
		dev: {								// Another target
			options: {						// Dictionary of render options
				includePaths: [
					'path/to/imports/'
				]
			},
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-sass');
grunt.registerTask('default', ['sass']);
```


### Example usage


#### Compile

```javascript
grunt.initConfig({
	sass: {
		dist: {
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});
```


#### Compile with render options

If you specify `options`, they will be passed along to the [node-sass](https://github.com/andrew/node-sass) `render` method.

```javascript
grunt.initConfig({
	sass: {
		dist: {
			options: {
				includePaths: ['imports/are/here/'],
				outputStyle: 'nested'
			},
			files: {
				'main.css': 'main.scss'
			}
		}
	}
});
```


#### Compile multiple files

You can also compile multiple files into multiple destinations.

```javascript
grunt.initConfig({
	sass: {
		files: {
			'main.css': 'main.scss',
			'widgets.css': 'widgets.sass'
		}
	}
});
```


## Breaking changes

### 0.6.0

You can no longer use an array as src to concat multiple files. Use Sass `@import` instead.


## License

MIT License • © [Sindre Sorhus](http://sindresorhus.com)
