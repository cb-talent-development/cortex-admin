/// <reference path="/reference.js"/>

angular.module('cortex.tenant.select', [
])

.config(function ($stateProvider) {
    $stateProvider
        .state('admin.tenant.select', {
            url: '/select',
            controller: 'TenantSelectCtrl',
            templateUrl: 'admin/tenant/select/tenant-select.tpl.html'
        });
})

.controller('TenantSelectCtrl', function () {

});