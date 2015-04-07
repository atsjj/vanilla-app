/* global require, module */
'use strict';

/**
@module vanilla-app
*/
var configReplace       = require('ember-cli/lib/broccoli/broccoli-config-replace');
var defaults            = require('lodash/object/defaults');
var merge               = require('lodash/object/merge');
var path                = require('path');
var unwatchedTree       = require('broccoli-unwatched-tree');
var EmberApp            = require('ember-cli/lib/broccoli/ember-app');
var Funnel              = require('broccoli-funnel');

module.exports = VanillaApp;

/**
  VanillaApp extends EmberApp, the main class Ember CLI uses to manage the
  Brocolli trees for your application. It is very tightly integrated with
  Brocolli and has an `toTree()` method you can use to get the entire tree
  for your application.

  Available init options:
    - es3Safe, defaults to `false`,
    - storeConfigInMeta, defaults to `false`,
    - autoRun, defaults to `false`,
    - outputPaths, defaults to `{}`,
    - minifyCSS, defaults to `{enabled: !!isProduction,options: { relativeTo: 'app/styles' }},
    - minifyJS, defaults to `{enabled: !!isProduction},
    - loader, defaults to this.bowerDirectory + '/loader.js/loader.js',
    - sourcemaps, defaults to `{}`,
    - trees, defaults to `{},`
    - jshintrc, defaults to `{},`
    - vendorFiles, defaults to the following:

      ```
        {
          'jquery.js': null,
          'handlebars.js': null,
          'ember.js': null,
          'ember-testing.js': [],
          'app-shims.js': null,
          'ember-resolver.js': null,
          'ember-load-initializers.js': null
        }
      ```

  @class VanillaApp
  @extends EmberApp
  @constructor
  @param options Configuration options
*/
function VanillaApp(options) {
  options = options || {};

  this.appConstructor(merge(options, {
    autoRun: false,
    'ember-cli-htmlbars': {
      templateCompilerPath: ''
    },
    es3Safe: false,
    storeConfigInMeta: false,
    vendorFiles: {
      'jquery.js': null,
      'handlebars.js': null,
      'ember.js': null,
      'ember-testing.js': [],
      'app-shims.js': null,
      'ember-resolver.js': null,
      'ember-load-initializers.js': null
    }
  }, defaults));
}

VanillaApp.prototype = Object.create(EmberApp.prototype);
VanillaApp.prototype.constructor = VanillaApp;
VanillaApp.prototype.appConstructor = EmberApp.prototype.constructor;

/**
  @private
  @method _processedEmberCLITree
  @return
*/
VanillaApp.prototype._processedEmberCLITree = function() {
  if (this._cachedEmberCLITree) {
    return this._cachedEmberCLITree;
  }

  var files = [
    'vendor-prefix.js',
    'vendor-suffix.js',
    'app-prefix.js',
    'app-suffix.js',
    'app-boot.js',
    'test-support-prefix.js',
    'test-support-suffix.js'
  ];
  var emberCLITree = configReplace(unwatchedTree(__dirname), this._configTree(), {
    configPath: path.join(this.name, 'config', 'environments', this.env + '.json'),
    files: files,

    patterns: this._configReplacePatterns()
  });

  return this._cachedEmberCLITree = new Funnel(emberCLITree, {
    files: files,
    srcDir: '/',
    destDir: '/vendor/ember-cli/'
  });
};
