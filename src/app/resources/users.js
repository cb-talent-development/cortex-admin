angular.module('cortex.resources.users', [
        'cortex.resources.authorized',
        'cortex.config'
    ])

    .factory('Users', function (authorizedResource, config) {

        return authorizedResource(config.api.baseUrl + '/users/:id', {id: '@id'}, {
            me: {
                method: 'GET',
                params: {id: 'me'}
            }
        });

    });