module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/app/**/*.js']
        },
        watch: {
            build: {
                files: ['src/**/*.js','src/**/*.css', 'src/**/*.html', 'src/**/*.json'],
                tasks: ['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin', 'remove'],
                options: {
                    spawn: false
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    report: 'gzip',
                    cwd: 'build/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            css: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css', 'src/assets/css/style.css'],
                dest: 'build/assets/css/main.css'
            },
            app:{
                src:['bower_components/jquery-2.1.4.min/index.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'src/assets/js/shared.js'],
                dest:'build/app.js'
            }
        },
        uglify: {
            app:{
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeIgnored: true,
                    removeEmptyAttributes: true,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'src/index.html'
                }
            },
            views: {
                files: [{
                    expand: true,
                    cwd: 'src/app/views',
                    src: '**/*.html',
                    dest: 'build/app/views'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/.htaccess'], dest: 'build/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'build/assets/fonts/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/assets/img/infographics/*'], dest: 'build/assets/img/infographics/', filter: 'isFile'}
                ]
            }
        },
        clean:{
            build: {
                src:['build/']
            }
        },
        imagemin: {
            options: {                       // Target options
                optimizationLevel: 5
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif,ico}', '!src/assets/img/infographics/*'],
                    dest: 'build'
                }]
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                duration: 3
            }
        },
        remove: {
            clean: {
                trace: true,
                fileList: ['build/app.js', 'build/assets/css/main.css']
            }
        }
    });
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', function () {
        grunt.task.run(['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin', 'remove']);
    });
    grunt.registerTask('default', ['watch']);
};
