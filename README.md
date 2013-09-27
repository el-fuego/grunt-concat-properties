# grunt-concat-properties

> Grunt plugin for concating JavaScript models methods from many files

## Getting Started# grunt-templates-concat

> Grunt plugin for concatenate JavaScript templates

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-templates-concat --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-templates-concat');
```

## The "templates_concat" task

### Overview
In your project's Gruntfile, add a section named `templates_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  templates_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.namespace
Type: `String`
Default value: `''`

The scope of the template string. 
For example, options.namespace = "Application", and i have mail.tpl template, the result is: Application.main = doT.template("...");
If options.namespace is empty the result is:

var main = doT.template("...");

#### options.prefix
Type: `String`
Default value: ``

For example: 
options.prefix = "Mustache.compile(";
options.prefix = "doT.template(";

#### options.postfix
Type: `String`
Default value: ``

End of template string

#### options.comlipe
Type: `Boolean`
Default value: true

Enable templates compilation to function () {..}

doT and Mustache (mu2) is now supported



### Usage Examples

```js
templates_concat: {
    options: {
        namespace: 'Application.Templates',
        prefix: 'doT.template(',
        postfix: ')',
        compile: false
    },
    dist:      {
        'src':  ['js/templates/*.tpl'],
        'dest': '/tmpl.js'
    }
}
```

or

```js
templates_concat: {
    options: {
        namespace: 'window',
        prefix: 'Mustache.compile(',
        postfix: ')',
        compile: false
    },
    dist:      {
        'src':  ['app/js/templates/*.tpl'],
        'dest': '/tmpl.js'
    }
}
```

or

```js
templates_concat: {
    options: {
        namespace: 'window',
        compile: true
    },
    dist:      {
        'src':  ['app/js/templates/*.tpl'],
        'dest': '/tmpl.js'
    }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-templates-concat --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-templates-concat');
```

## The "templates_concat" task

### Overview
In your project's Gruntfile, add a section named `templates_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  templates_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.namespace
Type: `String`
Default value: `''`

The scope of the template string. 
For example, options.namespace = "Application", and i have mail.tpl template, the result is: Application.main = doT.template("...");
If options.namespace is empty the result is:

var main = doT.template("...");

#### options.isMustache
Type: `boolean`
Default value: `false`

Using Mustache.js.
For example, options.namespace = "Application", and i have mail.tpl template, and options.isMustache = true, 
the result is: Application.main = Mustache.compile("...")

### Usage Examples

```js
templates_concat: {
    options: {
        namespace: 'Application.Templates'
    },
    dist:      {
        'src':  ['app/js/templates/*.dot', 'app/base/js/templates/*.tpl'],
        'dest': '/tmpl.js'
    }
}
```

or

```js
templates_concat: {
    options: {
        namespace: 'window',
        isMustache: true
    },
    dist:      {
        'src':  ['app/js/templates/*.tpl', 'app/base/js/templates/*.mustache'],
        'dest': '/tmpl.js'
    }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
