angular.module('cortex.auth.resource', [
    'ng',
    'cortex.auth'
])

.factory('authorizedResource', function(AuthService) {

    var forEach = angular.forEach,
        extend = angular.extend;

    // Default actions from ngResource/resource.js
    var DEFAULT_ACTIONS = {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    };

    return function(url, paramDefaults, actions) {

        // Iterate over all resource actions and allow the auth service to manipulate it
        forEach(extend({}, DEFAULT_ACTIONS, actions), function(action) {
            AuthService.addAuth(action);            
        });

        return $resource(url, paramDefaults, actions);
    };
});