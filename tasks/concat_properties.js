/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
    'use strict';


    grunt.registerMultiTask('concatProperties', 'Concat JavaScript models methods or attributes from many files', function () {

        var getPropertiesGroups = require('./lib/reader.js')(grunt),
            writeFiles = require('./lib/writer.js')(grunt),
            defaultOptions = {
                indentation: '     ',
                base: '',
                sourceProcessor: null,
                initFiles: [
                    '**/init.js',
                    '!init.js'
                ]
            },
            options = this.options(defaultOptions);

        this.files.forEach(function (file) {

            writeFiles(
                file.dest,
                getPropertiesGroups(file.src, options),
                options);
        });

    });
};
