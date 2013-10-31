angular.module('cortex.auth', [
    'ngResource',
    'ngCookies',
    'base64',
    'cortex.user.resources'
])

.factory('authService', function($rootScope, $resource, $cookieStore, base64, User) {

    var credentials = $cookieStore.get('credentials') || {encoded: ''};

    return {
        login: function(username, password, error) {

            // Persist plaintext encoded credentials for HTTP Basic auth.
            // This is a placeholder until OAuth is implemented.
            credentials.encoded = base64.encode(username + ':' + password);
            $cookieStore.put('credentials', credentials);

            $rootScope.user = User.$me();
        },

        addAuth: function(httpConfig) {
            httpConfig.headers = angular.extend({}, {'Authorization': 'Basic ' + credentials.encoded}, httpConfig.headers || {});
        },

        credentials: credentials
    };

});