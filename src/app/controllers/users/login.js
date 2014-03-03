var module = angular.module('cortex.controllers.users.login', [
    'cortex.services.auth',
    'cortex.services.session',
    'cortex.constants'
]);

module.controller('LoginCtrl', function ($rootScope, $scope, $state, session, auth, events) {

    session.promises.loadRememberedUser.then(function() {
        $state.go('admin.organizations.manage');
    });

    $rootScope.$on(events.USER_LOADED, function() {
        $state.go('admin.organizations.manage');
    });

    $scope.login = function(username, password) {
        session.login(username, password, $scope).then(function(){
            $state.go('admin.organizations.manage');
        });
    };

    $scope.cortexLogin = function() {
        auth.methods.oauth.authorize({});
    };
});
