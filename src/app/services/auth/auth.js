var module = angular.module('cortex.services.auth', [
    'ngResource',
    'ngCookies',
    'cortex.settings',
    'cortex.services.auth.methods.basic',
    'cortex.services.auth.methods.oauth'
]);

// Auth Service
// ------------
module.factory('auth', function($q, $http, $log, $cookieStore, $rootScope, base64, settings, basicAuth, oauth) {

    var DEFAULT_AUTH_METHOD = 'basic';

    // Request the current user from Cortex's API, resolve promise
    var getCurrentUser = function(httpConfig, credentials, defer) {
        $http.get(settings.apiBaseUrl + '/users/me', httpConfig)
             .success(function(user) {
                 $log.debug('Retrieved current user, id: ' + user.id);
                 defer.resolve({user: user, credentials: credentials});
             })
             .error(function(response) {
                 $log.warn('Unable to retrieve current user, id: ' + response);
                 defer.reject({response: response, credentials: credentials});
             });
    };

    var buildConfig = function(value, scheme) {
        scheme = scheme || 'Basic';
        return {headers: {Authorization: scheme + ' ' + value}};
    };

    var onAuthMethodSuccess = function(resp) {
        var d = $q.defer();
        getCurrentUser(resp.httpConfig, resp.credentials, d);
        return d.promise;
    };

    var onAuthMethodError = function(data) {
        return $q.reject(data);
    };

    var methods = {};
    // Iterate over auth methods, supplying callbacks to trigger user load
    // and returning a promise
    angular.forEach([basicAuth, oauth], function(method){
        methods[method.name] = function(credentials) {
            return method.authorize(credentials)
                         .then(onAuthMethodSuccess, onAuthMethodError);
        };
    });

    return {

        // Supported authorization methods
        methods: methods,

        // Create a $http config object that may be merged with others to provide
        // an authorized request
        buildConfig: buildConfig,

        // Basic Auth shortcut, returns promise
        login: function(login, password) {
            return this.methods['basic']({login: login, password: password});
        },

        // Authorize and return the current user, returns promise
        authorize: function(credentials) {
            method = credentials.method || DEFAULT_AUTH_METHOD;
            if (!(method in this.methods)) {
                var d = $q.defer();
                d.reject('Authorization method ' +  credentials.method + ' not supported.');
                return d.promise;
            }
            return this.methods[method](credentials);
        }
    };
});
