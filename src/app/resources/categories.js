var module = angular.module('cortex.resources.categories', [
    'angular-underscore/utils',
    'cortex.resources.resource',
    'cortex.config'
]);

module.factory('Categories', function (cortexResource, config) {
    return cortexResource('/categories/:id', {id: '@id'});
});
