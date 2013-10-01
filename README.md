# grunt-concat-properties

> Grunt plugin for concating JavaScript models methods or attributes from many files

```js
"View/init.js" 
"View/firstMethod.js"    -->    "View.js"
"View/secondMethod.js"
```


___
### Usage Example

```js
grunt.initConfig({
    concatProperties: {
        myApp: {
            src: [
                'View/{**/,}*.js'
            ],
            dest: 'build/View.js'
        }
    }
};
```

#### src
Type: `Array`
Default value: `[]`

Array of files masks for concatination. Files will be concated at specified sequence.


#### dest
Type: `String`
Default value: `''`

The destination file path


___
### How to start
<a href="https://github.com/el-fuego/grunt-concat-properties/tree/master/test/App">Sample project structure</a>


##### Instalation

```shell
npm install grunt-concat-properties --save-dev
```

##### 1 For each model, view or other object you need to create a folder with init.js file.
Example for constructor:
```js
// View/init.js
MyApp.View = function () {};
MyApp.View.prototype = {
    // @include prototypeProperties
};
```

##### 2 Add files with properties or groups to your object folder.
```js
// View/firstMethod.js
MyApp.Model.prototype.firstMethod = function () {};
```

```js
// View/secondMethod.js
MyApp.Model.prototype.secondMethod = function () {};
```

##### 3 Run task
```shell
grunt concatProperties
```

##### Result:
```js
// build/View.js
MyApp.View = function () {};
MyApp.View.prototype = {
    firstMethod:  function () {},
    secondMethod: function () {}
};
```

Also you can concat inline properties using other place definition

```js
// @include properties
```



___
### Advantage configuring

```js
grunt.initConfig({
    concatProperties: {
        myApp: {
            options: {
                base: 'test/App/',
                sourceProcessor: null,
                initFiles: [
                    '**/init.js',
                    '!init.js'
                ]
            },

            src: [
                'models/{**/,}*.js',
                'View/{**/,}*.js'
            ],
            dest: 'build/properties.js'
        }
    }
};
```

#### options.base
Type: `String`
Default value: `''`

Path to your application from Gruntfile.js
You need to specify this property only if Gruntfile.js isn`t placed at your app folder,

#### options.sourceProcessor
Type: `Function`
Default value: `null`

The function will being called for process each property source data.

For example:

```js
/**
 * @param source {String}
 * @param propertyData {Object}
 * @param propertyData.name     {String}
 * @param propertyData.source   {String}
 * @param propertyData.comment  {String}
 * @param propertyData.type     {String}  'function' || 'object'
 * @param propertyData.isPublic {Boolean}
 * @param propertyData.isFromPrototype {Boolean}
 * @param propertyData.filePath {String}
 */
function sourceProcessor (source, propertyData) {
    return source;
}
```


#### options.initFiles
Type: `Array`
Default value: `['**/init.js', '!init.js']`

Masks of initialization files


#### Multiple destination files configuration

```js
grunt.initConfig({
    concatProperties: {
        myApp: {
            files: {
                'build/models.js': [
                    'models/{**/,}*.js'
                ],
                'build/View.js': [
                    'View/{**/,}*.js'
                ]
            }
        }
    }
};
```


___
#### Recommendations
Use some like <a href="https://github.com/vkadam/grunt-jsbeautifier">grunt-jsbeautifier</a> to keep indentation at concated files
