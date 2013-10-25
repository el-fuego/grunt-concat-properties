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
        propertiesUtils = require('./properties_utils.js'),
        patterns = require('./patterns.js'),
        paths = require('./paths.js'),
        options;

    /**
     * Get groups from init files:
     * {
     * initFIlePath: {
     *      objectName: 'objectName',
     *      pattern:    /objectName/i,
     *      inlineProperties:    [],
     *      prototypeProperties: []
     *   }
     * }
     * @param src [{String}]
     * @returns [{Object}]
     */
    function getPropertiesGroupsData(src) {
        var groups = [],
            objectName;

        // intersection for restoring paths sequence
        grunt.util._.intersection(src, grunt.file.expand(options.initFiles)).forEach(function (path) {

            objectName = paths.getObjectNameByInitFile(path.replace(
                new RegExp('^' + utils.toRegExpText(options.base.replace(/^\.\//, ''))),
                ''
            ).replace(/^\/+/, ''));

            grunt.verbose.ok(objectName);

            groups.push({
                objectName:          objectName,
                initFilePath:        path,
                pattern:             new RegExp('^' + utils.toRegExpText(objectName) + (objectName ? '\\.' : ''), 'i'),
                inlineProperties:    [],
                prototypeProperties: []
            });
        });

        return groups;
    }


    /**
     * Add property data to their properties group
     * @param sourceData {String}
     * @param propertiesGroups [{Object}]
     * @param filePath {String}
     * @returns {Object}
     */
    function addProperty(sourceData, propertiesGroups, filePath) {

        var group = propertiesUtils.getGroup(sourceData[2], propertiesGroups),
            propertyName,
            data,
            propertyDefinitionWithoutObjectName;

        if (!group) {
            grunt.log.error('Object ' + sourceData[2] + ' without init file');
            return;
        }

        grunt.verbose.ok(sourceData[2]);

        // generate property data
        propertyDefinitionWithoutObjectName = sourceData[2].replace(group.pattern, '').replace(/^\./, '');
        propertyName = propertyDefinitionWithoutObjectName.replace(/^prototype\./i, '');
        data = {
            name:     propertyName,
            source:   sourceData[3].replace(/(^[\r\n\s]+|[\r\n\s;]+$)/g, ''),
            comment:  sourceData[1] || '',
            type:     propertiesUtils.isFunction(sourceData[3]) ? 'function' : 'object',
            isPublic: propertiesUtils.isPublic(propertyName),
            isFromPrototype: propertiesUtils.isFromPrototype(propertyDefinitionWithoutObjectName),
            filePath: filePath
        };

        // add property data to prototype or inline array
        group[(data.isFromPrototype ? 'prototypeProperties' : 'inlineProperties')].push(data);
    }


    /**
     * Add JSON properties values to their properties group
     * @param jsonData {String}
     * @param propertiesGroups [{Object}]
     * @param filePath {String}
     * @param currentNamesPath {String}
     * @returns {Object}
     */
    function addJSONProperties(jsonData, propertiesGroups, filePath, currentNamesPath) {

        var i,
            group,
            propertyDefinition,
            propertyDefinitionWithoutObjectName,
            propertyName,
            data;

        if (currentNamesPath === undefined) {
            currentNamesPath = '';
        }

        // get all values
        for (i in jsonData) {

            // add to group if is a simply object
            if (jsonData[i] instanceof Array || jsonData[i] == null || typeof jsonData[i] !== 'object' || grunt.util._.isEmpty(jsonData[i])) {

                // find group
                propertyDefinition = (currentNamesPath ? currentNamesPath + '.' + i : i)
                    .replace(/^[^.]+\./, '');
                group = propertiesUtils.getGroup(propertyDefinition, propertiesGroups);

                if (!group) {
                    grunt.log.error('Object ' + propertyDefinition + ' without init file');
                    return;
                }

                grunt.verbose.ok(propertyDefinition);

                // generate property data
                propertyDefinitionWithoutObjectName = propertyDefinition
                    .replace(group.pattern, '')
                    .replace(/^\./, '');
                propertyName = propertyDefinitionWithoutObjectName
                    .replace(/^prototype\./i, '');

                data = {
                    name:     propertyName,
                    comment:  '',

                    type:     'object',
                    isPublic: propertiesUtils.isPublic(propertyName),
                    isFromPrototype: propertiesUtils.isFromPrototype(propertyDefinitionWithoutObjectName),
                    filePath: filePath
                };


                // string -> "string"
                // true   -> true
                switch (typeof jsonData[i]) {
                case 'object':
                    if (jsonData[i] != null) {
                        data.source = JSON.stringify(jsonData[i]);
                    }
                    break;
                case 'string':
                    data.source = '"' + jsonData[i].split('"').join('\\"') + '"';
                    break;
                }
                if (data.source === undefined) {
                    data.source = '' + jsonData[i];
                }

                // add property data to prototype or inline array
                group[(data.isFromPrototype ? 'prototypeProperties' : 'inlineProperties')].push(data);
            } else {
                // is object
                // add attributeName to path and try to add
                addJSONProperties(jsonData[i], propertiesGroups, filePath, currentNamesPath ? currentNamesPath + '.' + i : i);
            }
        }
    }


    /**
     * Read methods from src files
     * @param src
     * @param currentOptions
     * @returns {{}}
     */
    return function (src, currentOptions) {
        options = currentOptions;

        var propertiesGroups = getPropertiesGroupsData(src),
            sourceData,
            text;

        grunt.util._.difference(src, grunt.file.expand(options.initFiles)).forEach(function (filePath) {

            var jsonData;

            // add properties from JSON|YAML
            if ((/\.json/i).test(filePath)) {
                jsonData = grunt.file.readJSON(filePath);
                addJSONProperties(jsonData, propertiesGroups, filePath);
                return;
            }
            if ((/\.ya?ml/i).test(filePath)) {
                jsonData = grunt.file.readYAML(filePath);
                addJSONProperties(jsonData, propertiesGroups, filePath);
                return;
            }

            // find each property at each JS file
            text = grunt.file.read(filePath, {encoding: 'utf8'});
            while ((sourceData = patterns.propertiesPattern.exec(text))) {

                // remove only current property text
                text = text.replace(patterns.propertiesPattern, '$4');

                addProperty(sourceData, propertiesGroups, filePath);
            }
        });

        return propertiesGroups;
    };
};
