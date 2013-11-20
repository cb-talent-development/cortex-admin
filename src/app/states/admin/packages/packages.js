var module = angular.module('cortex.states.admin.packages', [
    'ui.router.state']);

module.config(function($stateProvider){
    $stateProvider.state('admin.packages', {
        url: '/packages',
        template: '<div class="container">Here ly thy beast, Packages</div>'
    });
});
