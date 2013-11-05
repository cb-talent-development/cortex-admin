/// <reference path="/reference.js"/>

angular.module('cortex.admin', [
    'ui.router.state'
])

.config(function ($stateProvider) {
    $stateProvider.state('admin', {
            url: '/admin',
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
        });
})

.controller('AdminCtrl', function () {
});