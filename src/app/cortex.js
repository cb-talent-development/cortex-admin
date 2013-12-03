var cortexModule = angular.module('cortex', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.router.state',
    'cortex.config',
    'cortex.states.admin',
    'cortex.states.users.login'
]);

cortexModule.factory('httpInterceptorService', function($q, $rootScope, EventsDict) {
    return {
        'requestError': function(rejection) {
            // Perhaps retry here
            alert('HTTP request encountered an error. Not retrying. In the future: implement retries, logging stack trace, and preventing duplicate requests.');
            return $q.reject(rejection);
        },
        'responseError': function(rejection) {
            $rootScope.$broadcast(EventsDict.HTTP_RESPONSE_ERROR, rejection.status);
            return $q.reject(rejection);
        }
    };
});

cortexModule.config(function ($urlRouterProvider, $httpProvider) {

    $urlRouterProvider.when('/admin/assets', '/admin/assets/');

    $urlRouterProvider.otherwise('/login');

    // override the default Accept header value of 'application/json, text/plain, */*'
    // as "*/*" invalidates all specificity
    // https://github.com/rails/rails/issues/9940
    // http://blog.bigbinary.com/2010/11/23/mime-type-resolution-in-rails.html
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain';

    $httpProvider.interceptors.push('httpInterceptorService');
});

cortexModule.controller('CortexAdminCtrl', function ($scope, $state, EventsDict) {
    var isDefined = angular.isDefined;

    $scope.$on(EventsDict.STATE_CHANGE_SUCCESS, function (event, toState, toParams, fromState, fromParams) {
        if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });

    $scope.$on(EventsDict.USER_LOGIN_SUCCESS, function (event, user, oldUser) {
        $state.go('admin.organizations.manage');
    });

    $scope.$on(EventsDict.HTTP_RESPONSE_ERROR, function (event, statusCode) {
        switch (statusCode) {
            // HTTP UNAUTHORIZED
            case 401:
                alert('Incorrect username and/or password provided.');
                break;

            default:
                alert('Unhandled HTTP response exception!');
        }
    });
});