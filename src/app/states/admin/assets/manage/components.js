var module = angular.module('cortex.states.admin.assets.manage.components', [
    'ui.router.state',
    'ngGrid',
    'ui.bootstrap',
    'common.templates',
    'cortex.resources.assets',
    'cortex.directives.delayedInput'
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

    $scope.data.assets = Assets.query(function(response, headers, pagination) {
        $scope.data.totalServerItems = response.length;
    });

    $scope.searchAssets = function(query) {
        $scope.data.assets = Assets.$search({q: query});
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