describe('Cortex Resources User Module', function() {

    beforeEach(angular.mock.module('cortex.resources.users'));

    describe('User Resource', function() {
        var Users, $httpBackend;

        beforeEach(function() {
            testing.provideConfig(testing.config.withEmptyApiBaseUrl);

            inject(function($injector) {
                Users = $injector.get('Users');
                $httpBackend = $injector.get('$httpBackend');
            });
        });

        it('should get me', function() {
            $httpBackend.expectGET('/users/me').respond({name: 'Ren'});
            var user = Users.me();
            $httpBackend.flush();
            expect(user.name).toEqual('Ren');
        });
    });
});