
/**
 * @fileoverview Directives for input validators.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('equal', equal);

  /* @ngInject */
  function equal() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        'value': '=equal'
      },
      link: function(scope, element, attrs, ngModel) {
        function validator(modelValue, viewValue) {
          if (ngModel.$isEmpty(modelValue)) {
            // consider empty model to be valid
            return true;
          }

          return scope.value == viewValue;
        }

        ngModel.$validators.equal = validator;
      }
    };
  }
})();
