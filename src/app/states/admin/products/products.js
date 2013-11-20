var module = angular.module('cortex.states.admin.products', [
    'ui.router.state']);

module.config(function($stateProvider){
    $stateProvider.state('admin.products', {
        url: '/products',
        template: '<div class="container">Here ly thy beast, Products</div>'
    });
});
