var cortexModule = angular.module('cortex', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.router.state',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'cortex.config',
    'cortex.states.admin',
    'cortex.states.users.login'
]);

cortexModule.factory('httpInterceptorService', function($q, $rootScope, events) {
    return {
        'requestError': function(rejection) {
            // Perhaps retry here
            alert('HTTP request encountered an error. Not retrying. In the future: implement retries, logging stack trace, and preventing duplicate requests.');
            return $q.reject(rejection);
        },
        'responseError': function(rejection) {
            $rootScope.$broadcast(events.HTTP_RESPONSE_ERROR, rejection.status);
            return $q.reject(rejection);
        }
    };
});

cortexModule.config(function ($urlRouterProvider, $httpProvider, flashProvider) {

    $urlRouterProvider.when('/admin/assets', '/admin/assets/');

    $urlRouterProvider.otherwise('/login');

    // Override the default Accept header value of 'application/json, text/plain, */*'
    // as "*/*" invalidates all specificity
    // https://github.com/rails/rails/issues/9940
    // http://blog.bigbinary.com/2010/11/23/mime-type-resolution-in-rails.html
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain';

    $httpProvider.interceptors.push('httpInterceptorService');

    // Configure message flashing with bootstrap alert classes
    flashProvider.warnClassnames.push('alert-warning');
    flashProvider.infoClassnames.push('alert-info');
    flashProvider.successClassnames.push('alert-success');
    flashProvider.errorClassnames.push('alert-danger');
});

cortexModule.controller('CortexAdminCtrl', function ($scope, $state, events, $rootScope, $stateParams) {
    var isDefined = angular.isDefined;

    // Add $state and $stateParams to root scope for universal access within views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.$on(events.STATE_CHANGE_SUCCESS, function (event, toState, toParams, fromState, fromParams) {
        if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });

    $scope.$on(events.USER_LOGIN_SUCCESS, function (event, user, oldUser) {
        $state.go('admin.organizations.manage');
    });

    $scope.$on(events.HTTP_RESPONSE_ERROR, function (event, statusCode) {
        switch (statusCode) {
            // HTTP UNAUTHORIZED
            case 401:
                alert('Incorrect username and/or password provided.');
                break;

            case 422:
                alert('Invalid file type!');
                break;

            case 0:
                // The most disgusting hack in the world, ever, for IE10, I want to shoot myself - see: http://stackoverflow.com/questions/16081267/xmlhttprequest-status-0-instead-of-401-in-ie-10
                alert('Incorrect username and/or password provided.');
                break;

            default:
                alert('Unhandled HTTP response exception!');
        }
    });
});
