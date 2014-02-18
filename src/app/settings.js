var module = angular.module('cortex.settings', []);

var local = {
  environmentName: 'Local',
  oauthUrl: 'http://localhost:3000/oauth',
  oauthScopes: '',
  apiBaseUrl: 'http://localhost:3000/api/v1',
  apiAppId: 'cortex-admin-local',
  paging: {
      defaultPerPage: 10
  }
};

var development = {
  environmentName: 'Development',
  oauthUrl: 'http://dev.api.cbcortex.com/oauth',
  oauthScopes: '',
  apiBaseUrl: 'http://dev.api.cbcortex.com/api/v1',
  apiAppId: 'cortex-admin-development',
  paging: {
      defaultPerPage: 10
  }
};

var staging = {
  environmentName: 'Staging',
  oauthUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/oauth',
  oauthScopes: '',
  apiBaseUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/api/v1',
  apiAppId: 'cortex-admin-staging',
  paging: {
      defaultPerPage: 10
  }
};

var production = {
  environmentName: 'Production',
  oauthUrl: 'http://api.cbcortex.com/oauth',
  oauthScopes: '',
  apiBaseUrl: 'http://api.cbcortex.com/api/v1',
  apiAppId: 'cortex-admin',
  paging: {
      defaultPerPage: 10
  }
};

module.constant('settings', local);
