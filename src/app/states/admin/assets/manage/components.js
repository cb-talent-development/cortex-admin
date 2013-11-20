var module = angular.module('cortex.states.admin.assets.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'common.templates',
    'cortex.resources.assets'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.manage.components', {
        url: '/',
        views: {
            'assets-grid': { templateUrl: 'states/admin/assets/manage/grid.tpl.html', controller: 'AssetsGridCtrl' },
            'assets-filters': { templateUrl: 'states/admin/assets/manage/filters.tpl.html', controller: 'AssetsFiltersCtrl' }
        }
    });
});

module.controller('AssetsGridCtrl', function($scope, Assets, templates){

    // Create a generic grid factory for Cortex? This will be boilerplate for a ton of our resource grids
    $scope.data = {};
    $scope.data.totalServerItems = 0;

    $scope.data.assets = Assets.query(function(response) {
        $scope.data.totalServerItems = response.length;
    });

    var assetGridPagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };

    $scope.data.assetGridOptions = {
        data: 'data.assets',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'data.totalServerItems',
        pagingOptions: assetGridPagingOptions,
        columnDefs: [
            {field: 'original_filename', displayName: 'Name'},
            {field: 'name', displayName: 'Description'},
            {field: 'creator.username', displayName: 'Author'},
            {field: 'create_date|date:"y/M/d h:mm:ss a"', displayName: 'Created'},
            {field: 'update_date|date:"y/M/d h:mm:ss a"', displayName: 'Modified'},
            {
                // Unicode checkmark if delete_date is null
                field: 'delete_date == null ? "\u2713" : ""',
                displayName: 'Active',
                width: 43,
                cellTemplate: templates.ngGridCells.centerAligned
            },
            {field: 'tags.join(", ")', displayName: 'Tags'}
        ]
    };
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