var module = angular.module('cortex.states.admin.packages', [
    'ui.router.state',
    'cortex.states.admin.packages.manage'
    ]);

module.config(function($stateProvider){
    $stateProvider.state('admin.packages', {
        url: '/packages',
        abstract: true,
        template: '<div class="admin-packages" ui-view></div>'
    });
});
