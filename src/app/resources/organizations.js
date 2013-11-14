angular.module('cortex.resources.organizations', [
        'cortex.shared.auth.resources',
        'cortex.config'
    ])

    .factory('Organizations', function (authorizedResource, config) {
        return authorizedResource(config.api.baseUrl + '/organizations', {
        });
    })

    .factory('Tenants', function (authorizedResource, config) {
        return authorizedResource(config.api.baseUrl + '/organizations/:id/tenants/hierarchy', {id: '@id'}, {
        });
    });
