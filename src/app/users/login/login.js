angular.module('cortex.users.login', [
    'ui.router.state',
    'cortex.shared.auth'
])

.config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'users/login/login.tpl.html',
        data: {pageTitle: 'Login'}
    });
})

.controller('LoginCtrl', function($scope, authService) {

    $scope.login = function(username, password) {
        authService.login($scope, username, password);
    };
    
});