var module = angular.module('cortex.states.admin.assets.edit', [
    'ui.router.state',
    'angular-flash.service',
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

module.controller('AssetsEditCtrl', function($scope, $stateParams, $filter, flash, Assets) {
    $scope.data = {};

    $scope.asset = Assets.get({id: $stateParams.assetId}, function(asset) {
        $scope.data.tags = $filter('tagList')(asset.tags);
    });

    $scope.save = function() {
        $scope.asset.tag_list = $scope.data.tags;
        delete $scope.asset.tags;

        $scope.asset.$save(function(asset) {
            var message = 'Saved asset "' +  asset.name + '"';

            flash.success = asset.tag_list;
        });
    };
});
