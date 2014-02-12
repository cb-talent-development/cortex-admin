var module = angular.module('cortex.controllers.admin.posts.edit', [
    'ngCookies',
    'ui.router.state',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.buttons',
    'ui.bootstrap.datepicker',
    'angular-flash.service',
    'angular-redactor',
    'cortex.config',
    'cortex.services.auth',
    'cortex.resources.posts',
    'cortex.resources.categories',
    'cortex.filters'
]);

module.controller('PostsEditCtrl', function($scope, $stateParams, Posts, Categories, $timeout, $q, $filter, flash) {

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
        ]
    };

    var initializePost  = function() {

        $scope.data.post.published_at = $scope.data.post.published_at || new Date();

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

    if ($stateParams.postId) {
        $q.all([
            Posts.get({id: $stateParams.postId}).$promise,
            Categories.hierarchy().$promise])
          .then(function(res) {
              var post = res[0];
              var categories = res[1];

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
              initializePost();
          });
    }
    else {
        $scope.data.post = new Posts();
        $scope.data.categories = Categories.hierarchy();
        initializePost();
    }

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
});
