/**
 * @fileoverview Service for operations with places data.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.services')
      .factory('PlacesResource', PlacesResource);

  /* @ngInject */
  function PlacesResource($resource, URLS) {
    /** @type {!Object} */ var apiService_ = $resource('', {idCity: '@idCity', idSport: '@idSport'}, {
      getCities: {
        url: URLS.functionalAPI + 'places/cities',
        method: 'GET',
        isArray: true
      },
      getSports: {
        url: URLS.functionalAPI + 'places/sports',
        method: 'GET',
        isArray: true
      },
      getPlaces: {
        url: URLS.functionalAPI + 'places/:idCity/:idSport/#',
        method: 'GET',
        isArray: true
      }
    });

    return apiService_;
  }
})();
