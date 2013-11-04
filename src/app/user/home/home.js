'use strict';

angular.module('cortex.user.home', [])

.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            'main': {
                controller: 'HomeCtrl',
                templateUrl: 'user/home/home.tpl.html'
            }
        },
        data: { pageTitle: 'Home' }
    });
})

.controller('HomeCtrl', function ($scope, $rootScope) {

    $scope.user = $rootScope.user;

});