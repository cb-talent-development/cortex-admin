var module = angular.module('cortex.states.admin.posts.edit', [
    'ui.router.state'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.posts.new', {
            url: '/new',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'EditPostsCtrl'
        })
        .state('admin.posts.edit', {
            url: '/:postId/edit',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'EditPostsCtrl'
        });
});

module.controller('EditPostsCtrl', function($scope) {
});
