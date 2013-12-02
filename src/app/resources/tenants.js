var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Tenants', function(authorizedResource, config) {
    return authorizedResource(config.api.baseUrl + '/tenants/:id', {id: '@id'}, {
    });
});