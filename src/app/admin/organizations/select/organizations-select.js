/// <reference path="/reference.js"/>

angular.module('cortex.admin.organizations.select', [
    'ui.router.state'
])

.config(function ($stateProvider) {
    $stateProvider.state('admin.organizations.select', {
        url: '/select',
        controller: 'OrganizationsSelectCtrl',
        templateUrl: 'admin/organizations/select/organizations-select.tpl.html'
    });
})

.controller('OrganizationsSelectCtrl', function () {
});