'use strict';
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile SCSS to CSS', function () {
		var options = this.options({
			includePaths: [],
			outputStyle: 'nested'
		});

		grunt.util.async.forEachSeries(this.files, function (el, next) {
			sass.render({
				file: el.src[0],
				success: function (css) {
					grunt.file.write(el.dest, css);
					next();
				},
				error: function (err) {
					grunt.warn(err);
				},
				includePaths: options.includePaths,
				outputStyle: options.outputStyle
			});
		}, this.async());
	});
};
