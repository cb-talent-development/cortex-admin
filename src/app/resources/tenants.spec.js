describe('Tenants Resource Module', function(){

    var mock = {
        tenants: [
            {Id: 1, Children: [
                {Id: 11, Children: [
                    {Id: 111, Children: []},
                    {Id: 112, Children: []}
                ]},
                {Id: 12, Children: []}
            ]},
            {Id: 2, Children: []}
        ],
        flattenedTenants: [
            {Id: 1, Children: [
                {Id: 11, Children: [
                    {Id: 111, Children: []},
                    {Id: 112, Children: []}
                ]},
                {Id: 12, Children: []}
            ]},
            {Id: 11, Children: [
                {Id: 111, Children: []},
                {Id: 112, Children: []}
            ]},
            {Id: 111, Children: []},
            {Id: 112, Children: []},
            {Id: 2, Children: []}
        ]
    };

    beforeEach(angular.mock.module('cortex.resources.tenants'));

    describe('tenantUtils', function(){
        var tenantUtils;

        beforeEach(inject(function($injector){
            tenantUtils = $injector.get('tenantUtils');
        }));

        it('should exist', function(){
            expect(tenantUtils).toBeTruthy();
        });

        describe('flattenTenantHierarchy', function(){
            var flattenTenantHierarchy;

            beforeEach(inject(function($injector){
                flattenTenantHierarchy = $injector.get('tenantUtils').flattenTenantHierarchy;
            }));

            it('should exist', function(){
                expect(flattenTenantHierarchy).toBeTruthy();
            });

            it('should flatten tenant hierarchy', inject(function(){
                var result = flattenTenantHierarchy(mock.tenants);
                expect(result.length).toEqual(6);
            }));
        });
    });

    describe('totalTenants', function(){
        var totalTenants;

        beforeEach(inject(function($filter){
            totalTenants = $filter('totalTenants');
        }));

        it('should exist', function(){
            expect(totalTenants).toBeTruthy();
        });

        it('should return the total tenants in a hierarchy', function(){
            expect(totalTenants(mock.tenants)).toEqual(6);
        });
    });

    describe('TenantsHierarchy Resource', function(){
        var TenantsHierarchy, $httpBackend;


        beforeEach(function(){
            angular.mock.module('cortex.resources.authorized');
            angular.mock.module(function($provide){
                $provide.constant('config', {api: {baseUrl: ''}});
            });

            inject(function($injector){
                $httpBackend = $injector.get('$httpBackend');
                TenantsHierarchy = $injector.get('TenantsHierarchy');
            });
        });

        it('should exist', function(){
            expect(TenantsHierarchy).toBeTruthy();
        });

        it('should get hierarchy', function(){
            $httpBackend.expectGET('/organizations/1/tenants/hierarchy')
                        .respond(mock.tenants);

            var result = TenantsHierarchy.query({orgId: 1});

            $httpBackend.flush();

            expect(result[0].Id).toEqual(1);
        });
    });
});