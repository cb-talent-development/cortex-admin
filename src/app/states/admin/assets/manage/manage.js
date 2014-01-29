var module = angular.module('cortex.states.admin.assets.manage', [
    'ui.router.state',
    'cortex.states.admin.assets.manage.components'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.manage', {
        url: '',
        abstract: true,
        templateUrl: 'states/admin/assets/manage/manage.tpl.html',
        controller: 'AssetsManageCtrl'
    });
});

module.controller('AssetsManageCtrl', function($scope){
    $scope.data = {filters: {}};
});
