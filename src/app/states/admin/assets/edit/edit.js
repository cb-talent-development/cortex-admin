var module = angular.module('cortex.states.admin.assets.edit', [
    'ui.router.state']);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.edit', {
        url: '/:assetId',
        template: 'Edit Asset',
        controller: 'AssetsEditCtrl'
    });
});

module.controller('AssetsEditCtrl', function(){
});