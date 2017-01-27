var properties = require('./js/properties.js');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    // grunt.loadNpmTasks('grunt-pngmin');

    var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        properties: properties,
        project: {
            src: 'js',
            js: '<%= project.src %>/{,*/}*.js',
            dest: 'js',
            bundle: 'build/js/app.min.js',
            port: properties.port,
            banner:
                '/*\n' +
                ' * <%= properties.title %>\n' +
                ' * <%= pkg.description %>\n' +
                ' *\n' +
                ' * @author <%= pkg.author %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' * @copyright <%= pkg.author %>\n' +
                ' * @license <%= pkg.license %> licensed\n' +
                ' *\n' +
                ' * Made using Phaser JS Boilerplate <https://github.com/lukewilde/phaser-js-boilerplate>\n' +
                ' */\n'
        },

        connect: {
            dev: {
                options: {
                    port: '<%= project.port %>',
                    base: './'
                }
            }
        },

        jshint: {
            files: [
                'gruntfile.js',
                '<%= project.js %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            options: {
                livereload: productionBuild ? false : properties.liveReloadPort
            },
            js: {
                files: '<%= project.dest %>/**/*.js',
                tasks: ['jade']
            },
            jade: {
                files: 'templates/*.jade',
                tasks: ['jade']
            },
            stylus: {
                files: 'style/*.styl',
                tasks: ['stylus']
            }
        },

        browserify: {
            app: {
                src: ['<%= project.src %>/app.js'],
                dest: '<%= project.bundle %>',
                options: {
                    transform: [
                        ['babelify', {
                            loose: 'all'
                        }]
                    ],
                    watch: true,
                    browserifyOptions: {
                        debug: !productionBuild
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= project.port %>'
            }
        },

        cacheBust: {
            options: {
                assets: ['audio/**', 'images/**', 'maps/**', 'js/**', 'style/**'],
                baseDir: './build/',
                deleteOriginals: true,
                length: 5
            },
            files: {
                src: ['./build/js/app.min.*', './index.html']
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        properties: properties,
                        productionBuild: productionBuild
                    }
                },
                files: {
                    'index.html': ['templates/index.jade']
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    'build/css/index.css': ['style/index.styl']
                },
                options: {
                    sourcemaps: !productionBuild
                }
            }
        },

        clean: ['./build/', './index.html'],

/*
        pngmin: {
            options: {
                ext: '.png',
                force: true
            },
            compile: {
                files: [
                    { src: 'images/*.png', dest: 'images/' }
                ]
            }
        },
*/

        copy: {
            libs: {
                files: [
                    { src: ['lib/nine-patch-phaser-plugin.min.js'], dest: 'build/js/nine-patch-phaser-plugin.min.js' },
                    { src: ['lib/phaser-arcade-slopes.min.js'], dest: 'build/js/phaser-arcade-slopes.min.js' },
                    { src: ['lib/stats.min.js'], dest: 'build/js/stats.min.js' }
                ]
            },
            phaserArcade: {
                files: [
                    { src: ['node_modules/phaser/build/custom/phaser-arcade-physics.js'], dest: 'build/js/phaser.js' }
                ]
            },
            phaserArcadeMin: {
                files: [
                    { src: ['node_modules/phaser/build/custom/phaser-arcade-physics.min.js'], dest: 'build/js/phaser.js' }
                ]
            },
            phaserNinja: {
                files: [
                    { src: ['node_modules/phaser/build/custom/phaser-ninja-physics.js'], dest: 'build/js/phaser.js' }
                ]
            },
            phaserNinjaMin: {
                files: [
                    { src: ['node_modules/phaser/build/custom/phaser-ninja-physics.min.js'], dest: 'build/js/phaser.js' }
                ]
            },
            phaserP2: {
                files: [
                    { src: ['node_modules/phaser/build/phaser.js'], dest: 'build/js/phaser.js' }
                ]
            },
            phaserP2Min: {
                files: [
                    { src: ['node_modules/phaser/build/phaser.min.js'], dest: 'build/js/phaser.js' }
                ]
            }
        },

        uglify: {
            options: {
                banner: '<%= project.banner %>'
            },
            dist: {
                files: {
                    '<%= project.bundle %>': '<%= project.bundle %>'
                }
            }
        },

        compress: {
            options: {
                archive: '<%= pkg.name %>.zip'
            },
            zip: {
                files: [
                    { expand: true, cwd: '/', src: ['**/*'], dest: '<%= pkg.name %>/' }
                ]
            },
            cocoon: {
                files: [
                    { expand: true, cwd: '/', src: ['**/*'] }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'browserify',
        'jade',
        'stylus',
        'copy:phaserArcade',
        'copy:libs',
        'connect',
        'open',
        'watch'
    ]);

    grunt.registerTask('build', [
        /* 'jshint', */
        'clean',
        'browserify',
        'jade',
        'stylus',
        'uglify',
        'copy:phaserArcadeMin',
        'copy:libs',
        /* 'cacheBust', */
        'connect',
        'open',
        'watch'
    ]);

    // grunt.registerTask('optimise', ['pngmin', 'copy:images']);
    grunt.registerTask('cocoon', ['compress:cocoon']);
    grunt.registerTask('zip', ['compress:zip']);
};
