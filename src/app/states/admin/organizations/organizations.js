var module = angular.module('cortex.states.admin.organizations', [
    'ui.router.state',
    'angular-underscore',
    'cortex.config',
    'cortex.resources.tenants',
    'cortex.states.admin.organizations.manage',
    'cortex.states.admin.organizations.edit'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.organizations', {
            url: '/organizations/:organizationId',
            template: '<ui-view/>',
            abstract: true,
            controller: 'OrganizationsCtrl'
        });
});

module.controller('OrganizationsCtrl', function ($scope, $stateParams, $state, events, Tenants) {

    var loadOrganizations = function () {
        // Fetch organizations from API and set selected, if available
        $scope.data.organizations = Tenants.query(function(organizations) {
            var orgId = $stateParams.organizationId;
            if (orgId) {
                $scope.data.organization = _.find(organizations, function(o){
                    return o.id == orgId;
                });
            }
        });
    };

    $scope.data = {};
    loadOrganizations();

    $scope.$on(events.ORGANIZATIONS_CHANGE, function (event) {
        loadOrganizations();
    });
});
