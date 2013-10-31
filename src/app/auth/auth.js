angular.module('cortex.auth', [
    'ngResource',
    'ngCookies',
    'base64'
])

.factory('authService', function($cookieStore, $rootScope, $resource, base64) {

    var credentials = $cookieStore.get('credentials') || {encoded: ''};

    return {
        login: function(username, password) {
            // Persist plaintext encoded credentials for HTTP Basic auth.
            // This is a placeholder until OAuth is implemented.
            credentials.encoded = base64.encode(username + ':' + password);
            $cookieStore.put('credentials', credentials);

            var userResource = $resource('/users/:id', {id: '@id'}, {
                me: {
                    method: 'GET', 
                    params: {id: 'me'}
                }
            });

            $rootScope.user = userResource.me();
        },

        credentials: credentials
    };

});