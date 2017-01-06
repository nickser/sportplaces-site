
/**
 * @fileoverview Login form controller.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.login')
      .controller('LoginFormController', LoginFormController);

  /* @ngInject */
  function LoginFormController($scope, security, $uibModalInstance) {
    /** @type {!Object} */ var ctrl = this;
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;

    // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
    // We could do something diffent for each reason here but to keep it simple...
    $scope.authReason = null;
    if ( security.getLoginReason() ) {
      $scope.authReason = ( security.isAuthenticated() ) ? 'login.reason.notAuthorized' :'login.reason.notAuthenticated';
    }

    // Attempt to authenticate the user specified in the form's model
    $scope.login = function() {
      // Clear any previous security errors
      $scope.authError = null;

      // Try to login
      security.login($scope.user.login, $scope.user.password).then(function(loggedIn) {
        if ( !loggedIn ) {
          // If we get here then the login failed due to bad credentials
          $scope.authError = 'Неверный логин пользователя или пароль.';//localizedMessages.get('login.error.invalidCredentials');
        }
      }, function(x) {
        // If we get here then there was a problem with the login request to the server
        $scope.authError = 'login.error.serverError';//localizedMessages.get('login.error.serverError', { exception: x });
      });
    };

    $scope.clearForm = function() {
      $scope.user = {};
    };

    $scope.cancelLogin = function() {
      security.cancelLogin();
    };
  }
})();
