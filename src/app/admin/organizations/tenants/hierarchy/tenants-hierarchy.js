/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.tenants.hierarchy', [
	'ui.router.state',
	'cortex.resources.organizations'
	])

.config(function($stateProvider) {
	$stateProvider.state('admin.organizations.tenants.hierarchy', {
		url: '/hierarchy',
		controller: 'TenantsHierarchyCtrl',
		templateUrl: 'admin/organizations/tenants/hierarchy/tenants-hierarchy.tpl.html'
	});
})

.controller('TenantsHierarchyCtrl', function ($scope, Tenants) {
	$scope.tenants = {};
	
	Tenants.query({id:'5d877872-145b-4ed1-89c1-c50704711577'}, function(response) {
		$scope.tenants.hierarchy = response;
    });

	$scope.tenantsTreeOptions = {
		dragAndDrop: true,
		dataSource: {
			data: $scope.tenants.hierarchy,
			schema: {
				model: {
					children: 'Children',
					expanded: true
				}
			}
		},
		dataTextField: 'Name'
	};

	$scope.selectTenantsNode = function(event) {
		var tree = event.sender,
			selectedNode = event.node,
			nodeData = tree.dataItem(selectedNode);

		if (nodeData) {
			$scope.tenants.selectedNode = nodeData;
		}
	};

	$scope.dropTenantsNode = function(event) {
		var tree = event.sender;

		alert('bluh');
	};
});