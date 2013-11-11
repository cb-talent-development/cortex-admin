/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.tenants.hierarchy', [
        'ui.router.state',
        'cortex.resources.organizations',
        'common.angularBootstrapNavTree',
        'ngAnimate'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('admin.organizations.tenants.hierarchy', {
            url: '/hierarchy',
            controller: 'TenantsHierarchyCtrl',
            templateUrl: 'admin/organizations/tenants/hierarchy/tenants-hierarchy.tpl.html'
        });
    })

    .controller('TenantsHierarchyCtrl', function ($scope, Tenants) {
        $scope.tenants = {};
        $scope.tenants.hierarchy = [];

        $scope.tenantsTreeHandler = function(branch) {
            $scope.tenants.selectedNode = branch;
        };

        Tenants.query({id: '5d877872-145b-4ed1-89c1-c50704711577'}, function (response) {
            $scope.tenants.hierarchy = response;
        });
    });