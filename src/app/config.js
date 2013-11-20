var configModule = angular.module('cortex.config', []);

var devConfig = {
    api: {
        baseUrl: 'http://api.cortex.com:60000',
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
configModule.constant('config', devConfig);
