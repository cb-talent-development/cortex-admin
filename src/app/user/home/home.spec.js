'use strict';

describe('Controller: HomeCtrl', function() {
    beforeEach(module('cortex.user.home'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        HomeCtrl = $controller('HomeCtrl', {
            $scope: scope
        });
    }));

    it('should test scope.user to equal rootScope.user', function () {
        expect(scope.user).toBe(rootScope.user);
    });
});
