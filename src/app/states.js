var module = angular.module('cortex.states', [
    'ui.router.state',
    'cortex.services.session',

    'cortex.controllers.users.login',
    'cortex.controllers.admin.media.edit',
    'cortex.controllers.admin.media.filters',
    'cortex.controllers.admin.media.grid',
    'cortex.controllers.admin.media.new',
    'cortex.controllers.admin.organizations',
    'cortex.controllers.admin.organizations.manage',
    'cortex.controllers.admin.posts.edit',
    'cortex.controllers.admin.posts.filters',
    'cortex.controllers.admin.posts.grid',
    'cortex.controllers.admin.posts.popup',
    'cortex.controllers.admin.tenants.edit',
    'cortex.controllers.admin.tenants.manage'
]);

module.config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'views/users/login.tpl.html',
            data: {pageTitle: 'Login'}
        })

        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'views/admin/admin.tpl.html',
            data: {
              displayName: false
            }
        })

        // Media

        .state('admin.media', {
            url: '/media',
            abstract: true,
            template: '<div class="admin-media" ui-view></div>',
            data: {
              displayName: 'Media'
            }
        })

        .state('admin.media.new', {
            url: '/new',
            templateUrl: 'views/admin/media/new.tpl.html',
            controller: 'MediaNewCtrl',
            data: {
              displayName: 'New'
            }
        })

        .state('admin.media.edit', {
            url: '/:mediaId/edit',
            templateUrl: 'views/admin/media/edit.tpl.html',
            controller: 'MediaEditCtrl',
            data: {
              displayName: 'Edit'
            }
        })

        .state('admin.media.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/media/manage.tpl.html',
            data: {
              displayName: false
            }
        })

        .state('admin.media.manage.components', {
            url: '/:page/:perPage/:query',
            views: {
                'media-grid': {
                    templateUrl: 'views/admin/media/grid.tpl.html',
                    controller: 'MediaGridCtrl'
                },
                'media-filters': {
                    templateUrl: 'views/admin/media/filters.tpl.html',
                    controller: 'MediaFiltersCtrl'
                }
            },
            data: {
              displayName: false
            }
        })

        // Posts

        .state('admin.posts', {
            url: '/posts',
            abstract: true,
            template: '<div class="admin-posts" ui-view></div>',
            data: {
              displayName: 'Posts'
            }
        })

        .state('admin.posts.new', {
            url: '/new',
            templateUrl: 'views/admin/posts/edit.tpl.html',
            controller: 'PostsEditCtrl',
            resolve: {
                post: function() {
                    return null;
                },
                categories: function(Categories) {
                    return Categories.hierarchy().$promise;
                }
            },
            data: {
              displayName: 'New'
            }
        })

        .state('admin.posts.edit', {
            url: '/:postId/edit',
            templateUrl: 'views/admin/posts/edit.tpl.html',
            controller: 'PostsEditCtrl',
            resolve: {
                post: function(Posts, $stateParams) {
                    return Posts.get({id: $stateParams.postId}).$promise;                
                },
                categories: function(Categories) {
                    return Categories.hierarchy().$promise;
                }
            },
            data: {
              displayName: 'Edit'
            }
        })

        // Posts Edit + Media Popup
        // **********************

        .state('admin.posts.edit.media', {
            url: '/media',
            abstract: true,
            templateUrl: 'views/admin/posts/popup.tpl.html',
            controller: 'PostsPopupCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.edit.media.new', {
            url: '/new',
            templateUrl: 'views/admin/media/new.tpl.html',
            controller: 'MediaNewCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.edit.media.edit', {
            url: '/:mediaId/edit',
            templateUrl: 'views/admin/media/edit.tpl.html',
            controller: 'MediaEditCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.edit.media.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/media/manage.tpl.html',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.edit.media.manage.components', {
            url: '/:page/:perPage/:query',
            views: {
                'media-grid': {
                    templateUrl: 'views/admin/media/grid.tpl.html',
                    controller: 'MediaGridCtrl'
                },
                'media-filters': {
                    templateUrl: 'views/admin/media/filters.tpl.html',
                    controller: 'MediaFiltersCtrl'
                }
            },
            data: {
              displayName: false
            }
        })

        .state('admin.posts.new.media', {
            url: '/media',
            abstract: true,
            templateUrl: 'views/admin/posts/popup.tpl.html',
            controller: 'PostsPopupCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.new.media.new', {
            url: '/new',
            templateUrl: 'views/admin/media/new.tpl.html',
            controller: 'MediaNewCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.new.media.edit', {
            url: '/:mediaId/edit',
            templateUrl: 'views/admin/media/edit.tpl.html',
            controller: 'MediaEditCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.new.media.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/media/manage.tpl.html',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.new.media.manage.components', {
            url: '/:page/:perPage/:query',
            views: {
                'media-grid': {
                    templateUrl: 'views/admin/media/grid.tpl.html',
                    controller: 'MediaGridCtrl'
                },
                'media-filters': {
                    templateUrl: 'views/admin/media/filters.tpl.html',
                    controller: 'MediaFiltersCtrl'
                }
            },
            data: {
              displayName: false
            }
        })

        // **********************

        .state('admin.posts.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/posts/manage.tpl.html',
            data: {
              displayName: false
            }
        })

        .state('admin.posts.manage.components', {
            url: '/',
            views: {
                'posts-grid': {
                  templateUrl: 'views/admin/posts/grid.tpl.html',
                  controller: 'PostsGridCtrl'
                },
                'posts-filters': {
                  templateUrl: 'views/admin/posts/filters.tpl.html',
                  controller: 'PostsFiltersCtrl'
                }
            },
            data: {
              displayName: false
            }
        })

        // Tenants

        .state('admin.organizations', {
            url: '/organizations/:organizationId',
            template: '<ui-view/>',
            abstract: true,
            controller: 'OrganizationsCtrl',
            resolve: {
                organizations: function(Tenants) {
                    return Tenants.query().$promise;
                }
            },
            data: {
              displayName: false
            }
        })

        .state('admin.organizations.tenants', {
            url: '',
            template: '<ui-view/>',
            abstract: true,
            data: {
              displayName: false
            }
        })

        .state('admin.organizations.tenants.edit', {
            url: '/tenants/:tenantId/edit',
            templateUrl: 'views/admin/tenants/edit.tpl.html',
            controller: 'EditTenantsCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.organizations.tenants.new', {
            url: '/tenants/new',
            templateUrl: 'views/admin/tenants/edit.tpl.html',
            controller: 'EditTenantsCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.organizations.manage', {
            url: '',
            templateUrl: 'views/admin/organizations/manage.tpl.html',
            controller: 'OrganizationsManageCtrl',
            data: {
              displayName: false
            }
        })

        .state('admin.organizations.manage.tenants', {
            url: '/tenants/:tenantId',
            views: {
                'tenants-tree': {
                    templateUrl: 'views/admin/tenants/manage.tree.tpl.html',
                    controller: 'TenantsTreeCtrl'
                },
                'tenants-details': {
                    templateUrl: 'views/admin/tenants/manage.details.tpl.html'
                }
            },
            resolve: {
                organization: function($stateParams, Tenants) {
                    return Tenants.get({id: $stateParams.organizationId, include_children: true}).$promise;
                }
            },
            data: {
              displayName: false
            }
        })

        // Products

        .state('admin.products', {
            url: '/products',
            template: '<div class="container">Here ly thy beast, Products</div>',
            data: {
              displayName: false
            }
        })

        // Permissions

        .state('admin.permissions', {
            url: '/permissions',
            template: '<div class="container">Here ly thy beast, Permissions</div>',
            data: {
              displayName: false
            }
        });
});
