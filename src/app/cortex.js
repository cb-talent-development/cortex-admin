angular.module('cortex', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.router.state',
    'cortex.states.admin',
    'cortex.states.users.login'
])

.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
})

.controller('CortexAdminCtrl', function ($scope, $state) {
    var isDefined = angular.isDefined;

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });

    $scope.$on('userLoginSuccess', function (event, user, oldUser) {
        $state.go('admin.organizations');
    });
});