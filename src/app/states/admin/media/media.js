var module = angular.module('cortex.states.admin.media', [
    'ui.router.state',
    'cortex.states.admin.media.manage',
    'cortex.states.admin.media.edit',
    'cortex.states.admin.media.new'
]);

module.config(function($stateProvider){
   $stateProvider.state('admin.media', {
       url: '/media',
       abstract: true,
       template: '<div class="admin-media" ui-view></div>'
   });
});
