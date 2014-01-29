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

    var updatePage = function(page) {
        $state.go('.', {page: page, perPage: $scope.page.perPage, query: $scope.page.query});
    };

    $scope.page = {
        query:      $stateParams.query,
        firstQuery: true, // Urgh... remove this once delayedInput doesn't stink and call ng-changed twice
        page:       parseInt($stateParams.page) || 1,
        perPage:    parseInt($stateParams.perPage) || config.pagingDefaults.perPage,
        next: function() {
            updatePage($scope.page.page + 1);
        },
        previous: function() {
            updatePage($scope.page.page - 1);
        },
        flip: function(page) {
            updatePage(page);
        }
    };

    $scope.$watch('page.query', function(query) {
        if ($scope.page.firstQuery) {
            $scope.page.firstQuery = undefined;
            return;
        }        
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