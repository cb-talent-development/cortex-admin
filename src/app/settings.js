var module = angular.module('cortex.settings', []);

var local = {
    environmentName: 'Local',
    oauthUrl: 'http://localhost:3000/oauth',
    apiBaseUrl: 'http://localhost:3000/api/v1',
    paging: {
        defaultPerPage: 10
    }
};

development = {
    environmentName: 'Development',
    oauthUrl: 'http://dev.api.cbcortex.com/oauth',
    apiBaseUrl: 'http://dev.api.cbcortex.com/api/v1',
    paging: {
        defaultPerPage: 10
    }
};

staging = {
    environmentName: 'Staging',
    oauthUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/oauth',
    apiBaseUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/api/v1',
    paging: {
        defaultPerPage: 10
    }
};

production = {
    environmentName: 'Production',
    oauthUrl: 'http://api.cbcortex.com/oauth',
    apiBaseUrl: 'http://api.cbcortex.com/api/v1',
    paging: {
        defaultPerPage: 10
    }
};

module.constant('settings', local);
