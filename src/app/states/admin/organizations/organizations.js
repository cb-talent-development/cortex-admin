/// <reference path="/reference.js"/>

var module = angular.module('cortex.states.admin.organizations', [
    'ui.router.state',
    'cortex.resources.organizations',
    'cortex.states.admin.organizations.tenants'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations', {
            abstract: true,
            url: '/organizations/:organizationId',
            templateUrl: 'states/admin/organizations/organizations.tpl.html'
        })
        .state('admin.organizations.select', {
            views: {'organizations-select': {templateUrl: 'states/admin/organizations/select.tpl.html'}}
        });
});