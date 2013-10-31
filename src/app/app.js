angular.module('cortex', [
    'templates-app',
    'templates-common',
    'cortex.user.login',
    'ui.state',
    'ui.route'
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
})

.controller('AppCtrl', function($scope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });
});