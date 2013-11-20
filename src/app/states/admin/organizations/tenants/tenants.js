var module = angular.module('cortex.states.admin.organizations.tenants', [
    'ui.router.state',
    'angular-underscore',
    'cortex.resources.tenants',
    'common.angularBootstrapNavTree',
    'ngAnimate'
 ]);

module.config(function($stateProvider){
    $stateProvider
        .state('admin.organizations.tenants',{
            url: '/tenants/:tenantId',
            views:
            {
                'tenants-tree':
                {
                    templateUrl: 'states/admin/organizations/tenants/tree.tpl.html',
                    controller: 'TenantsTreeCtrl'
                },
                'tenants-details':
                {
                    templateUrl: 'states/admin/organizations/tenants/details.tpl.html',
                    controller: 'TenantsDetailsCtrl'
                }
            }
        });
});

module.controller('TenantsTreeCtrl', function($scope, $stateParams, TenantsHierarchy, tenantUtils) {

    $scope.data.tenants =
    {
        hierarchy: [],
        flattened: [],
        selected: null
    };

    $scope.data.tenants.hierarchy = TenantsHierarchy.query({orgId: $stateParams.organizationId}, function(hierarchy){

        var flattened = tenantUtils.flattenTenantHierarchy(hierarchy);
        $scope.data.tenants.flattened = flattened;

        // Set $scope.data.tenants.selected if tenantId was specified in URL
        var tenantId = $stateParams.tenantId;
        if (tenantId) {
            $scope.data.tenants.selected = _.find(flattened, function(t) { return t.id == tenantId; });
        }
    });

    $scope.selectTenant = function(tenant){
        $scope.data.tenants.selected = tenant;
    };
});

module.controller('TenantsDetailsCtrl', function($scope, $stateParams) {

});