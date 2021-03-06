/**
 * Created by nicksergan on 14.09.2016.
 */

/**
 * @fileoverview Places page router.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function() {
  'use strict';

  angular
      .module('app.places')
      .config(configureRoutes);

  /* @ngInject */
  function configureRoutes($stateProvider) {
    $stateProvider
        .state('places', {
          url: '/places',
          params: {
            idCity: null,
            idSport: null,
          },
          views: {
            'main': {
              templateUrl: 'modules/places/places.tpl.html',
              controller: 'PlacesController as ctrl'
            }
          },
          resolve: {
            foundPlaces: ['$state','$stateParams', '$timeout', '$q', 'PlacesResource', function($state, $stateParams, $timeout, $q, PlacesResource) {
              var deferred = $q.defer();

              $timeout(function() {
                if ($stateParams.idCity !== null && $stateParams.idSport !== null) {
                  PlacesResource.getPlaces($stateParams, function (response) {
                    deferred.resolve(response);
                  });
                } else {
                  $state.go('main');
                  deferred.reject();
                }
              });

              return deferred.promise;
            }]
          },
          meta: {
            title: 'Places page',
            robots: 'noindex, nofollow'
          }
        });
  }
})();