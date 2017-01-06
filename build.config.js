/**
 * Created by nicksergan on 21.07.2016.
 */

/**
 * Configurations for build process.
 */
module.exports = {
    build_dir: 'build',
    compile_dir: 'dist',

    app_files: {
        js: ['src/app/app.js', 'src/app/**/*.module.js', 'src/app/**/*.js'],
        tpl: ['src/app/**/*.tpl.html'],
        html: ['src/index.html'],
        less: 'src/less/main.less'
    },

    autoprefixer_browsers: ['last 2 versions'],

    vendor_files: {
        js: [
            'vendor/jquery/dist/jquery.min.js',
            // 'vendor/jquery-touchswipe/jquery.touchSwipe.min.js',

            'vendor/angular/angular.min.js',
            'vendor/angular-aria/angular-aria.min.js',
            'vendor/angular-animate/angular-animate.min.js',
            'vendor/angular-cookies/angular-cookies.min.js',
            'vendor/angular-messages/angular-messages.min.js',
            'vendor/angular-resource/angular-resource.min.js',
            'vendor/angular-sanitize/angular-sanitize.min.js',
            // 'vendor/angular-touch/angular-touch.min.js',
            // 'vendor/angular-local-storage/angular-local-storage.min.js',

            'vendor/angular-scroll/angular-scroll.min.js',

            'vendor/angular-ui-router/release/angular-ui-router.min.js',

            'vendor/bootstrap/dist/js/bootstrap.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',

            // angular-material
            'vendor/angular-material/angular-material.min.js',

            // translate
            // 'vendor/angular-translate/angular-translate.min.js',
            // 'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            // 'vendor/angular-translate-storage-local/angular-translate-storage-local.min.js',
            // 'vendor/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
            // 'vendor/angular-translate-once/src/translate-once.js',

            // Grid
            // 'vendor/kendo-ui-all/js/kendo.core.min.js',
            // 'vendor/kendo-ui-all/js/kendo.angular.min.js',
            // 'vendor/kendo-ui-all/js/kendo.data.min.js',
            // 'vendor/kendo-ui-all/js/kendo.pager.min.js',
            // 'vendor/kendo-ui-all/js/kendo.grid.min.js',
            // // 'vendor/kendo-ui-all/js/kendo.upload.min.js',
            // // 'vendor/kendo-ui-all/js/kendo.tabstrip.min.js',
            // // Файлы для изменения данных в таблице Grid
            // // 'vendor/kendo-ui-all/js/kendo.columnsorter.min.js',
            // // 'vendor/kendo-ui-all/js/kendo.calendar.min.js',
            // 'vendor/kendo-ui-all/js/kendo.popup.min.js',
            // // 'vendor/kendo-ui-all/js/kendo.datepicker.min.js',
            // 'vendor/kendo-ui-all/js/kendo.userevents.min.js',
            // 'vendor/kendo-ui-all/js/kendo.numerictextbox.min.js',
            // 'vendor/kendo-ui-all/js/kendo.validator.min.js',
            // 'vendor/kendo-ui-all/js/kendo.binder.min.js',
            // 'vendor/kendo-ui-all/js/kendo.editable.min.js',
            // 'vendor/kendo-ui-all/js/kendo.draganddrop.min.js',
            // 'vendor/kendo-ui-all/js/kendo.window.min.js',
            // Файлы для фильтра в таблице Grid
            // 'vendor/kendo-ui-all/js/kendo.list.min.js',
            // 'vendor/kendo-ui-all/js/kendo.dropdownlist.min.js',
            // 'vendor/kendo-ui-all/js/kendo.filtermenu.min.js',
            // 'vendor/kendo-ui-all/js/kendo.filtercell.min.js',
            // 'vendor/kendo-ui-all/js/kendo.autocomplete.min.js',
            //Файлі дял MultiSelect
            // 'vendor/kendo-ui-all/js/kendo.fx.min.js',
            // 'vendor/kendo-ui-all/js/kendo.mobile.scroller.min.js',
            // 'vendor/kendo-ui-all/js/kendo.virtuallist.min.js',
            // 'vendor/kendo-ui-all/js/kendo.multiselect.min.js',

            // Файлы для локализации
            // 'vendor/kendo-ui-all/js/messages/kendo.messages.ru-RU.min.js',
            // 'vendor/kendo-ui-all/js/cultures/kendo.culture.ru.min.js',
            // 'vendor/kendo-ui-all/js/cultures/kendo.culture.ru-RU.min.js',

            // auth0
            // 'vendor/auth0.js/build/auth0.min.js',

            // uncomment
            'vendor/a0-angular-storage/dist/angular-storage.min.js',

            // 'vendor/angular-jwt/dist/angular-jwt.min.js',
            // 'vendor/auth0-lock/build/auth0-lock.js',
            // 'vendor/auth0-angular/build/auth0-angular.min.js',

            // uncomment
            // 'vendor/auth0-lock/build/lock.min.js',
            // 'vendor/angular-lock/dist/angular-lock.min.js',
            'vendor/angular-jwt/dist/angular-jwt.min.js',

            // ui-select
            'vendor/ui-select/dist/select.min.js',
            // range slider
            'vendor/angular-rangeslider/angular.rangeSlider.js',
            // fancybox
            // 'vendor/fancybox/source/jquery.fancybox.pack.js',
            // 'vendor/fancybox/source/helpers/jquery.fancybox-thumbs.js',

            // 'vendor/angulartics/dist/angulartics.min.js',
            // 'vendor/angulartics/dist/angulartics-newrelic-insights.min.js',
            // 'vendor/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
            // 'vendor/angulartics-facebook-pixel/dist/angulartics-facebook-pixel.min.js',

            'vendor/ngMeta/dist/ngMeta.min.js',
            // 'vendor/re-tree/re-tree.min.js',
            // 'vendor/ng-device-detector/ng-device-detector.min.js'
        ],
        css: [
            'vendor/angular-material/angular-material.min.css',

            'vendor/font-awesome/css/font-awesome.min.css',

            // 'vendor/kendo-ui-all/styles/kendo.common.core.min.css',
            // 'vendor/kendo-ui-all/styles/kendo.common-material.min.css',
            // 'vendor/kendo-ui-all/styles/kendo.material.min.css',

            'vendor/bootstrap/dist/css/bootstrap.min.css',
            // ui-select
            'vendor/ui-select/dist/select.min.css',
            // range slider
            'vendor/angular-rangeslider/angular.rangeSlider.css',
            // fancybox
            // 'vendor/fancybox/source/jquery.fancybox.css',
            // 'vendor/fancybox/source/helpers/jquery.fancybox-thumbs.css'
        ],
        assets: [
            // 'vendor/fancybox/source/*.gif',
            // 'vendor/fancybox/source/*.png',
            // 'vendor/fancybox/source/helpers/*.png',
            // 'vendor/bootstrap/dist/fonts/*',
            //
            // 'vendor/font-awesome/fonts/*',
            //
            // 'vendor/kendo-ui-all/styles/fonts/*',
            // 'vendor/kendo-ui-all/styles/images/*',
            // 'vendor/kendo-ui-all/styles/Material/*',
            // 'vendor/kendo-ui-all/styles/textures/*'
        ],
        fonts: [
            'vendor/bootstrap/dist/fonts/*',
            'vendor/font-awesome/fonts/*',
        ],

        kendo_images: [
            'vendor/kendo-ui-all/styles/images/*',
        ],

        kendo_material: [
            'vendor/kendo-ui-all/styles/Material/*',
        ],

        kendo_textures: [
            'vendor/kendo-ui-all/styles/textures/*',
        ]
    }
};
