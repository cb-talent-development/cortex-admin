var module = angular.module('cortex.states.admin.organizations.edit.tenants', [
    'ui.router.state',
    'angular-underscore',
    'cortex.resources.tenants',
    'cortex.states.admin.organizations.manage.tenants'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations.edit.tenants', {
            url: '/tenants/:tenantId/edit',
            templateUrl: 'states/admin/organizations/edit/tenants/edit.tenants.tpl.html',
            controller: 'EditTenantsCtrl'
        });
});

module.controller('EditTenantsCtrl', function($scope, $stateParams, $state, Tenants) {
    if ($stateParams.tenantId) {
        $scope.data.tenant = Tenants.get({id: $stateParams.tenantId});
    }
});
