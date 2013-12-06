var module = angular.module('restfulResource', ['ngResource']);

// RestfulResource uses PUT for saving existing resource (/foo/:id) and POST for creating
module.factory('restfulResource', function($resource){
    return function(url, params, actions) {
        
        var defaultActions = {
            update: {method: 'PUT', inArray: false},
            create: {method: 'POST'}
        };

        actions = angular.extend(defaultActions, actions);

        var resource = $resource(url, params, actions);

        resource.prototype.$save = function() {
            return this.id ? this.$update() : this.$create();
        };

        return resource;
    };
});