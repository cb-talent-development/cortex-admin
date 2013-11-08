/// <reference path="/reference.js"/>

describe('CortexAdminCtrl', function () {
    describe('Config or Constructor (TODO)', function () {
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

        it('should construct', inject(function () {
            expect(CortexAdminCtrl).toBeTruthy();
        }));
    });
});