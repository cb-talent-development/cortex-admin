angular.module('cortex.user.home', [
    'cortex.admin',
    'cortex.admin.tenant',
    'ui.router.state'
])

.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'user/home/home.tpl.html',
        data: { pageTitle: 'Home' }
    });
})

.controller('HomeCtrl', function ($scope, $rootScope) {

    $scope.user = $rootScope.user;

});