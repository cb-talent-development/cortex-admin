var module = angular.module('cortex.resources.paginated', [
    'cortex.resources.resource',
    'cortex.config'
]);

module.factory('paginatedResource', function(cortexResource, resourceDefaultActions) {
    var forEach = angular.forEach;

    return function(url, params, actions) {
        actions = angular.extend(actions, resourceDefaultActions);

        var resource = cortexResource(url, params, actions);

        forEach(actions, function(action, name) {
            // If action is paginated ($query() or pagination == true in action config)

            if (/^(QUERY)$/i.test(name) || action.paginated) {

                resource.prototype['_' + name] = resource.prototype[name];

                // Wrap action function in pagination handler
                resource.prototype[name] = function(params, success, error) {
                    if (angular.isFunction(params)) {
                        error = success; success = params; params = {};
                    }

                    wrappedSuccess = function(data, headers) {
                        var pagination;
                        var range = headers['Content-Range'];
                        if (range) {
                            // Parse pagination information from Content-Range header (Format: start-end:per_page/count)
                            range = range.match(/^(\d+)-(\d+):(\d+)\/(\d+)$/);

                            if (range.length != 3) {
                                throw new Exception('Content-Range header contained ill-formated pagination data.');
                            }

                            var start = range[0];
                            var end = range[1];
                            var per_page = range[2];
                            var count = range[3];

                            pagination = {
                                page: params.page || 1,
                                start: start,
                                end: end,
                                per_page: per_page,
                                count: count
                            };
                        }

                        // Call original callback
                        success(data, headers, pagination);
                    };

                    return this['_' + name](params, wrappedSuccess, error);
                };
            }
        });

        return resource;
    };
});
