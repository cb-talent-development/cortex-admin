var module = angular.module('cortex.states.admin.assets.edit', [
    'ngCookies',
    'ui.router.state',
    'angularFileUpload',
    'cortex.config',
    'cortex.services.auth'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.edit', {
        url: '/:assetId',
        templateUrl: 'states/admin/assets/edit/edit.tpl.html',
        controller: 'AssetsEditCtrl'
    });
});

module.controller('AssetsEditCtrl', function($scope, $upload, config, authService){
    $scope.data = {};

    $scope.onFileSelect = function($files) {

        var httpConfig = {
            url: config.api.baseUrl + '/assets',
            data: {},
            attachment: $files[0]
        };
        authService.addAuth(httpConfig);

        $scope.upload = $upload.upload(httpConfig)
            .progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            })
            .success(function(data) {
                console.log(data);
            });
    };

});