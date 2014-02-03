var module = angular.module('cortex.directives.wysiwyg', []);


module.directive('wysiwyg', function() {
    return {
        require: '?ngModel',
        link: function($scope, elem, attrs, ctrl) {
            elem.redactor({
                changeCallback: function() {
                    if (!$scope.$$phase){
                        $scope.$apply(ctrl.$setViewValue(elem.redactor('get')));                        
                    }
                    $scope.model = elem.redactor('get');
                }               
            });
            elem.redactor('set', ctrl.$viewValue || '');
        }
    };
});
