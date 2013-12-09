var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.resource'
]);

module.factory('Tenants', function(cortexResource) {
    return cortexResource('/tenants/:id', {id: '@id'}, {
    });
});