var module = angular.module('cortex.resources.assets', [
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Assets', function (authorizedResource, config) {
    return authorizedResource(config.api.baseUrl + '/assets/:id', {id: '@id'}, {
    });
});
