var module = angular.module('cortex.states.admin.posts.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'common.templates',
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

module.controller('PostsGridCtrl', function($scope, Posts, templates){

    $scope.data = {};
    $scope.data.totalServerItems = 0;

    $scope.data.posts = Posts.query(function(response) {
    });

    var postGridPagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };

    $scope.data.postGridOptions = {
        data: 'data.posts',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'data.totalServerItems',
        pagingOptions: postGridPagingOptions,
        columnDefs: [
            {field: 'title', displayName: 'Title'},
            {field: 'type', displayName: 'Type'},
            {field: 'published_at|publishStatus', displayName: 'Status'},
            {field: 'author.name', displayName: 'Author'},
            {field: 'categories|tagList', displayName: 'Categories'},
            {field: 'created_at|date:"d/M/y h:mm:ss a"', displayName: 'Created'},
            {field: 'updated_at|date:"d/M/y h:mm:ss a"', displayName: 'Modified'},
            {
                // Unicode checkmark if delete_date is null
                field: 'delete_date == null ? "\u2713" : ""',
                displayName: 'Active',
                width: 43,
                cellTemplate: templates.ngGridCells.centerAligned
            },
            {field: "tags.join(', ')", displayName: 'Tags'},
            {
                field: 'comment_count', 
                displayName: 'Comments',
                width: 70,
                cellTemplate: templates.ngGridCells.centerAligned
            }
        ]
    };
});

module.controller('PostsFiltersCtrl', function($scope){

    $scope.data = {
        assetTypes: [
            {name: 'Article', extensions: ['zip']},
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