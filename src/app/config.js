var configModule = angular.module('cortex.config', []);

var environmentConfigs = {
    localConfig: {
        api: {
            baseUrl: 'http://localhost:3000',
            environmentName: 'Local'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    devConfig: {
        api: {
            baseUrl: 'http://dev.api.cbcortex.com',
            environmentName: 'Development'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    stgConfig: {
        api: {
            baseUrl: 'http://staging.api.cbcortex.com',
            environmentName: 'Staging'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    prdConfig: {
        api: {
            baseUrl: 'http://api.cbcortex.com',
            environmentName: 'Production'
        },
        pagingDefaults: {
            perPage: 10
        }
    }
};

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
configModule.constant('config', environmentConfigs.stgConfig);

configModule.constant('events', {
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    USER_LOGIN_SUCCESS: 'userLoginSuccess',
    HTTP_RESPONSE_ERROR: 'httpResponseError',
    TENANT_HIERARCHY_CHANGE: 'tenantHierarchyChange',
    ORGANIZATIONS_CHANGE: 'organizationsChange'
});

configModule.constant('resourceDefaultActions', {
    'get':    {method: 'GET'},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
});
