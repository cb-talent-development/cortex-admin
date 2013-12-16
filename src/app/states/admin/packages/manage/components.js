var module = angular.module('cortex.states.admin.packages.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'common.templates',
    'cortex.resources.assets'
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

module.controller('PackagesGridCtrl', function($scope, Assets, templates){

    // Create a generic grid factory for Cortex? This will be boilerplate for a ton of our resource grids
    $scope.data = {};
    $scope.data.totalServerItems = 0;

    $scope.data.assets = Assets.query(function(response) {
        $scope.data.totalServerItems = response.length;
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
            {field: 'headline', displayName: 'Headline'},
            {field: 'package_type', displayName: 'Type'},
            {field: 'date', displayName: 'Date'},
            {field: 'status', displayName: 'Status'},
            {field: 'publish_location', displayName: 'Publish Location'},
            {field: 'creator.name', displayName: 'Author'},
            {field: 'categories', displayName: 'Categories'},
            {field: 'created_at|date:"d/M/y h:mm:ss a"', displayName: 'Created'},
            {field: 'updated_at|date:"d/M/y h:mm:ss a"', displayName: 'Modified'},
            {
                // Unicode checkmark if delete_date is null
                field: 'delete_date == null ? "\u2713" : ""',
                displayName: 'Active',
                width: 43,
                cellTemplate: templates.ngGridCells.centerAligned
            },
            {field: 'tags|tagList', displayName: 'Tags'},
            {field: 'comment_count', displayName: 'Comments'}
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