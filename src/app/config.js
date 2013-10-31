angular.module('cortex.config', [])

// In the future this will be replaced with a grunt step to provide
// environment specific configuration.
.factory('config', function(){

    return {
        api: {
            baseUrl: 'http://localhost'
        }
    };

});