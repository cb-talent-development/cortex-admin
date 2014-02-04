var module = angular.module('cortex.states.admin.media.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'placeholders.img',
    'cortex.config',
    'cortex.resources.media',
    'cortex.directives.delayedInput'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.media.manage.components', {
        url: '/:page/:perPage/:query',
        views: {
            'media-grid': {
                templateUrl: 'states/admin/media/manage/grid.tpl.html',
                controller: 'MediaGridCtrl'
            },
            'media-filters': {
                templateUrl: 'states/admin/media/manage/filters.tpl.html',
                controller: 'MediaFiltersCtrl'
            }
        }
    });
});

module.controller('MediaGridCtrl', function($scope, $stateParams, $state, Media, config){

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
});

module.controller('MediaFiltersCtrl', function($scope){

    $scope.data = {
        mediaTypes: [
            {name: 'Archive', extensions: ['zip']},
            {name: 'Document', extensions: ['doc', 'docx']},
            {name: 'Image', extensions: ['jpg', 'png', 'gif']},
            {name: 'PDF', extensions: ['pdf']},
            {name: 'Spreadsheet', extensions: ['xls', 'xlsx']},
            {name: 'Text', extensions: ['txt']},
            {name: 'Video', extensions: ['avi', 'mov', 'mp4']}
        ],
        filters: {
            date: {
                property: 'create_date'
            }
        }
    };
});