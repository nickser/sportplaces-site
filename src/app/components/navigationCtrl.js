/**
 * Created by nicksergan on 18.09.2016.
 */


/**
 * @fileoverview Navigation controller.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.components')
      .controller('NavigationController', NavigationController);

  /* @ngInject */
  function NavigationController($scope, $location, security) {
    /** @type {!Object} */ var ctrl = this;


    ctrl.login = function () {
      security.showLogin();
    };

    ctrl.logout = security.logout;
    
    ctrl.link = function (link) {
      $location.path(link);
    };

    $scope.isPendingRequests = function () {
      return httpRequestTracker.hasPendingRequests();
    };
  }
})();
