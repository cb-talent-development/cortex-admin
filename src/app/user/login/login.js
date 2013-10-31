angular.module('cortex.user.login', [
  'ui.state',
  'placeholders',
  'ui.bootstrap'
])

.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    views: {
      'main': {
        controller: 'LoginCtrl',
        templateUrl: 'user/login/login.tpl.html'
      }
    },
    data: {pageTitle: 'Login'}
  });
})

.controller('LoginCtrl', function($scope) {
});