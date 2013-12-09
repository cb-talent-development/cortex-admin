var module = angular.module('cortex.states.admin', [
    'ui.router.state',
    'angular-flash.flash-alert-directive',
    'cortex.states.admin.organizations',
    'cortex.states.admin.assets',
    'cortex.states.admin.packages',
    'cortex.states.admin.permissions',
    'cortex.states.admin.products'
]);

module.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'states/admin/admin.tpl.html'
    });
});
