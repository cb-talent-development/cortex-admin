var module = angular.module('cortex.directives.tenantSettings', []);

module.directive('tenantSettings', function() {
    return {
        restrict: 'EA',
        templateUrl: 'directives/tenantSettings.tpl.html',
        link: function(){
            console.log('tenantSettings');
        }
    };
});