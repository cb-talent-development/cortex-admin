var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.authorized'
]);

module.factory('Tenants', function(authorizedResource) {
    return authorizedResource('/tenants/:id', {id: '@id'}, {
    });
});