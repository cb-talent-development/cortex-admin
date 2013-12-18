var module = angular.module('cortex.states.admin.assets.edit', [
    'ui.router.state',
    'common.filters',
    'cortex.resources.assets'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.edit', {
        url: '/:assetId/edit',
        templateUrl: 'states/admin/assets/edit/edit.tpl.html',
        controller: 'AssetsEditCtrl'
    });
});

module.controller('AssetsEditCtrl', function($scope, $stateParams, Assets) {
    $scope.asset = Assets.get({id: $stateParams.assetId});
});
