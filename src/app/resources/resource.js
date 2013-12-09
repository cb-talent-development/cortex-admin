var module = angular.module('cortex.resources.resource', ['ngResource']);

// RestfulResource uses PUT for saving existing resource (/foo/:id) and POST for creating
module.factory('cortexResource', function($resource){
    return function(url, params, actions) {

        var defaultActions = {
            update: {method: 'PUT', inArray: false},
            create: {method: 'POST'}
        };

        actions = angular.extend(defaultActions, actions);

        var resource = $resource(url, params, actions);

        resource.prototype.$save = function(params, success, error) {
            return this.id ? this.$update(params, success, error) : this.$create(params, success, error);
        };

        return resource;
    };
});