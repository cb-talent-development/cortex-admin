var module = angular.module('cortex.resources.users', [
    'cortex.resources.resource'
]);

module.factory('Users', function (cortexResource) {
    return cortexResource('/users/:id', {id: '@id'}, {
        me: {
            method: 'GET',
            params: {id: 'me'}
        }
    });
});