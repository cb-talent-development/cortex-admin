var module = angular.module('cortex.controllers.users.login', [
    'cortex.services.auth',
    'cortex.services.session',
    'angular-flash.service'
]);

module.controller('LoginCtrl', function ($scope, $state, session, auth, flash) {

    session.promises.loadRememberedUser.then(function() {
        $state.go('admin.organizations.manage');
    });

    $scope.login = function(username, password) {
        session.login(username, password, $scope).then(

            //Success
            function(){
            $state.go('admin.organizations.manage');
        })
            //Error
            .catch(function(flash) {
        });
                flash.error = 'Invalid email or password.';
    };

    $scope.cortexLogin = function() {
        auth.methods.oauth.authorize({});
    };
});
