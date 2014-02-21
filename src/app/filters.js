var module = angular.module('cortex.filters', []);

// Turns underscores into spaces, capitalizes first letter of string
module.filter('humanize', function() {
    return function(string) {
        string = string.split('_').join(' ').toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);   
    };
});
