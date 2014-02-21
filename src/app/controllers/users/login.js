var module = angular.module('cortex.controllers.users.login', [
    'cortex.services.session'
]);

module.controller('LoginCtrl', function ($scope, $state, session) {

    session.promises.loadRememberedUser.then(function() {
        $state.go('admin.organizations.manage');
    });

    $scope.login = function(username, password) {
        session.login(username, password, $scope).then(function(){
            $state.go('admin.organizations.manage');
        });
    };
});
