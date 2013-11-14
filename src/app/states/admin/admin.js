/// <reference path="/reference.js"/>

angular.module('cortex.views.admin', [
        'ui.router.state',
        'cortex.states.admin.organizations'
    ])

    .config(function ($stateProvider) {
        $stateProvider.state('admin', {
            abstract: true,
            url: '/admin',
            template: '<ui-view/>'
        });
    });
