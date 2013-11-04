'use strict';

angular.module('cortex.user.login', [
    'ui.router.state',
    'cortex.auth'
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

.controller('LoginCtrl', function($scope, authService) {

    $scope.login = function(username, password) {
        authService.login($scope, username, password);
    };
    
});