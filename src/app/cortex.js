var module = angular.module('cortex', [
    // Templates
    'templates-app',
    'templates-common',
    'templates-vendor',

    // Libraries/Vendor
    'ui.router',
    'ui.router.state',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',

    // Cortex
    'cortex.states',
    'cortex.services.auth',
    'cortex.constants',

    'cortex.directives.uiBreadcrumbs'
]);

module.config(function ($urlRouterProvider, $httpProvider, flashProvider) {
    
    $urlRouterProvider.when('/admin/media', '/admin/media/');
    $urlRouterProvider.otherwise('/login');

    // Override the default Accept header value of 'application/json, text/plain, */*'
    // as "*/*" invalidates all specificity.
    // https://github.com/rails/rails/issues/9940
    // http://blog.bigbinary.com/2010/11/23/mime-type-resolution-in-rails.html
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain';

    // Add Bootstrap classes to flash element
    flashProvider.warnClassnames.push('alert-warning');
    flashProvider.infoClassnames.push('alert-info');
    flashProvider.successClassnames.push('alert-success');
    flashProvider.errorClassnames.push('alert-danger');
});

// CortexAdminCtrl
// ---------------
// Cortex-admin's root-level application controller
module.controller('CortexAdminCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, events, auth, session) {

    // Config: $rootScope and $scope
    var configureScopes = function() {
        // Add $state and $stateParams to root scope for universal access within views
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.currentUser = null;

        // Moment.js
        $rootScope.moment = window.moment;

        $scope.logout = function() {
            // Go to login page after logout
            session.logout().then(function() {
                $state.go('login');            
            });
        };
    };

    // Config: event listeners
    var configureListeners = function() {
        var isDefined = angular.isDefined;

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (isDefined(toState.data) && isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + " | Cortex";
            }
        });
    };

    // Config: promise chains and callbacks
    var configurePromises = function() {

        // Checks whether the app is displaying the login page
        var onLoginPage = function() {
            return $state.current.name.indexOf('login') > -1;
        };

        // Go to login page if unauthorized
        session.promises.loadRememberedUser.then(
            // Success
            function(user) {
                $rootScope.currentUser = user;
            }, 
            // Error
            function() {
                if (!onLoginPage()) {
                    $state.go('login');
                }
            }
        );
    };

    // Configure cortex-admin
    configureScopes();
    configureListeners();
    configurePromises();
});
