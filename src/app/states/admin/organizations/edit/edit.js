var module = angular.module('cortex.states.admin.organizations.edit', [
    'ui.router.state',
    'angular-underscore',
    'cortex.states.admin.organizations.edit.tenants'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations.edit', {
            url: '',
            template: '<ui-view/>',
            abstract: true
        });
});
