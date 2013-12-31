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

module.constant('gridTemplates', {
    viewAssetLinkCell: "<div class='ngCellText'><a ui-sref='admin.assets.edit({assetId: row.getProperty(\"id\")})'>{{row.getProperty(col.field)}}</a></div>",
    assetThumbCell: "<div class='ngCellText'><img src='{{row.getProperty(col.field)}}' /></div>"
});

module.controller('AssetsGridCtrl', function($scope, Assets, templates, gridTemplates){

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
        rowHeight: 110,
        columnDefs: [
            {field: 'name', displayName: 'Name', cellTemplate: gridTemplates.viewAssetLinkCell},
            {field: 'description', displayName: 'Description'},
            {field: 'creator.name', displayName: 'Author'},
            {field: 'created_at|date:"y/M/d h:mm:ss a"', displayName: 'Created'},
            {field: 'updated_at|date:"y/M/d h:mm:ss a"', displayName: 'Modified'},
            {
                // Unicode checkmark if deactive_at is null
                field: 'active ? "\u2713" : ""',
                displayName: 'Active',
                width: 43,
                cellTemplate: templates.ngGridCells.centerAligned
            },
            {field: 'tags|tagList', displayName: 'Tags'},
            {field: 'thumb.mini', displayName: 'Thumbnail', cellTemplate: gridTemplates.assetThumbCell}
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