var module = angular.module('cortex.resources.users', [
    'cortex.resources.authorized'
]);

module.factory('Users', function (authorizedResource) {
    return authorizedResource('/users/:id', {id: '@id'}, {
        me: {
            method: 'GET',
            params: {id: 'me'}
        }
    });
});