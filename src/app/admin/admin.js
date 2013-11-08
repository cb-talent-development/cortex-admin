/// <reference path="/reference.js"/>

angular.module('cortex.admin', [
    'ui.router.state',
    'cortex.admin.organizations'
])

.config(function($stateProvider) {
    $stateProvider.state('admin', {
            abstract: true,
            url: '/admin',
            template: '<ui-view/>'
        });
});
