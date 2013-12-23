var module = angular.module('cortex.states.admin.assets.edit', [
    'ui.router.state',
    'angular-flash.service',
    'common.filters',
    'common.unsavedChanges',
    'cortex.resources.assets'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.edit', {
        url: '/:assetId/edit',
        templateUrl: 'states/admin/assets/edit/edit.tpl.html',
        controller: 'AssetsEditCtrl'
    });
});

module.controller('AssetsEditCtrl', function($scope, $stateParams, $state, $filter, flash, Assets, unsavedChanges) {
    $scope.data = {};

    $scope.asset = Assets.get({id: $stateParams.assetId}, function(asset) {
        unsavedChanges.fnListen($scope, $scope.asset);

        $scope.data.tags = $filter('tagList')(asset.tags);
    });

    $scope.update = function() {
        $scope.asset.tag_list = $scope.data.tags;
        delete $scope.asset.tags;

        $scope.asset.$save(function(asset) {
            unsavedChanges.fnListen($scope, $scope.asset);

            flash.success = 'Saved asset "' +  asset.name + '"';
            $state.go('admin.assets.manage.components');
        });
    };

    $scope.cancel = function() {
        $state.go('admin.assets.manage.components');
    };
});
