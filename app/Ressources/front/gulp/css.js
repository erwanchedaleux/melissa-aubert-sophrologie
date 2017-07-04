module.exports = function( gulp, pkg, config ) {
    var stylus, postcss, projectVars, autoprefixer, credits, header;

    projectVars                         = require( '../data/variables.json' );
    stylus                              = require( 'gulp-stylus' );
    postcss                             = require( 'gulp-postcss' );
    autoprefixer                        = require( 'autoprefixer' );
    credits                             = require( '../credits.json' );
    header                              = require( 'gulp-header' );

    gulp.task( 'allcss',  function() {
        return gulp
                .src( [
                    config.path.resources.css + 'fonts.styl',
                    config.path.resources.css + 'styles.styl',
                    // config.path.resources.css + '_base64/images.styl',
                    config.path.resources.css + 'font-awesome.styl',
                    config.path.resources.css + 'fullpage.styl'
                ] )
                .pipe( stylus( {
                    "compress" :                                        false,
                    // "use":                                              [ require( './tools/stylus-b64.js' )( config.path.resources.cssImg ) ],
                    "rawDefine":                                        {
                        "projectVars":                                  projectVars
                    }
                } ) )
                .pipe( postcss( [ autoprefixer ], {
                    "map":                                              false
                } ) )
                .pipe( gulp.dest( config.path.web.css ) );
    } );

    gulp.task( 'inlinecss',  function() {
        return gulp
                .src( [
                    config.path.resources.css + 'inlineCSS.styl'
                ] )
                .pipe( stylus( {
                    "compress" :                                        false,
                    // "use":                                              [ require( './tools/stylus-b64.js' )( config.path.resources.cssImg ) ],
                    "rawDefine":                                        {
                        "projectVars":                                  projectVars
                    }
                } ) )
                .pipe( postcss( [ autoprefixer ], {
                    "map":                                              false
                } ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );

};
