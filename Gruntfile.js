/*
 * grunt-concat-properties
 * https://github.com/denis/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */


module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            project: [
                'Gruntfile.js',
                'tasks/{**/,}*.js',
                'test/*.js',
                'test/App/{**/,}*.js',
                'test/SingleView/{**/,}*.js',
                '<%= nodeunit.tests %>',
                '!test/App/build/{**/,}*.js',
                '!test/SingleView/build/{**/,}*.js'
            ],
            appTest: {
                src: 'test/App/build/properties.js'
            },
            singleViewTest: {
                src: 'test/SingleView/build/properties.js'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            appTest: ['test/App/build/*'],
            singleViewTest: ['test/SingleView/build/*']
        },

        // Configuration to be run (and then tested).
        concatProperties: {
            appTest:      {
                options: {
                    base: 'test/App/',
                    initFiles: [
                        'test/App/**/init.js',
                        '!test/App/init.js'
                    ]
                },

                src:  [
                    'test/App/models/{**/,}*.js',
                    'test/App/View/{**/,}*.js'
                ],
                dest: 'test/App/build/properties.js'
            },
            singleViewTest:      {
                options: {
                    base: 'test/SingleView/',
                    initFiles: [
                        'test/SingleView/init.js'
                    ]
                },

                src:  [
                    'test/SingleView/{**/,}*.js',
                    '!test/SingleView/build/{**/,}*'
                ],
                dest: 'test/SingleView/build/properties.js'
            }
        },

        jsbeautifier: {
            files: [
                "test/App/build/properties.js",
                "test/SingleView/build/properties.js"
            ],
            options: {
                js: {
                    braceStyle:              "collapse",
                    breakChainedMethods:     false,
                    e4x:                     false,
                    evalCode:                false,
                    indentChar:              " ",
                    indentLevel:             0,
                    indentSize:              4,
                    indentWithTabs:          false,
                    jslintHappy:             true,
                    keepArrayIndentation:    false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines:     10,
                    preserveNewlines:        true,
                    spaceBeforeConditional:  true,
                    spaceInParen:            false,
                    unescapeStrings:         false,
                    wrapLineLength:          0
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');


    grunt.registerTask('buildAndValidateApp', [
        'clean:appTest',
        'concatProperties:appTest',
        'jsbeautifier',
        'jshint:appTest'
    ]);
    grunt.registerTask('buildAndValidateSingleView', [
        'clean:singleViewTest',
        'concatProperties:singleViewTest',
        'jsbeautifier',
        'jshint:singleViewTest'
    ]);

    grunt.registerTask('test', [
        'buildAndValidateApp',
        'buildAndValidateSingleView',
        'nodeunit'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint:project', 'test']);

};
