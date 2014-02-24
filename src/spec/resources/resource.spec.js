describe('Cortex Resources Resource Module', function(){

    beforeEach(angular.mock.module('cortex.resources.resource'));

    describe('Cortex Base Resource', function() {
        var FooResource, $httpBackend, createResource;

        beforeEach(function() {
            testing.provideConfig(testing.config.withEmptyApiBaseUrl);
            testing.provideSession();

            inject(function($injector){
                $httpBackend = $injector.get('$httpBackend');
                var cortexResource = $injector.get('cortexResource');
                FooResource = cortexResource('/foo/:id', {id: '@id'});
            });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it ('should POST when saving without an ID', function() {
            $httpBackend.expectPOST('/foo').respond({});
            var resource = new FooResource();
            resource.$save();
            $httpBackend.flush();
        });

        it('should PUT when saving with an ID', function() {
            $httpBackend.expect('PUT', '/foo/1').respond({});
            var resource = new FooResource({id: 1});
            resource.$save();
            $httpBackend.flush();
        });
    });
});