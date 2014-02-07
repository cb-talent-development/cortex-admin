var module = angular.module('cortex.states.admin.media.edit', [
    'ui.router.state',
    'ui.bootstrap.datepicker',
    'angular-flash.service',
    'common.filters',
    'common.unsavedChanges',
    'cortex.resources.media'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.media.edit', {
        url: '/:mediaId/edit',
        templateUrl: 'states/admin/media/edit/edit.tpl.html',
        controller: 'MediaEditCtrl'
    });
});

module.controller('MediaEditCtrl', function($scope, $filter, $stateParams, $state, $timeout, flash, Media, unsavedChanges) {
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        expireAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };

    $scope.data = {};

    $scope.media = Media.get({id: $stateParams.mediaId}, function(media) {
        unsavedChanges.fnListen($scope, $scope.media);

        $scope.data.tags = $filter('tagList')(media.tags);
    });

    $scope.update = function() {
        $scope.media.tag_list = $scope.data.tags;
        delete $scope.media.tags;

        $scope.media.$save(function(media) {
            unsavedChanges.fnListen($scope, $scope.media);

            flash.success = 'Saved media "' +  media.name + '"';
            $state.go('admin.media.manage.components');
        });
    };

    $scope.cancel = function() {
        $state.go('admin.media.manage.components');
    };
});
