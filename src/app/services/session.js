var module = angular.module('cortex.services.session', [
  'cortex.constants',
  'cortex.services.auth'
]);

// CortexSession
// -------------
// Handles serialization/deserialization of user session
var CortexSession = function(store) {
  this.store = store;
  this.currentUser = null;
  this.credentials = null;
};

CortexSession.prototype.serialized = function() {
  return {credentials: this.credentials};
};

CortexSession.prototype.deserialize = function(data) {
  this.credentials = data.credentials;
};

CortexSession.prototype.save = function() {
  this.store.save(this.serialized());
};

CortexSession.prototype.load = function() {
  this.deserialize(this.store.load());
};

CortexSession.prototype.nuke = function() {
  this.currentUser = null;
  this.credentials = null;
  this.store.nuke();
};

// Session Service
// ---------------
module.factory('session', function($q, $http, $cookieStore, $rootScope, auth, events) {

  // Key used to store cortex-admin's session
  STORE_KEY = 'cortex-admin-session';

  // Trigger authorization after long-lived credential fetch (OAuth)
  $rootScope.$on(events.CREDENTIALS_LOADED, function(event, credentials) {
    auth.authorize(credentials);
  });

  // Promises
  var sessionResolver = $q.defer();
  var loadRememberedUserResolver = $q.defer();

  // Persistence
  var cookieSessionStore = {
    
    save: function(session) {
      $cookieStore.put(STORE_KEY, session);
    },

    load: function() {
      return $cookieStore.get(STORE_KEY) || {credentials: null};
    },

    nuke: function() {
      $cookieStore.remove(STORE_KEY);
    }
  };

  // Build a new session and attempt to load
  session = new CortexSession(cookieSessionStore);
  session.load();
  sessionResolver.resolve(session);

  // Shared authorization callbacks
  var onAuthSuccess = function(resp) {
    session.credentials = resp.credentials;
    session.currentUser = resp.user;
    session.save();
    return resp; 
  };

  var onAuthError = function(resp) {
    session.nuke();
    return $q.reject(resp);
  };

  // Load user from cookie credentials
  if (session.credentials && session.credentials.method) {
    var onLoadUserSuccess = function(resp) {
      loadRememberedUserResolver.resolve(resp.user);
    };

    var onLoadUserError = function(resp) {
      loadRememberedUserResolver.reject(resp);
    };

    auth.authorize(session.credentials)
        .then(onAuthSuccess, onAuthError)
        .then(onLoadUserSuccess, onLoadUserError);
  }
  else {
    // Reject if there is no user to load
    loadRememberedUserResolver.reject();
  }

  return {
    
    // Promises relating to session events
    promises: {
      load: sessionResolver.promise,
      loadRememberedUser: loadRememberedUserResolver.promise
    },

    // Login user with username and password, returns a promise
    login: function(username, password, scope) {
      scope = scope || $rootScope;
      var d = $q.defer();

      var onLoginSuccess = function(resp) {
        scope.$emit(events.LOGIN_SUCCESS, resp.user);
        d.resolve(resp.user);
      };

      var onLoginError = function(resp) {
        scope.$emit(events.LOGIN_ERROR, resp.message);
        d.reject(resp);
      };

      auth.login(username, password)
          .then(onAuthSuccess, onAuthError)
          .then(onLoginSuccess, onLoginError);

      return d.promise;
    },

    // Logout current user, returns a promise
    logout: function() {
      var d = $q.defer();
      session.nuke();
      d.resolve();
      return d.promise;
    },

    // Fetch the current user
    currentUser: function() {
      return session.currentUser;
    },

    buildConfig: function() {
      return auth.buildConfig(session.credentials);
    }
  };
});
