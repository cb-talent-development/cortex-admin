var module = angular.module('cortex.services.auth.methods.oauth', [
    'cortex.util'
]);

module.factory('oauth', function($rootScope, $location, $q, $http, $log, util) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toParams.access_token && toParams.state) {
      var oauthCookie = $cookieStore.get('cortex-oauth');
      // Ensure state matches last
      if (oauthCookie.state != toParams.state) {
        $log.warning('OAuth state mismatch');
        return;
      }

      $rootScope.emit(events.CREDENTIALS_LOADED, {accessToken: credentials.accessToken, method: 'oauth'});
    }    
  });

  return {
    // Name of auth method
    name: 'oauth',
    // Build authorized http configuration object, return promise
    // which resolves to an object containing {httpConfig, credentials}
    authorize: function(credentials) {
      var d = $q.defer();

      if (credentials.accessToken) {
        var httpConfig = this.buildConfig(credentials);
        d.resolve({httpConfig: httpConfig, credentials: {accessToken: credentials.accessToken, method: 'oauth'}});
        return d.promise;
      }

      // Generate a random state for use with OAuth
      var state = util.randomString(32);
      var redirectUrl = $location.absUrl();

      // Construct OAuth authorize call URL
      var authorizeUrl = util.supplant(
        '{baseUrl}/authorize?response_type=token&client_id={clientId}&redirect_url={redirectUrl}&scope={scope}&state={state}', {
        clientId:    settings.apiClientId,
        baseUrl:     settings.oauthBaseUrl,
        redirectUrl: $location.absUrl(),
        scope:       settings.oauthScope,
        state:       state
    });

      // Persist state for use after redirect
      $cookieStore.put('cortex-oauth', {state: state});

      // Start OAuth flow, note: promise is unused
      window.location.href = authorizeUrl;
    },

    buildConfig: function(credentials) {
      return {headers: {Authorization: 'OAuth ' + credentials.accessToken}};
    }
  };
});
