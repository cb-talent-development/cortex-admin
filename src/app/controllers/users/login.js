var module = angular.module('cortex.controllers.users.login', [
    'cortex.services.auth',
    'cortex.services.session',
    'angular-flash.service',
    'cortex.constants'
]);

module.controller('LoginCtrl', function ($rootScope, $scope, $state, session, auth, events, flash) {

    session.promises.loadRememberedUser.then(function() {
        $state.go('admin.organizations.manage');
    });

    $rootScope.$on(events.USER_LOADED, function() {
        $state.go('admin.organizations.manage');
    });

    $scope.login = function(username, password) {
        session.login(username, password, $scope).then(
            //Success
            function() {
                $state.go('admin.organizations.manage');
            },
            //Error
            function() {
                $scope.loginError = true;
                flash.error = 'Invalid email or password.';
            }
        );
    };

    $scope.cortexLogin = function() {
        auth.methods.oauth.authorize({});
    };
});

