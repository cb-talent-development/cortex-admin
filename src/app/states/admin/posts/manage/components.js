var module = angular.module('cortex.states.admin.posts.manage.components', [
    'ui.router.state',
    'ngTable',
    'ui.bootstrap',
    'cortex.resources.posts'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.posts.manage.components', {
        url: '/',
        views: {
            'posts-grid': { templateUrl: 'states/admin/posts/manage/grid.tpl.html', controller: 'PostsGridCtrl' },
            'posts-filters': { templateUrl: 'states/admin/posts/manage/filters.tpl.html', controller: 'PostsFiltersCtrl' }
        }
    });
});

module.controller('PostsGridCtrl', function($scope, Posts){
    $scope.data = {
        totalServerItems: 0,
        posts: Posts.query()        
    };
});

module.controller('PostsFiltersCtrl', function($scope){

    $scope.data = {
        postTypes: [
            {name: 'Article'},
            {name: 'Graphic'},
            {name: 'Promo'},
            {name: 'Video'}
        ],
        filters: {
            date: {
                property: 'create_date'
            }
        }
    };
});