var module = angular.module('cortex.resources.assets', [
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Assets', function (authorizedResource, Config) {
    return authorizedResource(Config.api.baseUrl + '/assets/:id', {id: '@id'}, {
    });
});
