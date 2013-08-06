Boilerplate React + Stylus project
==================================

This is my boilerplate [React](http://facebook.github.io/react) project
using [Grunt](http://gruntjs.com) as the build tool, and
[Stylus](http://learnboost.github.io/stylus/) as my CSS preprocessor.

Probably will be converted into a [Yeoman](http://yeoman.io/)
generator (once I actually start using Yeoman)

Features
--------

* Very minimal HTML boilerplate
* Uses Stylus, with [nib](http://visionmedia.github.io/nib/) included
* Uses two build targets:
  - `grunt build` to compile JSX and Stylus into a *development* build
  - `grunt dist` to minify and optimize the development build for production

TODO
----

* The Gruntfile.js file is rather terse, need to be more flexible
* Add optional tasks to work with other static assets (images, fonts, etc.)
