/**
 * @fileoverview Service for operations with games data.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.services')
      .factory('GamesResource', GamesResource);

  /* @ngInject */
  function GamesResource($resource, URLS) {
    /** @type {!Object} */ var apiService_ = $resource('', {}, {
      getActions: {
        url: URLS.functionalAPI + 'games/actions',
        method: 'GET',
        isArray: true
      },
      getDays: {
        url: URLS.functionalAPI + 'games/days',
        method: 'GET',
        isArray: true
      },
      getEventTypes: {
        url: URLS.functionalAPI + 'games/event-types',
        method: 'GET',
        isArray: true
      },
      getLevels: {
        url: URLS.functionalAPI + 'games/levels',
        method: 'GET',
        isArray: true
      }
    });

    return apiService_;
  }
})();
