describe('Tenants Resource Module', function(){

    var mock = {
        tenants: [
            {id: 1, children: [
                {id: 11, children: [
                    {id: 111, children: []},
                    {id: 112, children: []}
                ]},
                {id: 12, children: []}
            ]},
            {id: 2, children: []}
        ],
        flattenedTenants: [
            {id: 1, children: [
                {id: 11, children: [
                    {id: 111, children: []},
                    {id: 112, children: []}
                ]},
                {id: 12, children: []}
            ]},
            {id: 11, children: [
                {id: 111, children: []},
                {id: 112, children: []}
            ]},
            {id: 111, children: []},
            {id: 112, children: []},
            {id: 2, children: []}
        ]
    };

    beforeEach(angular.mock.module('cortex.resources.tenants'));

    describe('hierarchyUtils', function(){
        var hierarchyUtils;

        beforeEach(inject(function($injector){
            hierarchyUtils = $injector.get('hierarchyUtils');
        }));

        it('should exist', function(){
            expect(hierarchyUtils).toBeTruthy();
        });

        describe('flattenTenantHierarchy', function(){
            var flattenTenantHierarchy;

            beforeEach(inject(function($injector){
                flattenTenantHierarchy = $injector.get('hierarchyUtils').flattenTenantHierarchy;
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

    describe('totalTenants filter', function(){
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

    describe('Tenants Resource', function(){
        var Tenants, $httpBackend;


        beforeEach(function(){
            testing.provideConfig(testing.config.withEmptyApiBaseUrl);

            inject(function($injector){
                $httpBackend = $injector.get('$httpBackend');
                Tenants = $injector.get('Tenants');
            });
        });

        it('should exist', function(){
            expect(Tenants).toBeTruthy();
        });

        it('should get children', function(){
            $httpBackend.expectGET('/tenants/1?include_children=true')
                        .respond(mock.tenants[0]);

            var result = Tenants.get({id: 1, include_children: true});

            $httpBackend.flush();

            expect(result.id).toEqual(1);
        });
    });
});