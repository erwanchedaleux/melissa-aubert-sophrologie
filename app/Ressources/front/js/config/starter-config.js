/*global PROJECT */
( function() {

    var files = [];

    if ( !window.siteStarter ) {
        return;
    }

    if ( !Modernizr.picture ) {
        files = files.concat( PROJECT.files.picturefill );
    }

    if ( !Modernizr.promises ) {
        files = files.concat( PROJECT.files.promises );
    }

    files = files.concat( PROJECT.files.main );

    window.siteStarter.getFiles( files, true );


}() );
