var module = angular.module('cortex.states', [
    'ui.router.state',
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
            templateUrl: 'views/admin/admin.tpl.html'
        })

        // Media

        .state('admin.media', {
            url: '/media',
            abstract: true,
            template: '<div class="admin-media" ui-view></div>'
        })

        .state('admin.media.new', {
            url: '/new',
            templateUrl: 'views/admin/media/new.tpl.html',
            controller: 'MediaNewCtrl'
        })

        .state('admin.media.edit', {
            url: '/:mediaId/edit',
            templateUrl: 'views/admin/media/edit.tpl.html',
            controller: 'MediaEditCtrl'
        })

        .state('admin.media.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/media/manage.tpl.html'
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
            }
        })

        // Posts

        .state('admin.posts', {
            url: '/posts',
            abstract: true,
            template: '<div class="admin-posts" ui-view></div>'
        })

        .state('admin.posts.new', {
            url: '/new',
            templateUrl: 'views/admin/posts/edit.tpl.html',
            controller: 'PostsEditCtrl'
        })

        .state('admin.posts.edit', {
            url: '/:postId/edit',
            templateUrl: 'views/admin/posts/edit.tpl.html',
            controller: 'PostsEditCtrl'
        })

        .state('admin.posts.manage', {
            url: '',
            abstract: true,
            templateUrl: 'views/admin/posts/manage.tpl.html'
        })

        .state('admin.posts.manage.components', {
            url: '/',
            views: {
                'posts-grid': { templateUrl: 'views/admin/posts/grid.tpl.html', controller: 'PostsGridCtrl' },
                'posts-filters': { templateUrl: 'views/admin/posts/filters.tpl.html', controller: 'PostsFiltersCtrl' }
            }
        })

        // Tenants

        .state('admin.organizations', {
            url: '/organizations/:organizationId',
            template: '<ui-view/>',
            abstract: true,
            controller: 'OrganizationsCtrl'
        })

        .state('admin.organizations.edit', {
            url: '',
            template: '<ui-view/>',
            abstract: true
        })

        .state('admin.organizations.edit.tenants', {
            url: '/tenants/:tenantId/edit',
            templateUrl: 'views/admin/tenants/edit.tpl.html',
            controller: 'EditTenantsCtrl'
        })

        .state('admin.organizations.manage', {
            url: '',
            templateUrl: 'views/admin/organizations/manage.tpl.html',
            controller: 'OrganizationsManageCtrl'
        })

        .state('admin.organizations.manage.tenants',{
            url: '/tenants/:tenantId',
            views:
            {
                'tenants-tree':
                {
                    templateUrl: 'views/admin/tenants/manage.tree.tpl.html',
                    controller: 'TenantsTreeCtrl'
                },
                'tenants-details':
                {
                    templateUrl: 'views/admin/tenants/manage.details.tpl.html'
                }
            }
        })

        // Products

        .state('admin.products', {
            url: '/products',
            template: '<div class="container">Here ly thy beast, Products</div>'
        })

        // Permissions

        .state('admin.permissions', {
            url: '/permissions',
            template: '<div class="container">Here ly thy beast, Permissions</div>'
        });
});
