var module = angular.module('cortex.resources.media', [
    'angular-underscore/utils',
    'cortex.resources.paginated',
    'cortex.settings'
]);

module.factory('Media', function (paginatedResource, settings) {
    return paginatedResource('/media/:id', {id: '@id'}, {
        search: {
          method: 'GET',
          url: settings.apiBaseUrl + '/media/search',
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
