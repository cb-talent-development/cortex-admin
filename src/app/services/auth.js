var module = angular.module('cortex.services.auth', [
    'ngResource',
    'ngCookies',
    'common.base64',
    'cortex.config'
]);

module.factory('authService', function ($cookieStore, $rootScope, $resource, base64, config, events) {

    var credentials = $cookieStore.get('credentials') || {encoded: ''};

    return {
        login: function (username, password, scope) {
            // Persist plaintext encoded credentials for HTTP Basic auth.
            // This is a placeholder until OAuth is implemented.
            scope = scope || $rootScope;
            credentials.encoded = base64.encode(username + ':' + password);
            $cookieStore.put('credentials', credentials);

            var oldUser = $rootScope.user;

            this.fetchCurrentUser(function(user){
                scope.$emit(events.USER_LOGIN_SUCCESS, user, oldUser);
            });
        },

        logout: function() {
            user = $rootScope.user;
            if (user) {
                credentials.encoded = '';
                $cookieStore.put('credentials', credentials);
                $rootScope.user = null;
                $rootScope.$emit(events.USER_LOGOUT, user);
            }
        },

        fetchCurrentUser: function(success) {
            if (credentials.encoded && (credentials.encoded !== '') && !$rootScope.user) {

                var meHttpConfig = {
                    method: 'GET',
                    params: {id: 'me'}
                };

                this.addAuth(meHttpConfig);

                var userResource = $resource(config.api.baseUrl + '/users/:id', {id: '@id'}, {me: meHttpConfig});

                userResource.me(function(user) {
                    $rootScope.user = user;
                    $rootScope.$emit(events.FETCHED_CURRENT_USER, user);
                    if (success) {
                        success(user);                        
                    }
                }, function() {
                    credentials.encoded = '';
                    $cookieStore.put('credentials', credentials);                    
                }); 
            }
        },

        addAuth: function (httpConfig) {
            httpConfig.headers = angular.extend({}, {Authorization: "Basic " + this.credentials.encoded}, httpConfig.headers);
        },

        loggedIn: function() {
            return ($rootScope.user == null) || ($rootScope.user === undefined) ? false : true;
        },

        stateAuthorized: function(state) {
            return this.loggedIn() || (state.name.indexOf('login') != -1);
        },

        credentials: credentials
    };
});