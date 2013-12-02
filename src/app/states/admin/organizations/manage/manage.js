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
    $scope.isOrganizationSelected = function(organization){
        var selected = $scope.data.organization;
        return selected && selected.id == organization.id;
    };
});