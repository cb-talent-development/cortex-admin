/// <reference path="/reference.js"/>

angular.element(document).ready(function () {

    angular.module('cortex', [
            'templates-app',
            'templates-common',
            'ui.router',
            'ui.router.state',
            'cortex.admin',
            'cortex.users'
        ])

        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
        })

        .controller('CortexAdminCtrl', function ($scope, $location) {
            var isDefined = angular.isDefined;

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + " | Cortex";
                }
            });

            $scope.$on('userLoginSuccess', function (event, user, oldUser) {
                $location.url('/home');
            });
        });

    angular.bootstrap(document, ['cortex']);
});