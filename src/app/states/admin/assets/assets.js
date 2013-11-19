var module = angular.module('cortex.states.admin.assets', [
    'ui.router.state',
    'cortex.states.admin.assets.manage',
    'cortex.states.admin.assets.edit'
]);

module.config(function($stateProvider){
   $stateProvider.state('admin.assets', {
       url: '/assets',
       abstract: true,
       template: '<ui-view/>'
   });
});