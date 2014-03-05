var module = angular.module('cortex.controllers.admin.organizations', [
    'ui.router.state',
    'angular-underscore',
    'cortex.resources.tenants',
    'cortex.constants'
]);

module.controller('OrganizationsCtrl', function ($scope, $stateParams, $state, events, Tenants, organizations) {

    $scope.data = {
        organizations: organizations        
    };

    var orgId = $stateParams.organizationId;
    if (orgId) {
        $scope.data.organization = _.find(organizations, function(o){
            return o.id == orgId;
        });
    }

    $scope.$on(events.ORGANIZATIONS_CHANGE, function (event) {
        loadOrganizations();
    });
});
