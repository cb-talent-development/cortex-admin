/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],
    vtpl: [ 'src/vendor/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    sass: 'src/sass/main.scss'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/angularjs-file-upload/angular-file-upload-shim.js',
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      'vendor/angular-breadcrumb/dist/angular-breadcrumb.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/underscore/underscore.js',
      'vendor/angular-underscore/angular-underscore.js',
      'vendor/ng-table/ng-table.src.js',
      'vendor/angular-flash/dist/angular-flash.js',
      'vendor/angularjs-file-upload/angular-file-upload.js',
      'vendor/momentjs/moment.js',
      'vendor/angular-redactor/angular-redactor.js',
      'vendor/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
      'vendor/angular-date-time-input/src/dateTimeInput.js',

      /**
      * Angular-file-upload would prefer this file be loaded in dynamically by its library.
      * Unfortunately, for grunt to include it in the built output, it must be loaded on page load too.
      * Perhaps create a separate grunt step for including files in HTML?
      */
      'vendor/angularjs-file-upload/FileAPI.js',

      /**
      * Bootstrap JS sources
      */
      'vendor/bootstrap-sass/vendor/assets/javascripts/bootstrap/transition.js',
      'vendor/bootstrap-sass/vendor/assets/javascripts/bootstrap/collapse.js',
      'vendor/bootstrap-sass/vendor/assets/javascripts/bootstrap/dropdown.js',
      'vendor/bootstrap-sass/vendor/assets/javascripts/bootstrap/modal.js',
      'vendor/bootstrap-sass/vendor/assets/javascripts/bootstrap/scrollspy.js'
    ],
    css: [
      'vendor/ng-table/ng-table.css',
      'vendor/font-awesome/css/font-awesome.css',
      'src/vendor/redactor/redactor.css',
      'vendor/angular-bootstrap-datetimepicker/src/css/datetimepicker.css'
    ],
    assets: [
      'vendor/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*',
      'vendor/angularjs-file-upload/FileAPI.flash.swf'
    ],
    fonts: [
      'vendor/font-awesome/fonts/*'
    ]
  }
};
