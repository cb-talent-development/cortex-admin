var module = angular.module('cortex.resources.assets', [
    'cortex.resources.authorized'
]);

module.factory('Assets', function (authorizedResource) {
    return authorizedResource('/assets/:id', {id: '@id'}, {
    });
});
