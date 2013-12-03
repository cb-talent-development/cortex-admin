var configModule = angular.module('cortex.config', []);

var devConfig = {
    api: {
        baseUrl: 'http://localhost:3000',
        environmentName: 'Development'
    }
};

var prodConfig = {
    api: {
        baseUrl: 'http://dev.cbresumehero.com',
        environmentName: 'Production'
    }
};

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
configModule.constant('Config', devConfig);

var eventsDict = {
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    USER_LOGIN_SUCCESS: 'userLoginSuccess',
    HTTP_RESPONSE_ERROR: 'httpResponseError'
};

configModule.constant('EventsDict', eventsDict);
