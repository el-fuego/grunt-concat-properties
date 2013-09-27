/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */

module.exports = {

    // (AppName/**/ObjectName)/fileName
    objectNameFromPathPattern: /((?:[^\/]+\/?)+)\/[^\/]+$/,

    /**
     * Get object name from init file path
     * @param path {string} f.e. "a/B/init.js"
     * @returns {string} f.e. "a.B"
     */
    getObjectNameByInitFile: function (path) {
        return this.objectNameFromPathPattern.exec(path)[1].replace(/[\\\/]+/g, '.');
    }
};
