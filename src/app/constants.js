var module = angular.module('cortex.constants', []);

module.constant('events', {
    LOGIN_START:   '$loginStart',
    LOGIN_SUCCESS: '$loginSuccess',
    LOGIN_ERROR:   '$loginError',
    LOGOUT:        '$logout',
    USER_LOADED:   '$userLoaded',
    PUBLIC_ERROR:  '$publicError'
});

module.constant('resourceDefaultActions', {
    'get':    {method: 'GET'},
    'save':   {method: 'POST'},
    'query':  {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
});
