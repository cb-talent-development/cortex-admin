describe('Admin View Asset Module', function() {

    beforeEach(function(){
        angular.mock.module('cortex.states.admin.assets.view');
        testing.provideConfig(testing.config.withEmptyApiBaseUrl);
    });

    describe('View Asset Controller', function() {
        var constructController, $httpBackend, $scope, $stateParams;

        beforeEach(inject(function($controller, _$httpBackend_, $rootScope, Assets){
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $stateParams = {};

            $scope.data = {};

            constructController = function() {
                controller = $controller('AssetsViewCtrl', {
                    $scope: $scope,
                    $stateParams: $stateParams,
                    Assets: Assets
                });
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should fetch the existing resource for an Asset if assetId exists', function() {
            $stateParams.assetId = 1;
            $httpBackend.expectGET('/assets/1').respond({id: 1});

            constructController();
            $httpBackend.flush();

            expect($scope.asset).toBeTruthy();
            expect($scope.asset.id).toEqual(1);
        });
    });
});