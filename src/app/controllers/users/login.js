var module = angular.module('cortex.controllers.users.login', [
    'cortex.services.auth'
]);

module.controller('LoginCtrl', function ($scope, authService) {
    $scope.login = function (username, password) {
        authService.login($scope, username, password);
    };
});