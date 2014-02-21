var module = angular.module('cortex.services.auth.methods.basic', [
    'common.base64'
]);

module.factory('basicAuth', function($q, base64) {
    return {
        // Name of auth method
        name: 'basic',
        // Build authorized http configuration object, return promise
        // which resolves to an object containing {httpConfig, credentials}
        authorize: function(credentials) {
            var d = $q.defer();

            if (credentials.login && credentials.password) {
                credentials.encoded = base64.encode(credentials.login + ':' + credentials.password);
            }
            else if (!credentials.encoded) {
                return $q.reject('Plain or encoded login and password required for HTTP Basic auth.');
            }

            var httpConfig = {headers: {Authorization: 'Basic ' + credentials.encoded}};
            d.resolve({httpConfig: httpConfig, credentials: {encoded: credentials.encoded, method: 'basic'}});            
            return d.promise;
        }
    };
});
