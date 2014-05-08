var module = angular.module('cortex.resources.tags', [
  'angular-underscore/utils',
  'cortex.resources.resource',
  'cortex.settings'
]);

module.factory('Tags', function (cortexResource, settings) {
  return cortexResource('/tags/:id', {id: '@id'}, {
    tags: {
      method: 'GET',
      url: settings.apiBaseUrl + '/tags',
      isArray: true,
      paginated: true
    }
  });
});
