/* jshint ignore:start */

define('{{MODULE_PREFIX}}/config/environment', [], function() {
  {{content-for 'config-module'}}
});

{{content-for 'app-boot'}}

/* jshint ignore:end */
