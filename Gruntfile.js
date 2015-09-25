/*
 * @name Gruntfile.js
 * @description Used to automate part of the development process
 */
module.exports = function (grunt) {
  
    // Config Grunt
    grunt.initConfig({
        // Access the basic settings in the package.json file
        pkg: grunt.file.readJSON('package.json'),
        
        /*
         * @name cssmin
         * @description Minifies the CSS files in to one file without comments
         *              and without linebreaks. The use of this is so that a developer 
         *              can heve one file to be added to their HTML file instead of 
         *              every single style sheet
         */
        cssmin: {
            options: {
              shorthandCompacting: false,
              roundingPrecision: -1,
               keepSpecialComments: 0
            },
            target: {
              files: {
                'public/stylesheets/main.min.css': ['bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
                                                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                                                    'assets/css/style.css']
              }
            }
        },
        /*
         * @name uglify
         * @description Minifies the JS files in to one file without comments
         *              and without linebreaks. The use of this is so that a developer 
         *              can heve one file to be added to their HTML file instead of 
         *              every single javascript file.
         */
        uglify: {
            my_target: {
              files: {
                'public/javascripts/main.min.js': ['bower_components/jquery/dist/jquery.js',
                                            'bower_components/jquery-ui/jquery-ui.min.js',
                                            'bower_components/bootstrap/dist/js/bootstrap.min.js',
                                            'assets/js/mystyles.js']                        
              }
            }
        },
        /*
         * @name Watch
         * @description These process can be run and will run another task if the file they
         *              are watching has been updated
         */
        watch: {
            css: {
              files: ['assets/css/style.css'],
              tasks: ['cssmin']
            },
            js: {
              files: ['assets/js/mystyles.js'],
              tasks: ['uglify']
            }
        }
    });

  // Load the plugin to be used
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Set the default tasks
  grunt.registerTask("default", ['cssmin','uglify']);
  
  // Set up the Watch tasks
  grunt.registerTask("watch-css", ['watch:css']);
  grunt.registerTask("watch-js", ['watch:js']);
};



