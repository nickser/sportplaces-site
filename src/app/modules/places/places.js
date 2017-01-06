/**
 * @fileoverview Places page controller.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.places')
      .controller('PlacesController', PlacesController)
      .controller('LeftCtrl', LeftCtrl);

  /* @ngInject */
  function PlacesController($scope, $timeout, $mdSidenav, PlacesResource, URLS, $stateParams) {
    /** @type {!Object} */ var ctrl = this;
    $scope.test = {};

    $scope.places = PlacesResource.getPlaces($stateParams);

//	$scope.placesResultList = placesResultList;
//	$scope.placesList = placesList;

//	$scope.imagePath = 'vendor/img/basket.jpg';

    $scope.imagePath = function (item) {
      var mainImage;
      angular.forEach(item.images, function (value, key) {
        if (value.main === 1) {
          mainImage = value;
        }
      });
      if (mainImage) {
        return URLS.functionalAPI + 'images/placeImage' + '/' + mainImage.idImage + '/' + item.idPlace;
      }
      return 'assets/images/empty-photo.png';
    };


//	$scope.rate = 4;
    $scope.max = 5;
    $scope.isReadonly = true;
    $scope.hoveringOver = function (value) {
      $scope.overStar = value;
    };


//	$scope.places = [{name:"Площадка 1", adress: "Петровского 1а", coating: "Асфальт", rating: 1, cost: 0},
//	                 {name:"Зал футбольный", adress: "Калинина 22", coating: "Линолеум", rating: 4,  cost: 125}];

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function () {
        $mdSidenav(navID)
            .toggle()
            .then(function () {
//            $log.debug("toggle " + navID + " is done");
            });
      }, 200);
    }

    $scope.toggleLeft = buildDelayedToggler('left');

  }

  /* @ngInject */
  function LeftCtrl($scope, $timeout, $mdSidenav, $log) {
    /** @type {!Object} */ var ctrl = this;
    ctrl.close = function () {
      $mdSidenav('left').close()
          .then(function () {
//			$log.debug("close LEFT is done");
          });
    };

    $scope.color = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    };
    $scope.rating1 = 3;
    $scope.rating2 = 2;
    $scope.rating3 = 4;
    $scope.disabled1 = 0;
    $scope.disabled2 = 70;
  }
})();