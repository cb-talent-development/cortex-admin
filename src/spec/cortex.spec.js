describe('Cortex Module', function() {

    beforeEach(function() {
        angular.mock.module('cortex');
    });

    describe('CortexAdminCtrl', function(){
        var createController, $scope, $rootScope, $stateParams;

        beforeEach(inject(function($state, events, _$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $stateParams = {};

            createController = function() {
                return $controller('CortexAdminCtrl', {
                    $scope: $scope,
                    $state: $state,
                    events: events,
                    $rootScope: $rootScope,
                    $stateParams: $stateParams
                });
            };
        }));

        it('should make $state and $stateParams accessible on $rootScope', function() {
            $stateParams.foo = 1;
            var controller = createController();

            expect($rootScope.$state).toBeTruthy();
            expect($rootScope.$stateParams).toBeTruthy();
            expect($rootScope.$stateParams.foo).toEqual(1);
        });
    });
});