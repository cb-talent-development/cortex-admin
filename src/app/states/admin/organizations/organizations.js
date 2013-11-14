/// <reference path="/reference.js"/>

var module = angular.module('cortex.states.admin.organizations', [
    'ui.router.state',
    'angular-underscore',
    'cortex.resources.organizations',
    'cortex.states.admin.organizations.tenants'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations', {
            url: '/organizations/:organizationId',
            templateUrl: 'states/admin/organizations/organizations.tpl.html',
            controller: 'OrganizationsCtrl'
        });
});

module.controller('OrganizationsCtrl', function($scope, $stateParams, $state, Organizations){

    // Fetch organizations from API and set selected, if available
    $scope.data = {};
    $scope.data.organizations = Organizations.query(function(organizations) {
        var orgId = $stateParams.organizationId;
        if (orgId) {
            $scope.data.selectedOrganization = _.find(organizations, function(o){
                return o.Id == orgId;
            });
        }
    });

    $scope.isOrganizationSelected = function(organization){
        var selected = $scope.data.selectedOrganization;
        return selected && selected.Id == organization.Id;
    };

});