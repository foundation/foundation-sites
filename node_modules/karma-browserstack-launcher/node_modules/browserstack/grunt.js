module.exports = function( grunt ) {

grunt.initConfig({
	lint: {
		files: [ "grunt.js", "lib/*.js" ]
	}
});

grunt.registerTask( "default", "lint" );

};
