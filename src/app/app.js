// 'use strict';
//
// // Declare app level module which depends on views, and components
// angular.module('myApp', [
//   'ngRoute',
//   'myApp.view1',
//   'myApp.view2',
//   'myApp.version'
// ]).
// config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//   $locationProvider.hashPrefix('!');
//
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);


/**
 * @fileoverview Application bootstrap.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app', [
        'app.core',
        'app.services',
        'app.modules',
        'app.components',

      ])
      .value('duScrollOffset', 40)
      .controller('AppController', AppController);

  /* @ngInject */
  function AppController($scope, $rootScope, $location, $anchorScroll, security) {
    $rootScope.loading = false;
    // $scope.loading = true;
    $rootScope.groups = [];
    // $scope.cooBlock = false;

    $scope.scrollToTop = function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    };

    $scope.isAuthenticated = security.isAuthenticated;
    $scope.inRole = security.inRole;
    $scope.isAdmin = security.isAdmin;

    $scope.isManagerAuth = function () {
      return $scope.inRole('manager');
    };

    $scope.isAdminAuth = function () {
      return $scope.inRole('admin');
    };


    $scope.goToAnchor = function(anchor) {
      $location.hash(anchor);
      // call $anchorScroll()
      $anchorScroll();
    };

    function init_() {

    }

    init_();
  }
})();

