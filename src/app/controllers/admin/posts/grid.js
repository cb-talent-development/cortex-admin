var module = angular.module('cortex.controllers.admin.posts.grid', [
    'ngTable',
    'ui.bootstrap',
    'cortex.resources.posts'
]);

module.controller('PostsGridCtrl', function($scope, Posts){
    $scope.data = {
        totalServerItems: 0,
        posts: Posts.query()
    };
});
