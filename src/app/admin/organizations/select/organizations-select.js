/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.select', [
        'ui.router.state',
        'cortex.resources.organizations'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('admin.organizations.select', {
            url: '/select',
            controller: 'OrganizationsSelectCtrl',
            templateUrl: 'admin/organizations/select/organizations-select.tpl.html'
        });
    })

    .controller('OrganizationsSelectCtrl', function ($scope, Organizations) {
        $scope.organizations = {};
        $scope.organizations.list = [
            {
                "Name": "Organization A",
                "Id": "5d877872-145b-4ed1-89c1-c50704711577",
                "DateActive": "0001-01-01T00:00:00",
                "DateInactive": null,
                "ContractNumber": null,
                "Did": null,
                "ContactName": null,
                "ContactEmail": null,
                "ContactPhone": null,
                "Left": 0,
                "Right": 0
            },
            {
                "Name": "Organization B",
                "Id": "bogus-bogus-bogus",
                "DateActive": "0001-01-01T00:00:00",
                "DateInactive": null,
                "ContractNumber": null,
                "Did": null,
                "ContactName": null,
                "ContactEmail": null,
                "ContactPhone": null,
                "Left": 0,
                "Right": 0
            }
        ];

        $scope.toggleSelection = function() {
            $scope.isSelected = ! $scope.isSelected;
        };
    });
