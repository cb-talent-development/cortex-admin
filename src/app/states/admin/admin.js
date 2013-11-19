var module = angular.module('cortex.states.admin', [
    'ui.router.state',
    'cortex.states.admin.organizations',
    'cortex.states.admin.assets'
]);

module.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'states/admin/admin.tpl.html'
    });
});
