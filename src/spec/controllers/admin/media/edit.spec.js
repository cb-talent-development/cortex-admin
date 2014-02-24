describe('Admin Edit Media Module', function() {

    beforeEach(function(){
        angular.mock.module('cortex.controllers.admin.media.edit');
        testing.provideConfig(testing.config.withEmptyApiBaseUrl);
        testing.provideSession();
    });

    describe('Edit Media Controller', function() {
        var constructController, $httpBackend, $scope, $stateParams;

        beforeEach(inject(function($controller, _$httpBackend_, $rootScope, Media){
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $stateParams = {};

            $scope.data = {};

            constructController = function() {
                controller = $controller('MediaEditCtrl', {
                    $scope: $scope,
                    $stateParams: $stateParams,
                    Media: Media
                });
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should fetch the existing resource for a Media if mediaId exists', function() {
            $stateParams.mediaId = 1;
            $httpBackend.expectGET('/media/1').respond({id: 1});

            constructController();
            $httpBackend.flush();

            expect($scope.media).toBeTruthy();
            expect($scope.media.id).toEqual(1);
        });
    });
});
