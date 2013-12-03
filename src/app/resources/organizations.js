var module = angular.module('cortex.resources.organizations', [
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('Organizations', function (authorizedResource, Config) {
    return authorizedResource(Config.api.baseUrl + '/organizations/:id', {id: '@id'}, {
        hierarchy: {
            method: 'GET',
            url: '/organizations/:id/tenants/hierarchy',
            isArray: true
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