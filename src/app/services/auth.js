var module = angular.module('cortex.services.auth', [
    'ngResource',
    'ngCookies',
    'common.base64',
    'cortex.config'
]);


module.factory('auth', function($q, $http, base64, config) {

    var DEFAULT_AUTH_METHOD = 'basic';

    // Request the current user from Cortex's API, resolve promise
    var getCurrentUser = function(httpConfig, credentials, defer) {
        $http.get(config.api.baseUrl + '/users/me', httpConfig)
             .success(function(user) {
                 // TODO: log
                 defer.resolve({user: user, credentials: credentials});
             })
             .error(function(response) {
                 // TODO: log
                 defer.reject({response: response, credentials: credentials});
             });
    };

    var buildConfig = function(value, scheme) {
        scheme = scheme || 'Basic';
        return {headers: {Authorization: scheme + ' ' + value}};
    };

    return {
        // Supported authorization methods
        // Returns promises
        methods: {
            // HTTP Basic Auth
            basic: function(credentials) {
                var d = $q.defer();
                var httpConfig = buildConfig(credentials.encoded, 'Basic');
                getCurrentUser(httpConfig, {encoded: credentials.encoded, method: 'basic'}, d);
                return d.promise;
            },
            // OAuth 2.0
            oauth: function(credentials) {
                var d = $q.defer();

                d.reject('OAuth not implemented');

                // TODO
                // 1) Initiate web-flow with cortex
                // 2) Wait to receive access token 
                // 3) Fetch currentUser and resolve promise

                return d.promise;
            }
        },

        // Create a $http config object that may be merged with others to provide
        // an authorized request
        buildConfig: buildConfig,

        // Basic Auth shortcut
        login: function(username, password) {
            var encoded = base64.encode(username + ':' + password);
            return this.methods.basic({encoded: encoded});
        },

        // Authorize and return the current user
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
