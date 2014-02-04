var module = angular.module('cortex.states.admin.posts.edit', [
    'ngCookies',
    'ui.router.state',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.buttons',
    'ui.bootstrap.datepicker',
    'angular-flash.service',
    'cortex.config',
    'cortex.services.auth',
    'cortex.config',
    'ui.router.state',
    'cortex.resources.posts',
    'cortex.resources.categories',
    'cortex.filters',
    'angular-redactor'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('admin.posts.new', {
            url: '/new',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'PostsEditCtrl'
        })
        .state('admin.posts.edit', {
            url: '/:postId/edit',
            templateUrl: 'states/admin/posts/edit/edit.tpl.html',
            controller: 'PostsEditCtrl'
        });
});


module.controller('PostsEditCtrl', function($scope, $stateParams, Posts, Categories, $timeout, $q, $filter, flash) {

    $scope.data = {
        savePost: function() {
            // Find selected categories
            var selectedCategories = _.filter($scope.data.categories, function(category) { return category.$selected; });
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

    if ($stateParams.postId) {
        $q.all([
            Posts.get({id: $stateParams.postId}).$promise, 
            Categories.query().$promise])
          .then(function(res) {
              var post = res[0];
              var categories = res[1];

              $scope.data.post = post;

              var selectedCategoryIds = _.map(post.categories, function(c) { return c.id; });
              _.each(categories, function(category){
                  if (_.contains(selectedCategoryIds, category.id)) {
                      category.$selected = true;
                  }
              });

              $scope.data.categories = categories;
          });
    } 
    else {
        $scope.data.post = new Posts();
        $scope.data.categories = Categories.query();
    }

    // angular-bootstrap datepicker settings
    $scope.datepicker = {
        format: 'yyyy/MM/dd',
        publishAtOpen: false,
        open: function(datepicker) {
            $timeout(function(){
                $scope.datepicker[datepicker] = true;
            });
        }
    };
});
