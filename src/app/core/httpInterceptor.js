
/**
 * @fileoverview Http services configurations.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($rootScope, $injector, $cookies, $q, store) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if (store.get('token')) {
          config.headers.Authorization = 'Bearer ' + store.get('token');
          // config.headers.Authorization = 'Bearer ' + test;
        }

        if (!config.timeout) {
          config.cancel = $q.defer();
          config.timeout = config.cancel.promise;
        }

        return config;
      },
      response: function(response) {
        var $http = $injector.get('$http');
        var favoriteCookie = $cookies.get('session');

        // if (angular.isArray(response.data)) {
        //   response.data = {
        //     data: response.data
        //   };
        // }

        return response;
      },
      responseError: function(response) {
        var $http = $injector.get('$http');

        return response;
      }
    };
  }

})();
