var templatesModule = angular.module('common.templates', []);

templatesModule.constant('templates', {
        ngGridCells: {
            centerAligned: "<div class=\"ngCellText colt{{$index}}\" style=\"text-align:center;\">{{row.getProperty(col.field)}}</div>"
        }
    }
);