var module = angular.module('cortex.resources.assets', [
    'cortex.resources.resource'
]);

module.factory('Assets', function (authorizedResource) {
    return cortexResource('/assets/:id', {id: '@id'}, {
    });
});
