var module = angular.module('cortex.states.admin.assets.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'cortex.resources.assets']);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.manage.components', {
        url: '/',
        views: {
            'assets-grid': { templateUrl: 'states/admin/assets/manage/grid.tpl.html', controller: 'AssetsGridCtrl' },
            'assets-filters': { templateUrl: 'states/admin/assets/manage/filters.tpl.html', controller: 'AssetsFiltersCtrl' }
        }
    });
});

module.controller('AssetsGridCtrl', function($scope, Assets){
    /*
    // Create a generic grid factory for Cortex? This will be boilerplate for a ton of our resource grids
    $scope.data = {};
    $scope.data.totalServerItems = 0;

    $scope.data.assets = Assets.query(function(response) {
        $scope.data.totalServerItems = response.length;
    });

    $scope.data.pagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };

    $scope.gridOptions = {
        data: 'data.assets',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'data.totalServerItems',
        pagingOptions: $scope.data.pagingOptions
    };*/
});

module.controller('AssetsFiltersCtrl', function($scope){

    $scope.data = {
        assetTypes: [
            {name: 'Archive', extensions: '.zip'}
        ],
        filters: {
            date: {
                property: 'create_date'
            }
        }
    };

    $scope.data.filters.assetTypeGrid = { data: 'data.assetTypes' }
});