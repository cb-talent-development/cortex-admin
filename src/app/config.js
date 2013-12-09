var configModule = angular.module('cortex.config', []);

var devConfig = {
    api: {
        baseUrl: 'http://localhost:3000',
        environmentName: 'Development'
    }
};

var prodConfig = {
    api: {
        baseUrl: 'http://cb-cortex.herokuapp.com',
        environmentName: 'Production'
    }
};

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
configModule.constant('config', devConfig);

configModule.constant('events', {
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    USER_LOGIN_SUCCESS: 'userLoginSuccess',
    HTTP_RESPONSE_ERROR: 'httpResponseError'
});
