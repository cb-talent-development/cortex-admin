angular.module('cortex.user.resources', [
    'cortex.auth.resources',
    'cortex.config'
])

.factory('User', function(authorizedResource, config) {

    return authorizedResource(config.api.baseUrl + '/users/:id', {id: '@id'}, {
        me: {
            method: 'GET', 
            params: {id: 'me'}
        }
    });

});