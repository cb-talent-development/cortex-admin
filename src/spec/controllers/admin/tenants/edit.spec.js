describe('Admin Edit Tenants Module', function() {

    beforeEach(function(){
        angular.mock.module('cortex.controllers.admin.tenants.edit');
        testing.provideConfig(testing.config.withEmptyApiBaseUrl);
        testing.provideSession();
    });

    describe('Edit Tenants Controller', function() {
        var constructController, $httpBackend, $scope, $stateParams;

        beforeEach(inject(function($controller, _$httpBackend_, $rootScope, 
                                   $state, $timeout, Tenants, 
                                   hierarchyUtils, flash){
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $stateParams = {organizationId: 1, tenantId: ''};

            $scope.data = {};

            $httpBackend.whenGET('/tenants/1?include_children=true')
                        .respond(testing.data.tenants.hierarchy_with_root);

            constructController = function() {
                // $scope, $stateParams, $state, $timeout, Tenants, hierarchyUtils, flash
                controller = $controller('EditTenantsCtrl', {
                    $scope: $scope,
                    $stateParams: $stateParams,
                    $state: $state,
                    $timeout: $timeout,
                    Tenants: Tenants,
                    hierarchyUtils: hierarchyUtils,
                    flash: flash                    
                });
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should create a new Tenant resource if tenantId does not exist', function() {
            constructController();
            $httpBackend.flush();

            expect($scope.data.tenant).toBeTruthy();
            expect($scope.data.tenant.id).toEqual(undefined);
        });

        it('should fetch the existing resource for a Tenant if tenantId exists', function() {
            $stateParams.tenantId = 2;
            $httpBackend.expectGET('/tenants/2').respond({id: 2});

            constructController();
            $httpBackend.flush();

            expect($scope.data.tenant).toBeTruthy();
            expect($scope.data.tenant.id).toEqual(2);
        });
    });
});