/// <reference path="/reference.js"/>

angular.module('cortex.tenant.hierarchy', [
])

.config(function ($stateProvider) {
    $stateProvider
        .state('admin.tenant.hierarchy', {
            url: '/hierarchy',
            controller: 'TenantHierarchyCtrl',
            templateUrl: 'admin/tenant/hierarchy/tenant-hierarchy.tpl.html'
        });
})


.controller('TenantHierarchyCtrl', function () {

});