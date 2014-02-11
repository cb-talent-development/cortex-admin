var cortexModule = angular.module('cortex', [
    'templates-app',
    'templates-common',
    'templates-vendor',
    'ui.router',
    'ui.router.state',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'cortex.config',
    'cortex.states',
    'cortex.services.auth'
]);

cortexModule.factory('httpInterceptorService', function($q, $rootScope, events) {
    return {
        'requestError': function(rejection) {
            // Perhaps retry here
            alert('HTTP request encountered an error. Not retrying. In the future: implement retries, logging stack trace, and preventing duplicate requests.');
            return $q.reject(rejection);
        },
        'responseError': function(rejection) {
            $rootScope.$broadcast(events.HTTP_RESPONSE_ERROR, rejection.status, rejection.data.message);
            return $q.reject(rejection);
        }
    };
});

cortexModule.config(function ($urlRouterProvider, $httpProvider, flashProvider) {

    $urlRouterProvider.when('/admin/media', '/admin/media/');

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

cortexModule.controller('CortexAdminCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, flash, events, authService) {
    var isDefined = angular.isDefined;

    // Add $state and $stateParams to root scope for universal access within views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.moment = window.moment;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!authService.stateAuthorized(toState)) {
            event.preventDefault();
            $timeout(function() {
                $state.go('login');
            }, 300);
        }
    });

    $scope.$on(events.STATE_CHANGE_SUCCESS, function (event, toState, toParams, fromState, fromParams) {
        if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + " | Cortex";
        }
    });

    $scope.$on(events.USER_LOGIN_SUCCESS, function (event, user, oldUser) {
        $state.go('admin.organizations.manage');
    });

    $scope.$on(events.HTTP_RESPONSE_ERROR, function (event, statusCode, errorMessage) {
        switch (statusCode) {

            // HTTP UNPROCESSABLE ENTITY
            case 422:
                flash.error = 'Invalid file type!';
                break;

            // HTTP CONFLICT
            case 409:
                flash.error = 'There was a conflict. Details: ' + errorMessage;
                break;

            // HTTP NOT FOUND
            case 404:
                flash.error = 'The requested resource was not found.';
                break;

            // HTTP UNAUTHORIZED
            case 401:
                flash.error = 'Incorrect username and/or password provided.';
                break;

            case 0:
                // The most disgusting hack in the world, ever, for IE10, I want to shoot myself - see: http://stackoverflow.com/questions/16081267/xmlhttprequest-status-0-instead-of-401-in-ie-10
                alert('Incorrect username and/or password provided.');
                break;

            default:
                flash.error = 'Unhandled HTTP response exception!';
        }
    });

    authService.fetchCurrentUser(function() {
        $state.go('admin.organizations.manage');
    });
});
