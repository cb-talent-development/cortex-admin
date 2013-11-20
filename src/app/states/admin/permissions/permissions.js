var module = angular.module('cortex.states.admin.permissions', [
    'ui.router.state']);

module.config(function($stateProvider){
    $stateProvider.state('admin.permissions', {
        url: '/permissions',
        template: '<div class="container">Here ly thy beast, Permissions</div>'
    });
});
