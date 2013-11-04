/// <reference path="/reference.js"/>
'use strict';

angular.module('cortex', [
    'templates-app',
    'templates-common',
    'cortex.user.login',
    'cortex.user.home',
    'ui.router.state',
    'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
})

.controller('CortexAdminCtrl', function($scope, $location) {

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });

    $scope.$on('userLoginSuccess', function (event, user, oldUser) {
        $location.url('/home');
    });
    
});