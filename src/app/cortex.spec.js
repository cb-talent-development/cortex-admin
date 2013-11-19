describe('Cortex State Module', function () {

    describe('CortexAdminCtrl', function () {
        var CortexAdminCtrl, $location, $scope;

        beforeEach(module('cortex'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();

            CortexAdminCtrl = $controller('CortexAdminCtrl', {
                $location: $location,
                $scope: $scope
            });
        }));

        it('should exist', inject(function () {
            expect(CortexAdminCtrl).toBeTruthy();
        }));
    });
});