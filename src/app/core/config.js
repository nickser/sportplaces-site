/**
 * @fileoverview Application configurations.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.core')
      .config(configureBlock)
      .run(runBlock);

  /* @ngInject */
  function configureBlock($compileProvider, $urlRouterProvider,
                          $locationProvider, $ariaProvider, $httpProvider, $mdThemingProvider, ngMetaProvider, jwtOptionsProvider, AnalyticsProvider, uiGmapGoogleMapApiProvider, URLS) {

    $mdThemingProvider.definePalette('amazingPaletteName', {
      '50': 'CBE3FA',
      '100': 'B4CBE8',
      '200': '93B2D6',
      '300': '799DC1',
      '400': '6C8EB2',
      '500': '516B8A',
      '600': '465F7E',
      '700': '3B5A79',
      '800': '244B76',
      '900': '345274',
      'A100': 'B4C6DB',
      'A200': '83B2E5',
      'A400': '5D95D6',
      'A700': '4886CB',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('amazingPaletteName')
        .accentPalette('deep-orange');

    AnalyticsProvider.setAccount(URLS.gaAPI);

    $locationProvider.html5Mode(true).hashPrefix('!');

    // TODO: disable debug for performance reasons, need additional testing
    $compileProvider.debugInfoEnabled(false);
    $urlRouterProvider.otherwise('/main');


    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push('httpInterceptor');


    jwtOptionsProvider.config({
      whiteListedDomains: ['http://sport-places.in.ua:38080', 'http://localhost:38080']
    });

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle('Бронирование площадок');
    ngMetaProvider.setDefaultTitleSuffix(' - Город спорта');

    $ariaProvider.config({
      ariaHidden: true,
      ariaChecked: true,
      ariaReadonly: true,
      ariaDisabled: true,
      ariaRequired: true,
      ariaInvalid: true,
      ariaValue: true,
      tabindex: true,
      bindKeypress: true,
      bindRoleForClick: true
    });

    uiGmapGoogleMapApiProvider.configure({
      key: URLS.gmAPI,
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });

  }

  /* @ngInject */
  function runBlock($rootScope, $state, $timeout, $injector, security, authManager, $cookies, $http) {

    $rootScope.$state = $state;

    security.requestCurrentUser();


    // ngMeta.init();

    function abortPendingRequests_() {
      var $http = $injector.get('$http');
      $http.pendingRequests.forEach(function (pendingReq) {
        if (pendingReq.cancel && !pendingReq.nonCancelable) {
          pendingReq.cancel.resolve('Cancel');
        }
      });
    }

    $rootScope.$on('$locationChangeStart', function (e, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeError', console.log.bind(console));

    // $rootScope.$watch('ngMeta', function(newValue, oldValue) {
    //   $(document).prop('title', newValue.title || DEFAULT_META.title);
    //   $('meta[name="keywords"]').attr('content', newValue.keywords ||
    //       DEFAULT_META.keywords);
    //   $('meta[name="description"]').attr('content', newValue.description ||
    //       DEFAULT_META.description);
    //   $('meta[name="robots"]').attr('content', newValue.robots ||
    //       DEFAULT_META.robots);
    //   $('meta[property="og:title"]').attr('content', newValue.title ||
    //       DEFAULT_META.title);
    //   $('meta[property="og:description"]').attr('content',
    //       newValue.description || DEFAULT_META.description);
    // }, true);
  }

})();
