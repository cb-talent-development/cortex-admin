angular.module('cortex.resources.organizations', [
        'cortex.shared.auth.resources',
        'cortex.config'
    ])

    .factory('Organizations', function (authorizedResource, config) {
        return authorizedResource(config.api.baseUrl + '/organizations/:id', {id: '@id'}, {
        });
    })

    .factory('Tenants', function (authorizedResource, config) {
        return authorizedResource(config.api.baseUrl + '/organizations/:id/tenants', {id: '@id'}, {
        });
    });
