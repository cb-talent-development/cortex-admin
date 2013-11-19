var module = angular.module('cortex.states.admin.assets.manage', [
    'ui.router.state',
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

    $scope.data.assets =
    {
        filename: null,
        author: null,
        type: null
    };

    $scope.data.assets = Assets.query(function(response){
    });
});
