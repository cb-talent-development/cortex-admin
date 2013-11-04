/// <reference path="/reference.js"/>
'use strict';

angular.module('cortex.auth', [
    'ngResource',
    'ngCookies',
    'base64',
    'cortex.config'
])

.factory('authService', function($cookieStore, $rootScope, $resource, base64, config) {

    var credentials = $cookieStore.get('credentials') || {encoded: ''};

    return {
        login: function(scope, username, password) {
            // Persist plaintext encoded credentials for HTTP Basic auth.
            // This is a placeholder until OAuth is implemented.
            credentials.encoded = base64.encode(username + ':' + password);
            $cookieStore.put('credentials', credentials);

            var meHttpConfig = {
                method: 'GET',
                params: { id: 'me' }
            };
            
            this.addAuth(meHttpConfig);
            var userResource = $resource(config.api.baseUrl + '/users/:id', {id: '@id'}, {me: meHttpConfig});

            var oldUser = $rootScope.user;
            var user = userResource.me(function () {
                $rootScope.user = user;
                scope.$emit('userLoginSuccess', user, oldUser);
            });
        },
        
        addAuth: function (httpConfig) {
            httpConfig.headers = angular.extend({}, {Authorization: "Basic " + this.credentials.encoded}, httpConfig.headers);
        },

        credentials: credentials
    };

});