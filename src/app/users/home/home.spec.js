/// <reference path="/reference.js"/>

describe('HomeCtrl', function() {
    describe('Config or Constructor (TODO)', function () {
        var HomeCtrl, scope, rootScope;

        beforeEach(module('cortex.users.home'));

        beforeEach(inject(function(_$controller_, _$rootScope_) {
            scope = _$rootScope_.$new();
            rootScope = _$rootScope_;

            HomeCtrl = _$controller_('HomeCtrl', {
                $scope: scope,
                $rootScope: rootScope
            });
        }));

        it('should construct', inject(function() {
            expect(HomeCtrl).toBeTruthy();
        }));
    });
});