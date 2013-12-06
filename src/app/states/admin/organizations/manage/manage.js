var module = angular.module('cortex.states.admin.organizations.manage', [
    'ui.router.state',
    'angular-underscore',
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

module.controller('OrganizationsManageCtrl', function($scope, $stateParams, $state) {
    // Open tenant hierarchy and details panels if an organization is selected
    if ($stateParams.organizationId && !$state.includes('admin.organizations.manage.tenants')) {
        $state.go('.tenants');
    }
});