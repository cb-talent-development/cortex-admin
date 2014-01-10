var configModule = angular.module('cortex.config', []);

var environmentConfigs = {
    localConfig: {
        api: {
            baseUrl: 'http://localhost:3000',
            environmentName: 'Local'
        }
    },
    devConfig: {
        api: {
            baseUrl: 'http://dev.api.cbcortex.com',
            environmentName: 'Development'
        }
    },
    stgConfig: {
        api: {
            baseUrl: 'http://staging.api.cbcortex.com',
            environmentName: 'Staging'
        }
    },
    prdConfig: {
        api: {
            baseUrl: 'http://api.cbcortex.com',
            environmentName: 'Production'
        }
    }
};

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
configModule.constant('config', environmentConfigs.localConfig);

configModule.constant('events', {
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    USER_LOGIN_SUCCESS: 'userLoginSuccess',
    HTTP_RESPONSE_ERROR: 'httpResponseError',
    TENANT_HIERARCHY_CHANGE: 'tenantHierarchyChange',
    ORGANIZATIONS_CHANGE: 'organizationsChange'
});
