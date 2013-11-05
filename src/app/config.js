/// <reference path="/reference.js"/>

angular.module('cortex.config', [])

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
.constant('config',  {
    api: {
        baseUrl: 'http://localhost:56854'
    }
});