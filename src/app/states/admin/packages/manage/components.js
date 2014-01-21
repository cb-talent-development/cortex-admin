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
            {field: 'postheadline', displayName: 'Post Headline'},
            {field: 'posttype', displayName: 'Post Type'},
            {field: 'postdate', displayName: 'Post Date'},
            {field: 'postpublished', displayName: 'Post published'},
            {field: 'postauthor', displayName: 'Post Author'},
            {field: 'postcategories', displayName: 'Post Categories'},
            {field: 'posttags', displayName: 'Post tags'},
            {field: 'postcomments', displayName: 'Post comments'},
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