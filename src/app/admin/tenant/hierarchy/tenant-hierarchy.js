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
	var instanceHierarchyData = [
		{
			"Name": "Instance A-1",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": null,
			"Children": [
			{
				"Name": "Instance A-1-1",
				"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
				"Left": 0,
				"Right": 0,
				"ParentId": "2d1df39e-fa8f-46a6-b890-bea1ecb7cc7b",
				"Children": null,
				"Id": "156e563a-b0e6-4caa-88a8-6aae8ddd1ff3"
			},
			{
				"Name": "Instance A-1-2",
				"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
				"Left": 0,
				"Right": 0,
				"ParentId": "2d1df39e-fa8f-46a6-b890-bea1ecb7cc7b",
				"Children": [],
				"Id": "faa595a7-7c49-4517-976f-37aef4ee1b9d"
			}
			],
			"Id": "2d1df39e-fa8f-46a6-b890-bea1ecb7cc7b"
		},
		{
			"Name": "Instance A-1-1",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": "2d1df39e-fa8f-46a6-b890-bea1ecb7cc7b",
			"Children": [],
			"Id": "156e563a-b0e6-4caa-88a8-6aae8ddd1ff3"
		},
		{
			"Name": "Instance A-1-2",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": "2d1df39e-fa8f-46a6-b890-bea1ecb7cc7b",
			"Children": [],
			"Id": "faa595a7-7c49-4517-976f-37aef4ee1b9d"
		},
		{
			"Name": "Instance A-2",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": null,
			"Children": [
			{
				"Name": "Instance A-2-1",
				"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
				"Left": 0,
				"Right": 0,
				"ParentId": "a6e15403-0e64-4826-896b-71ceecefe61c",
				"Children": [
				{
					"Name": "Instance A-2-1-1",
					"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
					"Left": 0,
					"Right": 0,
					"ParentId": "f9157cf0-17ab-4a33-9465-919b24226c9b",
					"Children": [],
					"Id": "82341e4a-7e1a-4f73-8876-326a6d8a1233"
				}
				],
				"Id": "f9157cf0-17ab-4a33-9465-919b24226c9b"
			}
			],
			"Id": "a6e15403-0e64-4826-896b-71ceecefe61c"
		},
		{
			"Name": "Instance A-2-1",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": "a6e15403-0e64-4826-896b-71ceecefe61c",
			"Children": [
			{
				"Name": "Instance A-2-1-1",
				"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
				"Left": 0,
				"Right": 0,
				"ParentId": "f9157cf0-17ab-4a33-9465-919b24226c9b",
				"Children": [],
				"Id": "82341e4a-7e1a-4f73-8876-326a6d8a1233"
			}
			],
			"Id": "f9157cf0-17ab-4a33-9465-919b24226c9b"
		},
		{
			"Name": "Instance A-2-1-1",
			"TenantId": "5d877872-145b-4ed1-89c1-c50704711577",
			"Left": 0,
			"Right": 0,
			"ParentId": "f9157cf0-17ab-4a33-9465-919b24226c9b",
			"Children": [],
			"Id": "82341e4a-7e1a-4f73-8876-326a6d8a1233"
		}
		];

	$scope.instanceTreeOptions = {
		dragAndDrop: true,
		dataSource: {
			data: instanceHierarchyData,
			schema: {
				model: {
					children: 'Children',
					expanded: true
				}
			}
		},
		dataTextField: 'Name'
	};

	$scope.instanceNodeSelect = function(event) {
		var tree = event.sender,
			selectedNode = event.node,
			nodeData = tree.dataItem(selectedNode);

		if (nodeData) {
			$scope.selectedInstanceNode = nodeData;
		}
	};
});