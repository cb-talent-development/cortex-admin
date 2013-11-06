angular.module('cortex.tenant.resources', [
    'cortex.auth.resources',
    'cortex.config'
])

.factory('Instances', function(authorizedResource, config) {

    return authorizedResource(config.api.baseUrl + '/tenants/:id/instances', {id: '@id'}, {
    });

});
