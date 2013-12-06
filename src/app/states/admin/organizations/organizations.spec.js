describe('Admin.Organizations State Module', function() {

    var mockData = {
        organizations: [
            {id: 1, name: 'Organization (id: 1)', children: [{id: 2, name: 'Tenant (id: 2)', children: []}]},
            {id: 3, name: 'Organization (id: 3)', children: []}
        ]
    };

    beforeEach(function() {
        angular.mock.module('cortex.states.admin.organizations');
        angular.mock.module(function($provide) {
            $provide.constant('config', {api: {baseUrl: ''}});
        });
    });

    // $scope, $stateParams, $state, Organizations
    describe('OrganizationsCtrl', function() {
        var createController, $scope, $stateParams, $state, $httpBackend;

        beforeEach(inject(function($controller, $rootScope, _$httpBackend_, Organizations) {
            $scope = $rootScope.$new();
            $stateParams = {};

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/organizations')
                .respond(mockData.organizations);

            createController = function() {
                return organizationsCtrl = $controller('OrganizationsCtrl', {
                    $scope: $scope,
                    $stateParams: $stateParams,
                    $state: null,
                    Organizations: Organizations
                });
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('has set $scope.data.organizations', function() {
            var controller = createController();

            $httpBackend.flush();

            expect($scope.data.organizations[0].id).toEqual(1);
            expect($scope.data.organizations.length).toEqual(2);
        });

        it('has set $scope.data.organization if $stateParams.organizationId set', function() {
            $stateParams.organizationId = 1;
            var controller = createController();
            $httpBackend.flush();
            expect($scope.data.organization.id).toEqual(1);
        });
    });
});