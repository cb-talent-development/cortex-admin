var module = angular.module('cortex.resources.authorized', [
    'ngResource',
    'cortex.settings',
    'cortex.services.auth'
]);

module.factory('authorizedResource', function ($resource, auth, settings) {
    var forEach = angular.forEach,
        extend = angular.extend;

    // Default actions from ngResource/resource.js
    var DEFAULT_ACTIONS = {
        'get':    {method: 'GET'},
        'save':   {method: 'POST'},
        'query':  {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'}
    };

    return function (url, params, actions) {

        actions = extend(DEFAULT_ACTIONS, actions);

        // Iterate over all resource actions and allow the auth service to manipulate it
        forEach(actions, function (httpConfig) {
            httpConfig = extend(auth.buildConfig(), httpConfig);
        });

        return $resource(settings.apiBaseUrl + url, params, actions);
    };
});
