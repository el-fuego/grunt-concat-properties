/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
    'use strict';

    var getPropertiesGroups = require('reader.js'),
        writeFiles = require('writer.js'),
        defaultOptions = {
            indentation: '     ',
            sourceProcessor: null,
            initFiles: [
                '**/init.js',
                '!init.js'
            ],
            src:  [
                '{**/,}*.js',
                '!{**/,}init.js'
            ],
            dest: 'build/properties.js'
        };


    grunt.registerTask('concatProperties', function (optionsSection) {

        var i,
            options = grunt.config('concatProperties.' + optionsSection),
            properties = getPropertiesGroups(options);

        for (i in defaultOptions) {
            if (!options[i]) {
                options[i] = defaultOptions[i];
            }
        }

        writeFiles(properties, options);
    });
};
