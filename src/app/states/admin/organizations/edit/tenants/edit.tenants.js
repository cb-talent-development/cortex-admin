var module = angular.module('cortex.states.admin.organizations.edit.tenants', [
    'ui.router.state',
    'angular-flash.service',
    'angular-underscore',
    'cortex.resources.tenants',
    'cortex.resources.organizations',
    'cortex.states.admin.organizations.manage.tenants',
    'cortex.directives.tenantSettings'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations.edit.tenants', {
            url: '/tenants/:tenantId/edit',
            templateUrl: 'states/admin/organizations/edit/tenants/edit.tenants.tpl.html',
            controller: 'EditTenantsCtrl'
        });
});

module.controller('EditTenantsCtrl', function($scope, $stateParams, $state, $timeout, Tenants, Organizations, hierarchyUtils, flash) {

    // angular-bootstrap datepicker settings
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        activateAtOpen: false,
        deactivateAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };

    // Fetch the tenant or create a new resource
    if ($stateParams.tenantId) {
        $scope.data.tenant = Tenants.get({id: $stateParams.tenantId});
    }
    else {
        $scope.data.tenant = new Tenants();
    }

    $scope.data.tenant.inherit_from_parent = true;

    // Initialize scope.data properties for organization tree and other directives
    $scope.data.tenants =
    {
        hierarchy: [],
        flattened: [],
        selected: null
    };

    // Fetch organization hierarchy
    $scope.data.tenants.hierarchy = Organizations.hierarchy({id: $stateParams.organizationId, include_root: true});
    $scope.creatingTenant = $stateParams.tenantId === '';

    $scope.selectParent = function(tenant){
        $scope.data.tenants.selected = tenant;
        $scope.data.tenant.parent_id = tenant.id;
    };

    $scope.save = function() {
        var tenantIsNew = !$scope.data.tenant.id;
        $scope.data.tenant.$save(function(tenant) {

            var message;
            if (tenantIsNew) {
                message = 'Created new tenant "' + tenant.name + '" under "' + $scope.data.tenants.selected.name + '"' ;
                $state.go('.', {tenantId: tenant.id, organizationId: $stateParams.organizationId});
            }
            else {
                message = 'Saved tenant "' +  tenant.name + '"';
            }

            flash.success = message;
        });
    };
});
