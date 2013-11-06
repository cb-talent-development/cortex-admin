/// <reference path="/reference.js"/>

angular.module('cortex.admin.tenant', [
    'ui.router.state',
    'cortex.admin.tenant.hierarchy',
    'cortex.admin.tenant.select'
])

.config(function ($stateProvider) {
    $stateProvider
        .state('admin.tenant', {
            url: '/tenant',
            controller: 'TenantCtrl',
            templateUrl: 'admin/tenant/tenant.tpl.html'
        });
})

.controller('TenantCtrl', function() {
});