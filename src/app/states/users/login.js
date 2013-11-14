angular.module('cortex.states.users.login', [
        'ui.router.state',
        'cortex.services.auth'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'states/users/login.tpl.html',
            data: {pageTitle: 'Login'}
        });
    })

    .controller('LoginCtrl', function ($scope, authService) {

        $scope.login = function (username, password) {
            authService.login($scope, username, password);
        };

    });