/**
 * @fileoverview Main page controller.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.main')
      .controller('MainPageController', MainPageController);

  /* @ngInject */
  function MainPageController($scope, $state, $location, cities, sports, actions, days, eventTypes, levels) {
    /** @type {!Object} */ var ctrl = this;
    $scope.cities = cities;
    $scope.sports = sports;
    $scope.actions = actions;
    $scope.days = days;
    $scope.eventTypes = eventTypes;
    $scope.levels = levels;

    $scope.getSelectedCity = function() {
      return $scope.placeFinder.city;
    };

    $scope.getSelectedSport = function() {
      return $scope.placeFinder.sport;
    };

    $scope.isDisabled = function() {
      return $scope.isAdminAuth();
    };

  }
})();
