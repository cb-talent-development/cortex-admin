/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations', [
        'ui.router.state',
        'cortex.admin.organizations.select',
        'cortex.admin.organizations.tenants'
    ])

    .config(function ($stateProvider) {
        $stateProvider
            .state('admin.organizations', {
                url: '/organizations',
                controller: 'OrganizationsCtrl',
                templateUrl: 'admin/organizations/organizations.tpl.html'
            });
    })

    .controller('OrganizationsCtrl', function () {
    });