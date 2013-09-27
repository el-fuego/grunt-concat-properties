/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = {

    /**
     * Convert App.Views.MainView -> app.views.mainView
     * @param objectName {String}
     * @returns {String}
     */
    toCamelCase: function (objectName) {
        return objectName.replace(/(^|\.)[A-Z]/, function (pattern) {
            return pattern.toLowerCase();
        });
    },

    /**
     * Add slashes to RegExp reserved symbols
     * @param data {String}
     * @returns {String}
     */
    toRegExpText: function (data) {
        return data.replace(/([\.\$\[\]\(\)\^\*\+\?])/g, '\\$1');
    },


    reservedMethodsNames: [
        'constructor',
        'delete',
        'float',
        'class',
        'new',
        'continue',
        'typeof',
        'prototype'
    ],

    /**
     * Add quotes if needed
     * @param name {String}
     * @returns {String}
     */
    addQuotes: function (name) {
        return this.reservedMethodsNames.indexOf(name) >= 0 ? ('"' + name + '"') : name;
    }
};
