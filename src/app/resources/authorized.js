var module = angular.module('cortex.resources.authorized', [
    'ngResource',
    'cortex.config',
    'cortex.services.auth'
]);

module.factory('authorizedResource', function ($resource, authService, config) {
    var forEach = angular.forEach,
        extend = angular.extend;

    // Default actions from ngResource/resource.js
    var DEFAULT_ACTIONS = {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'}
    };

    return function (url, paramDefaults, actions) {

        actions = extend({}, DEFAULT_ACTIONS, actions);

        // Iterate over all resource actions and allow the auth service to manipulate it
        forEach(actions, function (httpConfig) {
            authService.addAuth(httpConfig);
        });

        return $resource(config.api.baseUrl + url, paramDefaults, actions);
    };
});
