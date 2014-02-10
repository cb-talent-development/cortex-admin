var module = angular.module('cortex.controllers.admin.media.grid', [
    'ui.router.state',
    'ui.bootstrap',
    'placeholders.img',
    'angular-flash.service',
    'cortex.config',
    'cortex.resources.media',
    'cortex.directives.delayedInput'
]);

module.controller('MediaGridCtrl', function($scope, $stateParams, $state, Media, config, flash){

    var updatePage = function() {
        $state.go('.', {page: $scope.page.page, perPage: $scope.page.perPage, query: $scope.page.query});
    };

    $scope.page = {
        query: $stateParams.query,
        page: parseInt($stateParams.page) || 1,
        perPage: parseInt($stateParams.perPage) || config.pagingDefaults.perPage,
        next: function() {
            $scope.page.page++;
            updatePage();
        },
        previous: function() {
            $scope.page.page--;
            updatePage();
        },
        flip: function(page) {
            $scope.page.page = page;
            updatePage();
        }
    };

    $scope.$watch('page.query', function() {
        updatePage();
    });

    $scope.data.media = Media.searchPaged({q: $scope.page.query,
            per_page: $scope.page.perPage,
            page: $scope.page.page},
        function(media, headers, paging) {
            $scope.data.paging = paging;
        });

    $scope.deleteMedia = function(media) {
        if (confirm('Are you sure you want to delete "' +  media.name + '?"')) {
            Media.delete({id: media.id}, function() {
                $scope.data.media = _.reject($scope.data.media, function(m) { return m.id == media.id; });
                flash.info = media.name + " deleted.";
            });
        }
    };
});
