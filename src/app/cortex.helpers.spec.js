// Testing Helpers

var testing = {
    provideConfig: function(config) {
       angular.mock.module(function($provide){
            $provide.constant('config', config);
        }); 
    },
    config: {
        withEmptyApiBaseUrl: {api: {baseUrl: ''}}
    }
};