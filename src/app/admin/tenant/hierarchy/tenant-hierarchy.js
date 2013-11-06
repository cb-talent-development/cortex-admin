/// <reference path="/reference.js"/>

angular.module('cortex.admin.tenant.hierarchy', [
    'ui.router.state',
    'kendo.directives'
])

.config(function($stateProvider) {
    $stateProvider.state('admin.tenant.hierarchy', {
        url: '/hierarchy',
        controller: 'TenantHierarchyCtrl',
        templateUrl: 'admin/tenant/hierarchy/tenant-hierarchy.tpl.html'
    });
})

.controller('TenantHierarchyCtrl', function ($scope) {
	var instanceHierarchy = {
		data: [
			{ text: "Furniture", items: [
                { text: "Tables & Chairs" },
                { text: "Sofas" },
                { text: "Occasional Furniture" }
            ] },
                { text: "Decor", items: [
                { text: "Bed Linen" },
                { text: "Curtains & Blinds" },
                { text: "Carpets" }
            ] }
        ]
    };

    $scope.instanceTreeOptions = {
        dataSource: instanceHierarchy
    };
});