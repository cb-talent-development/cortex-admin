var module = angular.module('cortex.resources.organizations', [
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Organizations', function (authorizedResource, config) {
    return authorizedResource(config.api.baseUrl + '/organizations/:id', {id: '@id'}, {
    });
});