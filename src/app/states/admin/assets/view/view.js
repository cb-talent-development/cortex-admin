var module = angular.module('cortex.states.admin.assets.view', [
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.view', {
        url: '/:assetId',
        templateUrl: 'states/admin/assets/view/view.tpl.html',
        controller: 'AssetsViewCtrl'
    });
});

module.controller('AssetsViewCtrl', function($scope) {
});
