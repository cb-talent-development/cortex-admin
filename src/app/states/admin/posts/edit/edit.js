var module = angular.module('cortex.states.admin.posts.edit', [
    'ngCookies',
    'ui.router.state',
    'ui.bootstrap.buttons',
    'ui.bootstrap.datepicker',
    'cortex.config',
    'cortex.services.auth',
    'cortex.config',
    'ui.router.state',
    'cortex.resources.posts'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.posts.new', {
            url: '/new',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'PostsEditCtrl'
        })
        .state('admin.posts.edit', {
            url: '/:postId/edit',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'PostsEditCtrl'
        });
});


module.controller('PostsEditCtrl', function($scope, $stateParams, Posts, $timeout) {
    $scope.data = {
        savePost: function() {
            $scope.data.post.$save(function(post) {
                flash.success = 'Saved "' + post.title + '"';
            });
        },
        post: $stateParams.postId ? Posts.get({id: $stateParams.postId}) : new Posts()

    };

    // angular-bootstrap datepicker settings
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        publishAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };
});
