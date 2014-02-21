var module = angular.module('cortex.resources.categories', [
    'angular-underscore/utils',
    'cortex.resources.resource',
    'cortex.settings'
]);

module.factory('Categories', function (cortexResource, settings) {
    return cortexResource('/categories/:id', {id: '@id'}, {
        hierarchy: {
            method: 'GET',
            url: settings.apiBaseUrl + '/categories/:id/hierarchy',
            isArray: true,
            paginated: true
        }
    });
});
