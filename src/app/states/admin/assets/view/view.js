var module = angular.module('cortex.states.admin.assets.view', [
    'ui.router.state',
    'common.filters',
    'cortex.resources.assets'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.view', {
        url: '/:assetId',
        templateUrl: 'states/admin/assets/view/view.tpl.html',
        controller: 'AssetsViewCtrl'
    });
});

module.controller('AssetsViewCtrl', function($scope, $stateParams, Assets) {
    $scope.asset = Assets.get({id: $stateParams.assetId});
});
