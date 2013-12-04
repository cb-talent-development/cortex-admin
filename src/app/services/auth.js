var module = angular.module('cortex.services.auth', [
    'ngResource',
    'ngCookies',
    'common.base64',
    'cortex.config'
]);

module.factory('authService', function ($cookieStore, $rootScope, $resource, base64, config, events) {

    var credentials = $cookieStore.get('credentials') || {encoded: ''};

    return {
        login: function (scope, username, password) {
            // Persist plaintext encoded credentials for HTTP Basic auth.
            // This is a placeholder until OAuth is implemented.
            credentials.encoded = base64.encode(username + ':' + password);
            $cookieStore.put('credentials', credentials);

            var meHttpConfig = {
                method: 'GET',
                params: {id: 'me'}
            };

            this.addAuth(meHttpConfig);
            var userResource = $resource(config.api.baseUrl + '/users/:id', {id: '@id'}, {me: meHttpConfig});

            var oldUser = $rootScope.user;
            var user = userResource.me(function () {
                $rootScope.user = user;
                scope.$emit(events.USER_LOGIN_SUCCESS, user, oldUser);
            });
        },

        addAuth: function (httpConfig) {
            httpConfig.headers = angular.extend({}, {Authorization: "Basic " + this.credentials.encoded}, httpConfig.headers);
        },

        credentials: credentials
    };
});