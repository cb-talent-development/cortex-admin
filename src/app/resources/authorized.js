/// <reference path="/reference.js"/>

angular.module('cortex.resources.auth', [
        'ngResource',
        'cortex.services.auth'
    ])

    .factory('authorizedResource', function ($resource, authService) {

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

            // Iterate over all resource actions and allow the auth service to manipulate it
            forEach(extend({}, DEFAULT_ACTIONS, actions), function (httpConfig) {
                authService.addAuth(httpConfig);
            });

            return $resource(url, paramDefaults, actions);
        };
    });