var module = angular.module('cortex.resources.resource', [
    'cortex.resources.authorized'
]);

module.constant('defaultActions', {
    update: {method: 'PUT', inArray: false},
    create: {method: 'POST'}
});

// RestfulResource uses PUT for saving existing resource (/foo/:id) and POST for creating
module.factory('cortexResource', function(authorizedResource, defaultActions){
    return function(url, params, actions) {
        actions = angular.extend(defaultActions, actions);

        var resource = authorizedResource(url, params, actions);

        resource.prototype.$save = function(params, success, error) {
            return this.id ? this.$update(params, success, error) : this.$create(params, success, error);
        };

        return resource;
    };
});
