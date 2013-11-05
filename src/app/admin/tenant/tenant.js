/// <reference path="/reference.js"/>

angular.module('cortex.tenant', [
    'cortex.tenant.select',
    'cortex.tenant.heirarchy'
])

.config(function ($stateProvider) {
    $stateProvider
        .state('admin.tenant', {
            url: '/admin/tenant',
            controller: 'TenantCtrl',
            templateUrl: 'admin/tenant/tenant.tpl.html'
        });
})

.controller('TenantCtrl', function() {
    
});