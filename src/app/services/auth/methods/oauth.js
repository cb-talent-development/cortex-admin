var module = angular.module('cortex.services.auth.methods.oauth', [
    'cortex.constants',
    'cortex.util',
    'cortex.settings'
]);

module.provider('oauth', function() {

  var hash = window.location.hash;
  var pendingCredentials;

  this.$get = [
    '$rootScope', '$location', '$q', '$http', 
    '$log', '$cookieStore', '$state', 'events', 
    'util', 'settings',

    function($rootScope, $location, $q, $http, $log, $cookieStore, $state, events, util, settings) {
      
      if (hash.indexOf('access_token=') > -1) {
        var params = {};
        angular.forEach(hash.replace('#', '').split('&'), function(kv) {
          var kvSplit = kv.split('=');
          if (kvSplit.length == 2) {
            params[kvSplit[0]] = kvSplit[1];
          }
        });

        if (params.access_token && params.state) {
          var oauthCookie = $cookieStore.get('cortex-oauth');
          // Ensure state matches last
          if (oauthCookie.state != params.state) {
            $log.warning('OAuth state mismatch');
            return;
          }

          pendingCredentials = {accessToken: params.access_token, method: 'oauth'};
        }
      }

      $rootScope.$on('$stateChangeStart', function() {
        if (pendingCredentials) {
          $rootScope.$emit(events.CREDENTIALS_LOADED, pendingCredentials);
          pendingCredentials = null;
        }
      });

      var buildRedirectUrl = function() {
        var location = window.location;
        return location.origin + location.pathname;
      };

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
            '{baseUrl}/authorize?response_type=token&client_id={clientId}&redirect_uri={redirectUrl}&scope={scope}&state={state}', {
            clientId:    escape(settings.apiClientId),
            baseUrl:     settings.oauthUrl,
            redirectUrl: escape(buildRedirectUrl()),
            scope:       escape(settings.oauthScopes.join(' ')),
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
    }
  ];
});
