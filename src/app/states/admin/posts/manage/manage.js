var module = angular.module('cortex.states.admin.posts.manage', [
    'ui.router.state',
    'cortex.states.admin.posts.manage.components'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.posts.manage', {
        url: '',
        abstract: true,
        templateUrl: 'states/admin/posts/manage/manage.tpl.html',
        controller: 'PostsEditCtrl'
    });
});

module.controller('PostsEditCtrl', function($scope){
    $scope.data = {filters: {}};
});