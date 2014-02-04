var module = angular.module('cortex.states.admin.media.new', [
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
    $stateProvider.state('admin.media.new', {
        url: '/new',
        templateUrl: 'states/admin/media/new/new.tpl.html',
        controller: 'MediaNewCtrl'
    });
});

module.controller('MediaNewCtrl', function($scope, $timeout, $upload, $state, flash, config, authService) {

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
        media: {}
    };

    $scope.startUpload = function() {

        var file = $scope.data.upload.file;

        if (!file) {
            return;
        }

        var httpConfig = {
            url: config.api.baseUrl + '/media',
            method: 'POST',
            data: {media: $scope.data.media},
            file: file,
            fileFormDataName: 'media[attachment]',
            formDataAppender: function(formData, key, value) {
                if (key === 'media') {
                    angular.forEach(value, function(v, k) {
                        formData.append('media[' + k + ']', v);
                    });
                }
            }
        };

        authService.addAuth(httpConfig);

        $scope.upload = $upload.upload(httpConfig)
        .progress(function(e) {
            $scope.data.upload.progress = parseInt(100.0 * e.loaded / e.total);
        })
        .success(function(media) {
            flash.success = media.name + " created";
            $state.go('admin.media.manage.components');
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