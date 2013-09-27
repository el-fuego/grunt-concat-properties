/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = {

    /**
     * Is function content
     * @param dataSource {string}
     * @returns {boolean}
     */
    isFunction: function (dataSource) {
        return (/^\s*function/i).test(dataSource);
    },


    /**
     * Is property at object prototype
     * @param dataSource {string}
     * @returns {boolean}
     */
    isFromPrototype: function (name) {
        return (/^prototype\./i).test(name);
    },


    /**
     * Is property public
     * @param name {string}
     * @returns {boolean}
     */
    isPublic: function (name) {
        return !(/_[a-z_0-9]+$/i).test(name);
    },


    /**
     * Find group name matched by group regexp
     * @param propertyDefinition {string} f.e. "a.b.c" // a.b.c = function(){...}
     * @param propertiesGroups {Array}
     * @returns {String} path
     */
    getGroupName: function (propertyDefinition, propertiesGroups) {

        var path;
        for (path in propertiesGroups) {
            if (propertiesGroups[path].pattern.test(propertyDefinition)) {
                return path;
            }
        }

    },


    /**
     * Sort properties
     *   attributes at first
     *   methods to second
     * @param a
     * @param b
     * @returns {number}
     */
    propertiesSorter: function (a, b) {
        if (a.type === b.type) {
            return 0;
        }
        if (a.type === 'function') {
            return 1;
        }
        return -1;
    }
};
