// Testing Helpers

var testing = {
    provideConfig: function(settings) {
       angular.mock.module(function($provide){
            $provide.constant('settings', settings);
        });
    },
    config: {
        withEmptyApiBaseUrl: {apiBaseUrl: ''}
    },
    data: {
        tenants: {
            hierarchy: [
                {id: 1, name: 'Tenant 1', children: [
                    {id: 2, name: 'Tenant 1 Child 1', children: []}
                ]},
                {id: 3, name: 'Tenant 2', children: [
                    {id: 4, name: 'Tenant 2 Child 1', children: []},
                    {id: 5, name: 'Tenant 2 Child 2', children: []}
                ]},
                {id: 6, name: 'Tenant 3', children: []}
            ],
            hierarchy_with_root: {id: 1, name: 'Organization 1', children: [
                {id: 1, name: 'Tenant 1', children: [
                    {id: 2, name: 'Tenant 1 Child 1', children: []}
                ]},
                {id: 3, name: 'Tenant 2', children: [
                    {id: 4, name: 'Tenant 2 Child 1', children: []},
                    {id: 5, name: 'Tenant 2 Child 2', children: []}
                ]},
                {id: 6, name: 'Tenant 3', children: []}
            ]}
        }
    }
};