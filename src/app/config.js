var configModule = angular.module('cortex.config', []);

    var environmentConfigs = {
    localConfig: {
        api: {
            oauthUrl: 'http://localhost:3000/oauth',
            baseUrl: 'http://localhost:3000/api/v1',
            environmentName: 'Local'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    devConfig: {
        api: {
            baseUrl: 'http://dev.api.cbcortex.com/api/v1',
            environmentName: 'Development'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    stgConfig: {
        api: {
            baseUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/api/v1',
            environmentName: 'Staging'
        },
        pagingDefaults: {
            perPage: 10
        }
    },
    prdConfig: {
        api: {
            baseUrl: 'http://api.cbcortex.com/api/v1',
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
    LOGIN_START:   '$loginStart',
    LOGIN_SUCCESS: '$loginSuccess',
    LOGIN_ERROR:   '$loginError',
    LOGOUT:        '$logout',
    USER_LOADED:   '$userLoaded'
});

configModule.constant('resourceDefaultActions', {
    'get':    {method: 'GET'},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
});
