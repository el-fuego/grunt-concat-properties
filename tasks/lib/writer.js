/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
    'use strict';

    var utils = require('./utils.js'),
        patterns = require('./patterns.js'),
        options;


    /**
     * Add data to object at specified context
     *   obj.a.b.c = data;
     * @param contextNames [{String}] f.e. ['a', 'b', 'c'..]
     * @param data {String} data to set
     * @param obj {Object} changable
     */
    function addToJSONRecursively(contextNames, data, obj) {
        var currentContexName = contextNames.shift();

        // last name
        if (!contextNames.length) {
            obj[currentContexName] = data;
            return;
        }

        if (!obj[currentContexName]) {
            obj[currentContexName] = {};
        }

        addToJSONRecursively(contextNames, data, obj[currentContexName]);
    }

    /**
     * Concat property data to local definition as object method or attribute
     * @param property {Object}
     * @returns {string}
     */
    function propertyToString(property) {

        return property.comment +
            utils.addQuotes(property.name.split('.').pop()) +
            ': ' +
            (
                typeof options.sourceProcessor === 'function' ?
                        options.sourceProcessor(property.source, property) :
                        property.source
            );
    }

    /**
     * Concat properties object to string
     * @param obj {Object} properties as object f.e. {a: {b: '...'}}
     * @returns {String}
     */
    function stringifyJSONProperties(obj) {
        var i,
            properties = [];

        for (i in obj) {
            properties.push(
                typeof obj[i] === 'string' ?
                        obj[i] :
                        utils.addQuotes(i) + ': ' + stringifyJSONProperties(obj[i])
            );
        }

        return '{\n' + properties.join(',\n\n') + '\n}';
    }

    /**
     * Add each property data to object at specified context
     *   obj.a.b.c = data;
     *   property.name // "a.b.c"
     * @param properties {Array}
     * @returns {Object} properties as object f.e. {a: {b: '...'}}
     */
    function propertiesToJSON(properties) {

        var obj = {},
            i,
            l = properties.length;

        for (i = 0; i < l; i++) {
            addToJSONRecursively(
                properties[i].name.split('.'),
                propertyToString(properties[i]),
                obj
            );
        }

        return obj;
    }

    /**
     * Concat properties object to JSON string
     * @param properties {Array}
     * @returns {String} f.e. "{a: {b: '...'}}"
     */
    function concatProperties(properties) {
        return (
            stringifyJSONProperties(propertiesToJSON(properties))
            .replace(new RegExp('^\\{\\n' + '|\\n\\}$', 'g'), '')
        );
    }

    /**
     * Replace place pattern with concated properties
     * @param text {String}
     * @param properties {Array}
     * @param filePath {String}
     * @returns {String}
     */
    function addPropertiesToText(text, properties, filePath) {

        if (!properties.length) {
            return text;
        }

        var placeRegexp = patterns.getPlacePattern(properties[0].isFromPrototype),
            matchedData = placeRegexp.exec(text);

        // Can`t find properties place
        if (!matchedData) {
            grunt.log.error("No " + (properties[0].isFromPrototype ? "prototype" : "inline") + " properties place definition at " + filePath +
                '   (properties: ' + properties.map(function (p) {return p.name + ' at ' + p.filePath; }).join(', ') + ')');

            return text;
        }

        // don`t use .replace with "$" at replacement text
        return text.replace(placeRegexp, function () {
            return (matchedData[1] ?  matchedData[1] + ',' : '') +
                ('\n\n' + concatProperties(properties))
                    .replace(/\n(?!\r?\n)/g, '\n' + matchedData[2]);
        });
    }

    /**
     * Write properties and initializators to dest file
     * @param dest
     * @param propertiesGroups [{Object}]
     * @param currentOptions
     */
    return function (dest, propertiesGroups, currentOptions) {

        var propertiesFileText = '';

        options = currentOptions;

        // get each init file path and its objectName
        propertiesGroups.forEach(function (objectData) {

            var initFileText;

            // read init file
            initFileText = grunt.file.read(objectData.initFilePath, {encoding: 'utf8'});
            if (!initFileText) {
                grunt.log.error("File " + objectData.initFilePath + " is empty or unreadable");
                return;
            }

            // paste properties to init source
            // prototype properties
            initFileText = addPropertiesToText(
                initFileText,
                objectData.prototypeProperties,
                objectData.initFilePath
            );
            // inline properties
            initFileText = addPropertiesToText(
                initFileText,
                objectData.inlineProperties,
                objectData.initFilePath
            );
            propertiesFileText += initFileText + '\n\n';

        });
        grunt.file.write(dest, propertiesFileText);
        grunt.log.write(dest).ok();
    };
};
