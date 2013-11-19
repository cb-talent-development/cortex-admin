var module = angular.module('cortex.resources.tenants', [
    'angular-underscore',
    'cortex.resources.authorized',
    'cortex.config'
]);

module.factory('TenantsHierarchy', function (authorizedResource, config) {
    return authorizedResource(config.api.baseUrl + '/organizations/:orgId/tenants/hierarchy', {orgId: '@id'}, {
    });
});

module.factory('tenantUtils', function(){
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

module.filter('totalTenants', function(tenantUtils){
    return function(children) {
        return tenantUtils.flattenTenantHierarchy(children).length;
    };
});