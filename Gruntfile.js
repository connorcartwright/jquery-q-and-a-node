module.exports = function(grunt) {
   'use strict';

   require('time-grunt')(grunt);
   require('jit-grunt')(grunt, {
      scsslint: 'grunt-scss-lint'
   });

   var config = {
      src: './',
      dist: 'dist'
   };

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      config: config,

      uglify: {
         options: {
            // The banner is inserted at the top of the output
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
         },
         dist: {
            files: {
               '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
         }
      },

      // Sass: {
      //     dist: {
      //         files: {
      //             'css/style.css' : 'css/style.scss'
      //         }
      //     }
      // },
      //
      // Scsslint: {
      //     allFiles: [
      //         'css/**/*.scss',
      //     ],
      //     options: {
      //         config: './config/.scss-lint.yml',
      //         colorizeOutput: true
      //     },
      // },

      jscs: {
         options: {
            config: './config/.jscsrc',
            fix: true
         },
         src: [
             '<%= config.src %>/**/*.js'
         ]
      },

      jshint: {
         options: {
            jshintrc: './config/.jshintrc',
            reporter: require('jshint-stylish')
         },
         src: [
             '<%= config.src %>/**/*.js',
             'Gruntfile.js'
         ]
      },

      watch: {
         js: {
            files: ['./**/*.js'],
            tasks: ['concurrent:lint']
         },
         css: {
            files: ['css/**/*.scss'],
            tasks: ['scsslint', 'sass']
         }
      },

      concurrent: {
         lint: ['jshint', 'jscs']
      }
   });

   grunt.registerTask('default', ['concurrent']);
   grunt.registerTask('dev', ['concurrent', 'watch']);
};