'use strict';

describe('CortexAdminCtrl', function() {
    describe('isCurrentUrl', function() {
        var CortexAdminCtrl, $location, $scope;

        beforeEach(module('cortex'));

        beforeEach(inject(function($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            CortexAdminCtrl = $controller('CortexAdminCtrl', {$location: $location, $scope: $scope});
        }));

        it('should pass a dummy test', inject(function() {
            expect(CortexAdminCtrl).toBeTruthy();
        }));
    });
});