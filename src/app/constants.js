var module = angular.module('cortex.constants', []);

module.constant('events', {
  // Login/session events
  LOGIN_START:        '$loginStart',
  LOGIN_SUCCESS:      '$loginSuccess',
  LOGIN_ERROR:        '$loginError',
  LOGOUT:             '$logout',
  // session.currentUser has been loaded
  USER_LOADED:        '$userLoaded',
  // Triggered when credentials come in from a long-lived 
  // authorization process such as OAuth. The session 
  // service then triggers auth.authorize(credentials)
  CREDENTIALS_LOADED: '$credentialsLoaded',
  // Events that should be replaced with refactored states
  TENANT_HIERARCHY_CHANGE: '$tenantHierarchyChange',
  ORGANIZATIONS_CHANGE:    '$organizationsChange'
});

module.constant('resourceDefaultActions', {
  'get':    {method: 'GET'},
  'save':   {method: 'POST'},
  'query':  {method: 'GET', isArray: true},
  'remove': {method: 'DELETE'},
  'delete': {method: 'DELETE'}
});
