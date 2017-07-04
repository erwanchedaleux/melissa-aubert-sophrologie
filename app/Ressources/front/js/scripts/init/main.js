/* global jQuery */
module.exports = ( function ( $ ) {

    function init() {

        var NavigationMobile,Fullpage, Form,
            $navigationMobile, $fullpage, $forms;

        NavigationMobile                        = require( '../navigation-mobile.js' );
        Fullpage                                = require( '../fullpage.js' );
        Form                                    = require( '../form/validation.js' );

        $navigationMobile                       = $( '.site-navigation-mobile' );
        $fullpage                               = $( '.fullpage' );
        $forms                                  = $( '.forms' );


        if ( $navigationMobile ) {
            new NavigationMobile( $navigationMobile );

        }

        if ( $fullpage ) {
            new Fullpage( $fullpage );

        }

        if ( $forms.length ) {
            $forms.each( function( index, form ) {
                new Form( $( form ) );

            } );

        }

    }


    return init;

} )( jQuery );
