/**
 * Created by nicksergan on 21.07.2016.
 */

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-timer']
    });
    require('grunt-timer').init(grunt);

    var userConfig = require('./build.config.js');
    var envName = (grunt.option('env') || 'dev');
    var envConfig = grunt.file.readJSON('./env-config.' + envName + '.json');
    var modRewrite = require('connect-modrewrite');
    var cacheControls = grunt.file.readJSON('s3-cache-values.json');
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        envConfig: envConfig,
        cacheControls: cacheControls[envName] || cacheControls.dev,

        meta: {
            banner:
            '/**\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n'
        },

        clean: ['<%= build_dir %>', '<%= compile_dir %>'],

        copy: {
            build_app_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets',
                    expand: true
                }]
            },
            build_vendor_assets: {
                files: [{
                    src: [ '<%= vendor_files.assets %>' ],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]
            },
            build_vendor_fonts: {
                files: [{
                    src: [ '<%= vendor_files.fonts %>' ],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]
            },
            build_compile_vendor_assets: {
                files: [{
                    src: [ '<%= vendor_files.assets %>' ],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_compile_vendor_fonts: {
                files: [{
                    src: [ '<%= vendor_files.fonts %>' ],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_appjs: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorjs: {
                files: [{
                    src: ['<%= vendor_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorcss: {
                files: [{
                    src: ['<%= vendor_files.css %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            compile_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets',
                    expand: true
                }]
            },
            compile_fonts: {
                files: [{
                    src: [ '<%= vendor_files.fonts %>' ],
                    dest: '<%= compile_dir %>/assets/fonts',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]
            }
        },

        concat: {
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/css/<%= pkg.name %>.css'
                ],
                dest: '<%= build_dir %>/assets/css/<%= pkg.name %>.css'
            },

            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    [
                        '<%= build_dir %>/src/app/main.module.js',
                        '<%= build_dir %>/src/app/**/*.module.js',
                        '<%= build_dir %>/src/app/**/*.js'
                    ],
                    '<%= html2js.app.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>.js'
            }
        },

        ngAnnotate: {
            compile: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    cwd: '<%= build_dir %>',
                    dest: '<%= build_dir %>',
                    expand: true
                }]
            }
        },

        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        'json-minify': {
            build: {
                files: '<%= build_dir %>/assets/languages/*.json'
            }
        },

        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/css/<%= pkg.name %>.css': '<%= app_files.less %>'
                }
            },
            dest: '<%= build_dir %>/assets/css/<%= pkg.name %>.css',
            compile: {
                files: {
                    '<%= build_dir %>/assets/css/<%= pkg.name %>.css': '<%= app_files.less %>'
                },
                options: {
                    // cleancss: true,
                    compress: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 4 versions']})
                    ]
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: '<%= autoprefixer_browsers %>'
            },
            dist: {
                src: '<%= build_dir %>/assets/css/<%= pkg.name %>.css',
                dest: '<%= build_dir %>/assets/css/<%= pkg.name %>.css'
            }
        },

        jshint: {
            src: ['<%= app_files.js %>'],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                debug: true,
                expr: true,
                loopfunc: true
            },
            globals: {
                angular: true,
                $: true
            }
        },

        html2js: {
            app: {
                options: {
                    base: 'src/app',
                    htmlmin: {
                        collapseWhitespace: true,
                        removeComments: true
                    }
                },
                src: ['<%= app_files.tpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },

        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            js: {
                src: '<%= compile_dir %>/assets/<%= pkg.name %>.js'
            },
            css: {
                src: '<%= compile_dir %>/assets/css/<%= pkg.name %>.css'
            }
        },

        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/app/app.js',
                    '<%= build_dir %>/src/app/**/*.module.js',
                    '<%= build_dir %>/src/app/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= less.dest %>'
                ],
                lr: ['http://localhost:35729/livereload.js']
            },

            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= compile_dir %>/assets/*.js',
                    '<%= compile_dir %>/assets/css/*.css'
                ],
                lr: []
            }
        },

        connect: {
            all: {
                options: {
                    port: 30000,
                    base: '<%= build_dir %>',
                    // base: '<%= compile_dir %>',
                    keepalive: false,
                    open: true,
                    livereload: 35729,
                    // // HTML5 mode without hash in url
                    middleware: function(connect, options, defaultMiddleware) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]'])
                        ].concat(defaultMiddleware);
                    }
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        },

        watch: {
            options: {
                livereload: true
            },

            jssrc: {
                files: ['<%= app_files.js %>'],
                tasks: ['jshint:src', 'copy:build_appjs']
            },

            assets: {
                files: ['src/assets/**/*'],
                tasks: ['copy:build_app_assets']
            },

            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            tpls: {
                files: ['<%= app_files.tpl %>'],
                tasks: ['html2js']
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less:build']
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('addExternalUrls', [], function() {
        grunt.file.write(userConfig.build_dir + '/src/app/core/urls.js', '(function() {\n' +
            '\'use strict\';\n' +
            'angular\n' +
            '\t\t.module(\'app.core\')\n' +
            '\t\t.constant(\'URLS\', {\n' +
            '\t\t\t\tproductAPI: \'' + envConfig.product_api + '\',\n' +
            '\t\t\t\tfunctionalAPI: \'' + envConfig.functional_api + '\',\n' +
            '\t\t\t});\n' +
            '})();\n');
    });

    grunt.registerTask('connectLocal', [], function() {
        grunt.task.run('connect');
        // // proxy settings
        // grunt.task.run(['configureProxies:api', 'connect']);
    });

    grunt.registerTask('dev', [], function() {
        grunt.task.run('build', 'connectLocal', 'watch');
    });

    grunt.registerTask('dev_compile', [], function() {
        grunt.task.run('build', 'compile','connectLocal', 'watch');
    });


    grunt.registerTask('default', [], function() {
        grunt.task.run('build', 'compile');
    });


    grunt.registerTask('build', [], function() {
        grunt.task.run('clean', 'html2js', 'jshint', 'less:build',
            'autoprefixer:dist', 'copy:build_app_assets',
            'copy:build_vendor_assets',
            'copy:build_vendor_fonts',
            'copy:build_compile_vendor_assets',
            'copy:build_compile_vendor_fonts',
            'copy:build_appjs', 'copy:build_vendorjs', 'copy:build_vendorcss',
            'addExternalUrls', 'index:build');
    });

    grunt.registerTask('compile', [], function() {
        grunt.task.run(
            'less:compile',
            'concat:build_css',
            'copy:compile_assets',
            'copy:compile_fonts',
            'ngAnnotate',
            'concat:compile_js',
            'uglify',
            'json-minify:build',
            'filerev',
            'index:compile'
        );
    });

    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' +
            grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS_(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS_(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });
        var lrFile = this.data.lr;

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        lr: lrFile,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    /**
     * A utility function to get all JavaScript files.
     */
    function filterForJS_(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS files.
     */
    function filterForCSS_(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }

};

