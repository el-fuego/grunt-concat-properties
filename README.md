# grunt-concat-properties

> Grunt plugin for concating JavaScript models methods from many files

### Usage Examples

```js
concatProperties: {
    js: {
        indentation: '     ',
        sourceProcessor: function () {} || null
        initFiles: [
            '**/init.js',
            '!init.js'
        ],
        src:  [
            '{**/,}*.js',
            '!{**/,}init.js'
        ],
        dest: 'build/properties.js'
    }
};