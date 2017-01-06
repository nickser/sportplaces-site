/**
 * @fileoverview Service for operations with games data.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.services')
      .factory('ManagerResource', ManagerResource);

  /* @ngInject */
  function ManagerResource($resource, URLS) {
    /** @type {!Object} */ var apiService_ = $resource('', {}, {
      get: {
        url: URLS.functionalAPI + 'games/actions',
        method: 'GET',
        isArray: true
      }
    });

    return apiService_;
  }
})();
