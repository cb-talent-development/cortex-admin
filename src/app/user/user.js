angular.module('cortex.user', [
    'cortex.auth.resource'
])

.factory('User', function(authorizedResource) {

    return authorizedResource('/users/:id', {id: '@id'}, {
        me: {
            method: 'GET', 
            params: {id: 'me'}
        }
    });

});