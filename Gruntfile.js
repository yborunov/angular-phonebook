module.exports = function(grunt) {

	grunt.initConfig({

   		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				"curly": true,
	  			"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"globals": {
					"jQuery": true
				}
			}
		},

		uglify: {

			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},

			build: {
				src: 'app.js',
				dest: 'app.min.js'
			}
    	}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);
};
