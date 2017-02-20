(function () {
  'use strict';

  angular
      .module('app.core', [
        /*
         * Angular modules
         */
        'ngMessages',
        'ngSanitize',
        'ngAnimate',
        'ngCookies', //
        'ngMeta',
        'ngAria',
        'ngResource',
        'duScroll',
        // 'ngTouch',
        'ngMaterial',

        // Default js module `templates-app` for all the `.tpl.html` files within this project
        // Autogenerated through `grunt task` in the `gruntfile.js
        'templates-app',

        /*
         * 3rd Party modules
         */
        'ui.router', // angular-ui-router
        'ui.bootstrap',
        'ui.bootstrap.tpls', // angular bootstrap
        // 'pascalprecht.translate',
        /*
         * Auth0
         */
        // 'auth0',
        'angular-storage',
        'angular-jwt',


        // range slider
        'ui-rangeSlider',
        'ui.select',
        // 'ng.deviceDetector'

        'angular-google-analytics'
      ]);

})();
