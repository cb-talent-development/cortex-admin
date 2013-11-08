/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.tenants', [
        'ui.router.state',
        'cortex.admin.organizations.tenants.hierarchy'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('admin.organizations.tenants', {
            abstract: true,
            url: '/tenants',
            template: '<ui-view/>'
        });
    });
