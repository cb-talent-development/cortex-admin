angular.module('cortex.user.resources', [
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