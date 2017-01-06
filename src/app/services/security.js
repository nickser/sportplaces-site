/**
 * @fileoverview Module for application security.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function () {
  'use strict';

  angular
      .module('app.services')
      .factory('security', security);

  /* @ngInject */
  function security($rootScope, $state, $q, $http, store, $uibModal, securityRetryQueue, URLS) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/login';
      $state.go(url);
    }

    // Login form dialog stuff
    var loginDialog = null;

    function openLoginDialog() {
      if (loginDialog) {
        return;
      }
      loginDialog = $uibModal.open({
        templateUrl: 'modules/login/views/login-form.tpl.html',
        controller: 'LoginFormController',
        backdrop: 'static'
      });

      loginDialog.result.then(onLoginDialogClose);
    }

    function closeLoginDialog(success) {
      if (loginDialog) {
        loginDialog.close(success);
      }
    }

    function onLoginDialogClose(success) {
      loginDialog = null;
      if (success) {
        securityRetryQueue.retryAll();
      } else {
        securityRetryQueue.cancelAll();
//			redirect();
      }
    }

    // Register a handler for when an item is added to the retry queue
    securityRetryQueue.onItemAddedCallbacks.push(function (retryItem) {
      if (securityRetryQueue.hasMore()) {
//			service.showLogin();
      }
    });

    // The public API of the service
    var service = {
      // Get the first reason for needing a login
      getLoginReason: function () {
        return securityRetryQueue.retryReason();
      },
      // Show the modal login dialog
      showLogin: function () {
        openLoginDialog();
      },

      // Attempt to authenticate a user by the given email and password
      login: function (login, password) {
        var request = $http.post(URLS.functionalAPI + 'authentication', {
          login: login,
          password: password
        });
        return request.then(function (response) {
          if (response.status === 200) {
            console.log(response);
            service.currentUser = response.data;
            store.set('token', response.data.token);
            if (service.isAuthenticated()) {
              closeLoginDialog(true);
              // if ($window.location.hostname === 'localhost') {
              // $window.location = '/index.html';
              // } else {
              // $window.location = 'scenarios';
              // }
            }
            return service.isAuthenticated();
          } else {
            return false;
          }
        });
      },

      // Give up trying to login and clear the retry queue
      cancelLogin: function () {
        closeLoginDialog(false);
      },

      // Logout the current user and redirect
      logout: function (redirectTo) {
        service.currentUser = null;
        store.remove('token');
      },

      // Ask the backend to see if a user is already authenticated - this may be from a previous session.
      requestCurrentUser: function () {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get(URLS.functionalAPI + 'authentication/validateToken').then(function (response) {
            service.currentUser = response.data;
            return service.currentUser;
          });
        }
      },

      // Information about the current user
      currentUser: null,

      // Is the current user authenticated?
      isAuthenticated: function () {
        return !!service.currentUser;
      },

      // Is the current user an adminstrator?
      isAdmin: function () {
        return !!(service.currentUser && service.currentUser.admin);
      },

      inRole: function (role) {
        if (service.currentUser) {
          var roles = service.currentUser.roles;
          for (var i = 0; i < roles.length; i++) {
            if (roles[i].name === role) {
              return true;
            }
          }
        }
        return false;
      }
    };

    return service;
  }

})();
