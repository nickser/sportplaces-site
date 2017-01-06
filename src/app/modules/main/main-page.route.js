/**
 * Created by nicksergan on 14.09.2016.
 */

/**
 * @fileoverview Main page router.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function() {
  'use strict';

  angular
      .module('app.main')
      .config(configureRoutes);

  /* @ngInject */
  function configureRoutes($stateProvider) {
    $stateProvider
        .state('main', {
          url: '/main',
          views: {
            'main': {
              templateUrl: 'modules/main/main-page.tpl.html',
              controller: 'MainPageController as ctrl'
            }
          },
          resolve : {
            cities : [ 'PlacesResource', function(PlacesResource) {
              return PlacesResource.getCities();
            } ],
            sports : [ 'PlacesResource', function(PlacesResource) {
              return PlacesResource.getSports();
            } ],
            actions : [ 'GamesResource', function(GamesResource) {
              return GamesResource.getActions();
            } ],
            days : [ 'GamesResource', function(GamesResource) {
              return GamesResource.getDays();
            } ],
            eventTypes : [ 'GamesResource', function(GamesResource) {
              return GamesResource.getEventTypes();
            } ],
            levels : [ 'GamesResource', function(GamesResource) {
              return GamesResource.getLevels();
            } ],
          },
          meta: {
            title: 'Main page',
            robots: 'noindex, nofollow'
          }
        });
  }
})();
