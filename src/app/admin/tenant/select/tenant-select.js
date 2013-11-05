/// <reference path="/reference.js"/>

angular.module('cortex.admin.tenant.select', [
    'ui.router.state'
])

.config(function ($stateProvider) {
    $stateProvider.state('admin.tenant.select', {
        url: '/select',
        controller: 'TenantSelectCtrl',
        templateUrl: 'admin/tenant/select/tenant-select.tpl.html'
    });
})

.controller('TenantSelectCtrl', function () {
});