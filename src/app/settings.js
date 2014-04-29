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
  apiClientId: 'c85f7f5ce7b44a67bf36b6faadffda38d2dc16bb7057590031c92205e082d660',
  paging: {
      defaultPerPage: 10
  }
};

module.constant('settings', development);
