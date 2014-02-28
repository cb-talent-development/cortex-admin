var module = angular.module('cortex.settings', []);

var local = {
  environmentName: 'Local',
  oauthUrl: 'http://localhost:3000/oauth',
  oauthScopes: [
    'view:profile', 'modify:profile',
    'view:tenants', 'modify:tenants',
    'view:users', 'modify:users',
    'view:posts', 'modify:posts',
    'view:media', 'modify:media'
  ],
  apiBaseUrl: 'http://localhost:3000/api/v1',
  apiClientId: '24cb436ea760a9ec91bdaf11234b2a7ebfeb4cef72c21d6c59c99badd3c6b3f1',
  paging: {
      defaultPerPage: 10
  }
};

var development = {
  environmentName: 'Development',
  oauthUrl: 'http://dev.api.cbcortex.com/oauth',
  oauthScopes: [
    'view:profile', 'modify:profile',
    'view:tenants', 'modify:tenants',
    'view:users', 'modify:users',
    'view:posts', 'modify:posts',
    'view:media', 'modify:media'
  ],
  apiBaseUrl: 'http://dev.api.cbcortex.com/api/v1',
  apiClientId: 'cortex-admin-development',
  paging: {
      defaultPerPage: 10
  }
};

var staging = {
  environmentName: 'Staging',
  oauthUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/oauth',
  oauthScopes: [
    'view:profile', 'modify:profile',
    'view:tenants', 'modify:tenants',
    'view:users', 'modify:users',
    'view:posts', 'modify:posts',
    'view:media', 'modify:media'
  ],
  apiBaseUrl: 'http://raccoon.cb-cortex-stg.staging.c66.me/api/v1',
  apiClientId: 'cortex-admin-staging',
  paging: {
      defaultPerPage: 10
  }
};

var production = {
  environmentName: 'Production',
  oauthUrl: 'http://api.cbcortex.com/oauth',
  oauthScopes: [
    'view:profile', 'modify:profile',
    'view:tenants', 'modify:tenants',
    'view:users', 'modify:users',
    'view:posts', 'modify:posts',
    'view:media', 'modify:media'
  ],
  apiBaseUrl: 'http://api.cbcortex.com/api/v1',
  apiClientId: 'cortex-admin',
  paging: {
      defaultPerPage: 10
  }
};

module.constant('settings', staging);
