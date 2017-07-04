module.exports = function( gulp, pkg, config ) {
    var browserify, gulpConcat, projectVars, stringifyOptions;

    projectVars                         = require( '../data/variables.json' );
    browserify                          = require( 'gulp-browserify' );
    gulpConcat                          = require( 'gulp-concat' );

    stringifyOptions                    = [ "stringify",
        {
            "extension":                                ".html",
            "minify":                                   true,
            "minifier": {
                "extensions":                           [ '.html' ],
                "options": {
                    "removeComments":                   true,
                    "removeCommentsFromCDATA":          true,
                    "removeCDATASectionsFromCDATA":     true,
                    "collapseWhitespace":               true,
                    "conservativeCollapse":             false,
                    "preserveLineBreaks":               false,
                    "collapseBooleanAttributes":        false,
                    "removeAttributeQuotes":            true,
                    "removeRedundantAttributes":        false,
                    "useShortDoctype":                  false,
                    "removeEmptyAttributes":            false,
                    "removeScriptTypeAttributes":       false,
                    "removeStyleLinkTypeAttributes":    false,
                    "removeOptionalTags":               false,
                    "removeIgnored":                    false,
                    "removeEmptyElements":              false,
                    "lint":                             false,
                    "keepClosingSlash":                 false,
                    "caseSensitive":                    false,
                    "minifyJS":                         false,
                    "minifyCSS":                        false,
                    "minifyURLs":                       false
                }
            }
        }
    ];

    gulp.task( 'browserify',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'scripts.js'
                ] )
                .pipe( browserify( {
                    "transform": [
                        stringifyOptions
                    ],
                    "external":                                             []
                } ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );

    gulp.task( 'browserifyPolyfill',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/polyfill/promises.js',
                    config.path.resources.js + 'vendor/polyfill/picturefill.js'
                ] )
                .pipe( browserify( {
                    "transform": [
                        stringifyOptions
                    ],
                    "external":                                             []
                } ) )
                .pipe( gulp.dest( config.path.web.js + 'polyfill/' ) );
    } );



    gulp.task( 'concatMain',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/modernizr/modernizr.js',
                    config.path.resources.js + 'vendor/modernizr/addons.js',
                    config.path.resources.js + 'vendor/modernizr/old-browser-redirect.js',
                    config.path.resources.js + 'config/starter-config.js'
                ] )
                .pipe( gulpConcat( 'main.js' ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );



    gulp.task( 'concatLib',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/polyfill/polyfill.js',
                    config.path.resources.js + 'vendor/jquery/jquery.js',
                    config.path.resources.js + 'vendor/jquery/scrolloverflow.js',
                    config.path.resources.js + 'vendor/jquery/jquery.fullpage.js',
                    config.path.resources.js + 'vendor/jquery/typed.js',
                    config.path.resources.js + 'vendor/jquery/smoke.js',
                    config.path.resources.js + 'vendor/jquery/jquery.tabslet.js',
                ] )
                .pipe( gulpConcat( 'lib.js' ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );

    gulp.task( 'concatInlineJSDev',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/loadcss/loadCSS.js',
                    config.path.resources.js + 'vendor/loadcss/cssrelpreload.js'
                ] )
                .pipe( gulpConcat( 'inlineJS-dev.js' ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );



    gulp.task( 'concatInlineJSProd',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/loadcss/loadCSS.js',
                    config.path.resources.js + 'vendor/loadcss/cssrelpreload.js',
                    config.path.resources.js + 'config/starter.js'
                ] )
                .pipe( gulpConcat( 'inlineJS-prod.js' ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );

};
