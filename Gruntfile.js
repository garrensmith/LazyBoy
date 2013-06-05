module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['specsV2/**/*.js', 'Gruntfile.js', 'lib/index.js'],
      options: {
        scripturl: true,
        evil: true,
        sub: true
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'should',
          timeout: 800
        },
        src: ['specsV2/**/*.js']
      },
    },

    watch: {
      scripts: {
        files: ['lib/**/*.js', 'specsv2/**/*.js'],
        tasks: ['test'],
      }
    },


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochaTest']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);

};
