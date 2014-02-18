var module = angular.module('cortex.services.auth.methods.oauth', [
    'cortex.util'
]);

module.factory('oauth', function($rootScope, $location, util) {

  return {
    // Name of auth method
    name: 'oauth',
    // Build authorized http configuration object, return promise
    // which resolves to an object containing {httpConfig, credentials}
    authorize: function(credentials) {
      var d = $q.defer();

      if (credentials.accessToken) {
        var httpConfig = buildConfig(credentials.accessToken, 'OAuth');
        d.resolve({httpConfig: httpConfig, credentials: {accessToken: credentials.accessToken, method: 'oauth'}});
        return d.promise;
      }

      // Generate a random state for use with OAuth
      var state = util.randomString(32);

      // Construct OAuth authorize call URL
      var authorizeUrl = util.supplant(
        '{baseUrl}/authorize?client_id={clientId}&redirect_url={redirectUrl}&scope={scope}&state={state}', {
        clientId:    settings.apiClientId,
        baseUrl:     settings.oauthBaseUrl,
        redirectUrl: $location.absUrl(),
        scope:       settings.oauthScope,
        state:       state
    });

      // Persist state for use after redirect
      $cookieStore.put('cortex-admin-oauth-state', state);

      // Start OAuth flow, note: promise is unused
      window.location.href = authorizeUrl;
    }
  };
});
