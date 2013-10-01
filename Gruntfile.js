/*
 * grunt-templates-concat
 * https://github.com/denis/grunt-templates-concat
 *
 * Copyright (c) 2013 Denis Knyazevich
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
                '<%= nodeunit.tests %>'
            ],
            appTest: {
                src: 'test/App/build/properties.js'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            appTest: ['test/App/build/*']
        },

        // Configuration to be run (and then tested).
        concatProperties: {
            appTest:      {
                options: {
                    indentation: '    ',
                    base: 'test/App/',
                    initFiles: [
                        'test/App/**/init.js',
                        '!test/App/init.js'
                    ]
                },

                src:  [
                    'test/App/models/{**/,}*.js',
                    'test/App/View/{**/,}*.js',
                    '!test/App/{**/,}init.js'
                ],
                dest: 'test/App/build/properties.js'
            }
        },

        jsbeautifier: {
            files: ["test/App/build/properties.js"],
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
                    jslintHappy:             false,
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

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'concatProperties', 'jsbeautifier', 'jshint:appTest', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint:project', 'test']);

};
