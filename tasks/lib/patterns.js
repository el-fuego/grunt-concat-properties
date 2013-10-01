/*
 * grunt-concat-properties
 * https://github.com/el-fuego/grunt-concat-properties
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = {

    /**
     * Pattern for properties places search
     */
    placesPatterns: {
        'prototype': /([^\s{])?(?:\s*\n)?([\t ]*)\/\/\s*@include\s+prototypeProperties/i,
        'inline':    /([^\s{])?(?:\s*\n)?([\t ]*)\/\/\s*@include\s+properties/i
    },


    /**
     * Get prototype or inline pattern for properties places search
     * @param isFromPrototype {boolean}
     * @returns {RegExp}
     */
    getPlacePattern: function (isFromPrototype) {
        return isFromPrototype ? this.placesPatterns.prototype : this.placesPatterns.inline;
    },


    /**
     * Pattern for properties search
     * splitted for usability
     */
    propertiesPattern: new RegExp(
        // start of file or previous property definition
        '(?:\\n|^)' +
            // comment before property
            '([ \\t]*?(?:\\/\\*(?:.|\\s)*?\\*\\/|(?:\\/\\/[^\\n]*\\n)*)\\s*)?' + // $1
            // application name
            '(?:[a-z0-9_]+)\\.' +
            // property definition
            '([a-z0-9_\\.]+)\\s*=\\s*' +  // $2
            // content
            '((?:.|\\s)+?)' +  // $3
            // end of file, next property definition or comment
            '(\\n+[a-z_\\/]|\\n*$)', // $4
        'i'
    )
};
