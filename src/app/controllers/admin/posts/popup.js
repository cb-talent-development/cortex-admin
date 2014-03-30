var module = angular.module('cortex.controllers.admin.posts.popup', [
    'ui.router.state'
]);

module.controller('PostsPopupCtrl', function($scope, $timeout, $state, PostsPopupService){
    $scope.postsPopupService = PostsPopupService;

    $scope.$watch('postsPopupService.popupOpen', function(popupOpen) {
        if (!popupOpen) {
            // We are arbitrary levels deep, so we can't transition relative to our current state.
            if ($state.includes('admin.posts.new')) {
                // We need to wait 250ms, long enough for bootstrap-modal to fade away, otherwise we're stuck with a blocked-out page
                $timeout(function () { $state.go('admin.posts.new'); }, 250);
            }
            else {
                $timeout(function () { $state.go('admin.posts.edit'); }, 250);
            }
        }
    });
});

module.factory('PostsPopupService', function() {
    return {
        popupOpen: true
    };
});