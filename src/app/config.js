var module = angular.module('cortex.config', []);

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
module.constant('config', {
    api: {
        baseUrl: 'http://api.cortex.com:60000'
    }
});