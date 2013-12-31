var module = angular.module('cortex.resources.assets', [
    'angular-underscore/utils',
    'cortex.resources.resource'
]);

module.factory('Assets', function (cortexResource) {
    return cortexResource('/assets/:id', {id: '@id'}, {
        search: {
          method: 'GET', 
          url: '/assets/search',
          isArray: true
        }  
    });
});

module.filter('tagList', function() {
    return function(tags) {
        return _.map(tags, function(t) { return t.name; }).join(', ');
    };
});