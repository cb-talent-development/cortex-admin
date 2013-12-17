var module = angular.module('cortex.states.admin.packages.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'common.templates',
    'cortex.resources.posts'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.packages.manage.components', {
        url: '/',
        views: {
            'packages-grid': { templateUrl: 'states/admin/packages/manage/grid.tpl.html', controller: 'PackagesGridCtrl' },
            'packages-filters': { templateUrl: 'states/admin/packages/manage/filters.tpl.html', controller: 'PackagesFiltersCtrl' }
        }
    });
});

module.controller('PackagesGridCtrl', function($scope, Posts, templates){

    // Create a generic grid factory for Cortex? This will be boilerplate for a ton of our resource grids
    $scope.data = {};
    $scope.data.totalServerItems = 0;

    $scope.data.assets = Posts.query(function(response) {
    });

    var assetGridPagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };

    $scope.data.assetGridOptions = {
        data: 'data.assets',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'data.totalServerItems',
        pagingOptions: assetGridPagingOptions,
        columnDefs: [
            {field: 'title', displayName: 'Title'},
            {field: 'type', displayName: 'Type'},
            {field: 'created_at', displayName: 'Created'},
            {field: 'published_at|publishStatus', displayName: 'Status'},
            {field: 'publish_location', displayName: 'Published On'},
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

module.controller('PackagesFiltersCtrl', function($scope){

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