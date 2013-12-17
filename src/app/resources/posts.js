var module = angular.module('cortex.resources.posts', [
    'angular-underscore/utils',
    'cortex.resources.resource'
]);

module.factory('Posts', function (cortexResource) {
    return cortexResource('/posts/:id', {id: '@id'}, {
    });
});

module.filter('publishStatus', function() {
    return function(dateStr) {
        var date = Date.parse(dateStr);
        return date < new Date() ? 'Scheduled' : 'Published';
    };
});
