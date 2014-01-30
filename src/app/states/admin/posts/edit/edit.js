var module = angular.module('cortex.states.admin.posts.edit', [
    'ui.router.state',
    'cortex.resources.posts'
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

module.controller('EditPostsCtrl', function($scope, $stateParams, Posts) {
    $scope.data = {
        savePost: function() {
            $scope.data.post.$save(function(post) {
                flash.success = 'Saved "' + post.title + '"';
            });            
        },
        post: $stateParams.postId ? Posts.get({id: $stateParams.postId}) : new Posts()
    };
});
