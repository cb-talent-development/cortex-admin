var module = angular.module('cortex.states.admin.packages.manage', [
    'ui.router.state',
    'cortex.states.admin.packages.manage.components'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.packages.manage', {
        url: '',
        abstract: true,
        templateUrl: 'states/admin/packages/manage/manage.tpl.html',
        controller: 'PackagesEditCtrl'
    });
});

module.controller('PackagesEditCtrl', function($scope){

    $scope.data = {filters: {}};

});