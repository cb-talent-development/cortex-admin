var module = angular.module('cortex.states.admin.assets', [
    'ui.router.state',
    'cortex.states.admin.assets.manage'
]);

module.config(function($stateProvider){
    $stateProvider
        .state('admin.assets',{
            url: '/assets',
            abstract: true,
            templateUrl: 'states/admin/assets/assets.tpl.html'
        });
});
