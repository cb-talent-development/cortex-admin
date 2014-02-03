var module = angular.module('cortex.states.admin.assets.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'placeholders.img',
    'cortex.config',
    'cortex.resources.assets',
    'cortex.directives.delayedInput'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.manage.components', {
        url: '/:page/:perPage/:query',
        views: {
            'assets-grid': {
                templateUrl: 'states/admin/assets/manage/grid.tpl.html',
                controller: 'AssetsGridCtrl'
            },
            'assets-filters': {
                templateUrl: 'states/admin/assets/manage/filters.tpl.html',
                controller: 'AssetsFiltersCtrl'
            }
        }
    });
});

module.controller('AssetsGridCtrl', function($scope, $stateParams, $state, Assets, config){

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

    $scope.data.assets = Assets.searchPaged({q: $scope.page.query, 
                                             per_page: $scope.page.perPage, 
                                             page: $scope.page.page}, 
                                             function(assets, headers, paging) {
        $scope.data.paging = paging;
    });
});

module.controller('AssetsFiltersCtrl', function($scope){

    $scope.data = {
        assetTypes: [
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