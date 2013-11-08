angular.module('cortex.users.home', [
        'ui.router.state'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'users/home/home.tpl.html',
            data: { pageTitle: 'Home' }
        });
    })

    .controller('HomeCtrl', function ($scope, $rootScope) {
        $scope.user = $rootScope.user;
    });