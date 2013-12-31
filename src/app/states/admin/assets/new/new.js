var module = angular.module('cortex.states.admin.assets.new', [
    'ngCookies',
    'ui.router.state',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.progressbar',
    'angularFileUpload',
    'angular-flash.service',
    'cortex.config',
    'cortex.services.auth',
    'cortex.config'
]);

module.config(function($stateProvider){
    $stateProvider.state('admin.assets.new', {
        url: '/new',
        templateUrl: 'states/admin/assets/new/new.tpl.html',
        controller: 'AssetsNewCtrl'
    });
});

module.controller('AssetsNewCtrl', function($scope, $timeout, $upload, $state, flash, config, authService) {

    // angular-bootstrap datepicker settings
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        expireAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };

    $scope.data = {
        upload: {
            progress: 0,
            file: null
        },
        asset: {}
    };

    $scope.startUpload = function() {

        var file = $scope.data.upload.file;

        if (!file) {
            return;
        }

        var httpConfig = {
            url: config.api.baseUrl + '/assets',
            method: 'POST',
            data: {asset: $scope.data.asset},
            file: file,
            fileFormDataName: 'asset[attachment]',
            formDataAppender: function(formData, key, value) {
                if (key === 'asset') {
                    angular.forEach(value, function(v, k) {
                        formData.append('asset[' + k + ']', v);
                    });
                }
            }
        };

        authService.addAuth(httpConfig);

        $scope.upload = $upload.upload(httpConfig)
        .progress(function(e) {
            $scope.data.upload.progress = parseInt(100.0 * e.loaded / e.total);
        })
        .success(function(asset) {
            flash.success = asset.name + " created";
            $state.go('admin.assets.manage.components');
        });
    };

    $scope.onFileSelect = function(files) {
        var file = files[0];
        $scope.data.upload.file = file;
    };

    $scope.remove = function() {
        $scope.data.upload.file = null;
    };
});