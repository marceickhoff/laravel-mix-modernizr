# Laravel Mix Modernizr
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-modernizr.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-modernizr)
[![npm](https://img.shields.io/npm/dt/laravel-mix-modernizr.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-modernizr)
[![Software License](https://img.shields.io/npm/l/laravel-mix-modernizr.svg?style=flat-square)](LICENSE)

This extension adds support for [Modernizr](https://github.com/Modernizr/Modernizr) to [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) by using the [webpack-modernizr-loader](https://github.com/itgalaxy/webpack-modernizr-loader).

## Installation

```
npm i -D laravel-mix-modernizr
```

## Basic Usage

Require and use the extension inside your ``webpack.mix.js`` like this:

```javascript
/* 
 * webpack.mix.js
 */

const mix = require('laravel-mix');
require('laravel-mix-modernizr');

mix
  .js('app.js', 'dist')
  .modernizr()
```

This will use or create a .modernizrrc file in your project root and make the corresponding custom build instantly accessible via a `Modernizr` global identifier when your run Mix.

Now, set the Modernizr configurations to your liking, for example:

```javascript
/* 
 * .modernizrrc
 */

module.exports = {
  "classPrefix": "supports-",
  "options": [
    "addTest",
  ],
  "feature-detects": [
    "test/css/flexbox",
    "test/css/transforms"
  ]
};
```

For more information on how to configure Modernizr please refer to their [documentation](https://github.com/Modernizr/Modernizr/blob/master/README.md).

You can now use the resulting Modernizr build in your project:

```javascript
/* 
 * app.js
 */

// Includes the custom Modernizr build based on the configurations set in .modernizrrc
require('Modernizr');
```

If you want to get fancy with Modernizr (i.e. access `Modernizr`), you don't even need to explicitly `require` it. Just start using it. A behind-the-scenes call of `mix.autoload()` will handle the import automatically.

```javascript
/* 
 * app.js
 */

// Once accessed, the Modernizr build will be imported automatically
Modernizr.addTest(/* ... */);
```

## Advanced Usage

You can also use custom configuration files and global identifiers to maintain multiple different Modernizr builds in your project:

```javascript
/* 
 * webpack.mix.js
 */

const mix = require('laravel-mix');
require('laravel-mix-modernizr');

mix
  .js('app.js', 'dist')
  .modernizr({
    SpecialModernizr: '.special-modernizrrc', // Creates a build based on .special-modernizrrc
    AnotherModernizr: 'some/path/modernizrrc.js' // Creates a build based on some/path/modernizrrc.js
  })
```

You now have access to the `SpecialModernizr` and `AnotherModernizr` global identifiers instead of the default `Modernizr`. Use them just like in the [basic example](#basic-usage).