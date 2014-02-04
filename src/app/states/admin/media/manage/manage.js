var module = angular.module('cortex.states.admin.media.manage', [
    'ui.router.state',
    'cortex.states.admin.media.manage.components'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.media.manage', {
        url: '',
        abstract: true,
        templateUrl: 'states/admin/media/manage/manage.tpl.html',
        controller: 'MediaManageCtrl'
    });
});

module.controller('MediaManageCtrl', function($scope){
    $scope.data = {filters: {}};
});
