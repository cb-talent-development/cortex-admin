var module = angular.module('cortex.states.admin.organizations.manage.tenants', [
    'ui.router.state',
    'angular-underscore',
    'cortex.config',
    'cortex.resources.organizations',
    'cortex.directives.tenantSettings',
    'common.angularBootstrapNavTree',
    'ngAnimate'
 ]);

module.config(function($stateProvider){
    $stateProvider
        .state('admin.organizations.manage.tenants',{
            url: '/tenants/:tenantId',
            views:
            {
                'tenants-tree':
                {
                    templateUrl: 'states/admin/organizations/manage/tenants/manage.tenants.tree.tpl.html',
                    controller: 'TenantsTreeCtrl'
                },
                'tenants-details':
                {
                    templateUrl: 'states/admin/organizations/manage/tenants/manage.tenants.details.tpl.html'
                }
            }
        });
});

module.factory('TenantsTreeStatus', function () {
    return {
        isLoaded: false
    };
});

module.controller('TenantsTreeCtrl', function($scope, $stateParams, events, Organizations, hierarchyUtils, TenantsTreeStatus) {

    var loadTenantHierarchy = function() {
        TenantsTreeStatus.isLoaded = false;

        $scope.data.tenants.hierarchy = Organizations.hierarchy({id: $stateParams.organizationId, include_root: true}, function(hierarchy){

            var flattened = hierarchyUtils.flattenTenantHierarchy(hierarchy);
            $scope.data.tenants.flattened = flattened;

            // Set $scope.data.tenants.selected if tenantId was specified in URL
            var tenantId = $stateParams.tenantId;
            if (tenantId) {
                $scope.data.tenants.selected = _.find(flattened, function(t) { return t.id == tenantId; });
            }

            TenantsTreeStatus.isLoaded = true;
        });
    };

    $scope.data.tenants =
    {
        hierarchy: [],
        flattened: [],
        selected: null
    };

    loadTenantHierarchy();

    $scope.selectTenant = function(tenant){
        $scope.data.tenants.selected = tenant;
    };

    $scope.$on(events.TENANT_HIERARCHY_CHANGE, function (event) {
        loadTenantHierarchy();
    });
});
