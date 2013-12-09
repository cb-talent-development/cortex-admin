var module = angular.module('cortex.resources.assets', [
    'cortex.resources.resource'
]);

module.factory('Assets', function (cortexResource) {
    return cortexResource('/assets/:id', {id: '@id'}, {
    });
});
