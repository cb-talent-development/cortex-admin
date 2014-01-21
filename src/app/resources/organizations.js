var module = angular.module('cortex.resources.organizations', [
    'angular-underscore/utils',
    'cortex.resources.resource',
    'cortex.config'
]);

module.factory('Organizations', function (cortexResource, config) {
    return cortexResource('/organizations/:id', {id: '@id'}, {
        hierarchy: {
            method: 'GET',
            url: config.api.baseUrl + '/organizations/:id/tenants/hierarchy',
            isArray: true,
            paginated: true
        }
    });
});

module.factory('hierarchyUtils', function(){
    return {
        flattenTenantHierarchy: function(tenants) {
            var flatten = function(tenants, result){
                _.each(tenants, function(tenant){
                    result.push(tenant);
                    if (tenant.children.length > 0){
                        flatten(tenant.children, result);
                    }
                });
            };
            var flattened = [];
            flatten(tenants, flattened);
            return flattened;
        }
    };
});

module.filter('totalTenants', function(hierarchyUtils){
    return function(children) {
        return hierarchyUtils.flattenTenantHierarchy(children).length;
    };
});