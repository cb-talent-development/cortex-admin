var module = angular.module('cortex.states.admin.posts', [
    'ui.router.state',
    'cortex.states.admin.posts.manage',
    'cortex.states.admin.posts.edit'
    ]);

module.config(function($stateProvider){
    $stateProvider.state('admin.posts', {
        url: '/posts',
        abstract: true,
        template: '<div class="admin-posts" ui-view></div>'
    });
});
