/// <reference path="/reference.js"/>

angular.module('cortex.admin', [
    'ui.router.state',
    'cortex.admin.tenant'
])

.config(function($stateProvider) {
    $stateProvider.state('admin', {
            abstract: true,
            url: '/admin',
            template: '<ui-view/>'
        });
});