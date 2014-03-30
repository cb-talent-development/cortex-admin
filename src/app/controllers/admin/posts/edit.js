var module = angular.module('cortex.controllers.admin.posts.edit', [
    'ngCookies',
    'ui.router.state',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.buttons',
    'ui.bootstrap.datepicker',
    'angular-flash.service',
    'angular-redactor',
    'cortex.directives.modalShow',
    'cortex.services.auth',
    'cortex.resources.posts',
    'cortex.resources.categories',
    'cortex.filters'
]);

module.controller('PostsEditCtrl', function($scope, $state, $stateParams, $timeout, $q, $filter, flash, Posts, post, categories, session, PostBodyEditorService) {

    $scope.data = {
        savePost: function() {
            // Find selected categories
            var selectedCategories = _.filter($scope.data.jobPhaseCategories, function(category) { return category.$selected; });
            $scope.data.post.category_ids = _.map(selectedCategories, function(category) { return category.id; });

            $scope.data.post.$save(function(post) {
                flash.success = 'Saved "' + post.title + '"';
            });
        },
        phases: [
            'discovery',
            'find_the_job',
            'get_the_job',
            'on_the_job'
        ],
        scheduled: [
            true,
            false
        ]
    };

    var initializePost  = function() {
        $scope.$watch('data.post.job_phase', function(phase) {

            if (phase === undefined) {
                $scope.data.jobPhaseCategories = [];
                return;
            }

            var jobPhaseCategory = _.find($scope.data.categories, function(category) {
                var normalizedPhaseName = category.name.split(' ').join('_').toLowerCase();
                return normalizedPhaseName == phase;
            });

            $scope.data.jobPhaseCategories = jobPhaseCategory.children;
        });
    };

    if (post) {
        $scope.data.post = post;

        var selectedCategoryIds = _.map(post.categories, function(c) { return c.id; });
        _.each(categories, function(category){
          _.each(category.children, function(child){
              if (_.contains(selectedCategoryIds, child.id)) {
                  child.$selected = true;
              }
          });
        });

        $scope.data.categories = categories;

        var todayDate = moment(new Date());
        var postDate = moment($scope.data.post.published_at);

        if ($scope.data.post.draft === false && postDate.diff(todayDate, 'days') < 1 ) {
            $scope.data.scheduled = false;
        } else {
            $scope.data.scheduled = true;
        }
    }
    else {
        $scope.data.post = new Posts();
        $scope.data.post.draft = true;
        $scope.data.post.author = session.currentUser().fullname;
        $scope.data.post.copyright_owner = $scope.data.post.copyright_owner || "CareerBuilder, LLC";
        $scope.data.categories = categories;
    }
    initializePost();

    // angular-bootstrap datepicker settings
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        publishAtOpen: false,
        expireAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };

    $scope.postScheduling = {
        now: function() {
            $scope.data.post.published_at = new Date();
        },
        scheduled: function() {
            $scope.data.post.published_at = null || $scope.data.post.published_at;
        }
    };

    $scope.postBodyEditorService = PostBodyEditorService;

    $scope.addMediaPopup = function() {
        $scope.postBodyEditorService.postMedia = $scope.data.post.media;

        // Note: This will get the wrong cursor position if there are multiple Redactor areas and the user selects a different one.
        console.log(this.getCaretOffset(this.getCurrent()));

        $scope.postBodyEditorService.postBody = $scope.data.post.body;

        $scope.$watch('postBodyEditorService.postBody', function(postBody) {
            $scope.data.post.body = postBody;
        });

        $scope.$watch('postBodyEditorService.postMedia', function(postMedia) {
            $scope.data.post.media = postMedia;
        });

        $state.go('.media.manage.components');
    };

    $scope.redactorOptions = {
        buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|',
            'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
            'media', 'image', 'file', 'table', 'link', '|', 'alignment', '|', 'horizontalrule'],
        buttonsCustom: {
            media: {
                title: 'Media',
                callback: $scope.addMediaPopup
            }
        },
        minHeight: 400
    };
});

module.factory('PostBodyEditorService', function($filter) {
    return {
        postCursorPosition: '',
        postBody: '',
        postMedia: [],
        addMedia: function(media) {
            this.postBody = this.postBody.replace('$MEDIA_PLACEHOLDER$', $filter('mediaToHtml')(media));
        }
    };
});
