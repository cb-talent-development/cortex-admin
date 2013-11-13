/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.tenants.hierarchy', [
        'ui.router.state',
        'cortex.resources.organizations',
        'common.angularBootstrapNavTree',
        'ngAnimate'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('admin.organizations.tenants.hierarchy', {
            url: '/hierarchy/:organizationId',
            controller: 'TenantsHierarchyCtrl',
            templateUrl: 'admin/organizations/tenants/hierarchy/tenants-hierarchy.tpl.html'
        });
    })

    .controller('TenantsHierarchyCtrl', function ($scope, $stateParams, Tenants) {
        $scope.tenants = {};
        $scope.tenants.hierarchy = Tenants.query({id: $stateParams.organizationId});

        $scope.tenantsTreeHandler = function(branch) {
            $scope.tenants.selectedNode = branch;
        };
    });