var module = angular.module('cortex.states.admin', [
    'ui.router.state',
    'cortex.states.admin.organizations',
    'cortex.states.admin.assets',
    'cortex.states.admin.packages',
    'cortex.states.admin.permissions',
    'cortex.states.admin.products'
]);

module.run(function ($rootScope, $state, $stateParams) {
    // We can access $state and $stateParams from within any scope in our application
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

module.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'states/admin/admin.tpl.html'
    });
});
