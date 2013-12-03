var module = angular.module('cortex.resources.users', [
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Users', function (authorizedResource, Config) {
    return authorizedResource(Config.api.baseUrl + '/users/:id', {id: '@id'}, {
        me: {
            method: 'GET',
            params: {id: 'me'}
        }
    });
});