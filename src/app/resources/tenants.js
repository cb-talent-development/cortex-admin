var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Tenants', function(authorizedResource, Config) {
    return authorizedResource(Config.api.baseUrl + '/tenants/:id', {id: '@id'}, {
    });
});