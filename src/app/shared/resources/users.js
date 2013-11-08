angular.module('cortex.resources.users', [
    'cortex.auth.resources',
    'cortex.config'
])

.factory('Users', function(authorizedResource, config) {

    return authorizedResource(config.api.baseUrl + '/users/:id', {id: '@id'}, {
        me: {
            method: 'GET', 
            params: {id: 'me'}
        }
    });

});