var module = angular.module('cortex.resources.media', [
    'angular-underscore/utils',
    'cortex.resources.paginated',
    'cortex.config'
]);

module.factory('Media', function (paginatedResource, config) {
    return paginatedResource('/media/:id', {id: '@id'}, {
        search: {
          method: 'GET',
          url: config.api.baseUrl + '/media/search',
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
