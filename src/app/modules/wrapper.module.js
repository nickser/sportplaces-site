/**
 * @fileoverview Wrapper for application modules.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.modules', [
        'app.games',
        'app.main',
        'app.manager',
        'app.places',
        'app.login'
      ]);

})();
