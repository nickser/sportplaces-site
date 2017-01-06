/**
 * @fileoverview Service for common utility methods.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.services')
      .factory('Utilities', Utilities);

  /* @ngInject */
  function Utilities($filter, URLS, ArrayUtils) {
    /** @type {!Object} */ var service_ = {};
    service_.getStatusInterceptor = function () {
      return {
        response: function (response) {
          var result = response.resource;
          result.$status = response.status;
          return result;
        }
      };
    };

    return service_;
  }

  function split(str) {
    var i = str.indexOf(".");
    if(i > 0) {
      return str.slice(0, i);
    }
    else {
      return str;
    }
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


})();
