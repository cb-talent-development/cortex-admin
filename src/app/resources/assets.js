var module = angular.module('cortex.resources.assets', [
    'angular-underscore/utils',
    'cortex.resources.paginated',
    'cortex.config'
]);

module.factory('Assets', function (paginatedResource, config) {
    return paginatedResource('/assets/:id', {id: '@id'}, {
        search: {
          method: 'GET',
          url: config.api.baseUrl + '/assets/search',
          isArray: true,
          paginated: true
        }
    });
});

module.filter('tagList', function() {
    return function(tags) {
        return _.map(tags, function(t) { return t.name; }).join(', ');
    };
});
