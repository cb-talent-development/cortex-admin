var module = angular.module('cortex.filters', []);

module.filter('humanize', function() {
    return function(string) {
        string = string.split('_').join(' ').toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);   
    };
});