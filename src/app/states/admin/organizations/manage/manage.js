var module = angular.module('cortex.states.admin.organizations.manage', [
    'ui.router.state',
    'angular-underscore',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'cortex.config',
    'cortex.resources.tenants',
    'cortex.states.admin.organizations.manage.tenants'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations.manage', {
            url: '',
            templateUrl: 'states/admin/organizations/manage/manage.tpl.html',
            controller: 'OrganizationsManageCtrl'
        });
});

module.controller('OrganizationsManageCtrl', function($scope, $stateParams, $state, flash, events, Tenants, TenantsTreeStatus) {
    // Open tenant hierarchy and details panels if an organization is selected
    if ($stateParams.organizationId && !$state.includes('admin.organizations.manage.tenants')) {
        $state.go('.tenants');
    }

    $scope.tenantsTreeStatus = TenantsTreeStatus;

    $scope.deleteTenant = function(tenant){
            if (confirm('Are you sure you want to delete "' + tenant.name + '"?')) {
                Tenants.delete({id: tenant.id}, function(data) {
                    var message;

                    if (tenant.parent_id) {
                        $scope.$broadcast(events.TENANT_HIERARCHY_CHANGE);
                        message = '"' + tenant.name + '" tenant was deleted successfully';
                    }
                    else {
                        $scope.$emit(events.ORGANIZATIONS_CHANGE);
                        message = '"' + tenant.name + '" organization was deleted successfully';

                        // Go to org manage if an org tenant was deleted
                        $state.go('admin.organizations.manage');
                    }
                    flash.warn = message;
                });
            }
    };
});