describe('Organizations Resource Module', function(){

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

    beforeEach(angular.mock.module('cortex.resources.organizations'));

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

    describe('Organizations Resource', function(){
        var Organizations, $httpBackend;


        beforeEach(function(){
            angular.mock.module('cortex.resources.authorized');
            angular.mock.module(function($provide){
                $provide.constant('config', {api: {baseUrl: ''}});
            });

            inject(function($injector){
                $httpBackend = $injector.get('$httpBackend');
                Organizations = $injector.get('Organizations');
            });
        });

        it('should exist', function(){
            expect(Organizations).toBeTruthy();
        });

        it('should get hierarchy', function(){
            $httpBackend.expectGET('/organizations/1/tenants/hierarchy')
                        .respond(mock.tenants);

            var result = Organizations.hierarchy({id: 1});

            $httpBackend.flush();

            expect(result[0].id).toEqual(1);
        });
    });
});