var module = angular.module('cortex.states.admin.assets.manage', [
    'ui.router.state',
    'ngGrid',
    'cortex.resources.assets'
]);

module.config(function($stateProvider){
    $stateProvider
        .state('admin.assets.manage',{
            url: '/manage/:assetId',
            views:
            {
                'assets-gridview':
                {
                    templateUrl: 'states/admin/assets/manage/gridview.tpl.html',
                    controller: 'AssetsGridviewCtrl'
                }
            }
        });
});

module.controller('AssetsGridviewCtrl', function($scope, Assets) {

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
    };
});
