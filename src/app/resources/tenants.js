var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.resource'
]);

module.factory('Tenants', function (cortexResource) {
    return cortexResource('/tenants/:id', {id: '@id'});
});

module.factory('hierarchyUtils', function(){
    return {
        flattenTenantHierarchy: function(tenants) {
            var flatten = function(tenants, result){
                _.each(tenants, function(tenant){
                    result.push(tenant);
                    if (tenant.children && tenant.children.length > 0){
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