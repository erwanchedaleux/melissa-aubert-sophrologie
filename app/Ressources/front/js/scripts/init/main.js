/* global jQuery */
module.exports = ( function ( $ ) {

    function init() {

        var NavigationMobile,Fullpage, Tabs, Form,
            $navigationMobile, $fullpage, $forms, $tabs;

        NavigationMobile                        = require( '../navigation.js' );
        Fullpage                                = require( '../fullpage.js' );
        Tabs                                    = require( '../tabs.js' );
        Form                                    = require( '../form/validation.js' );

        $navigationMobile                       = $( '.menu-burger' );
        $fullpage                               = $( '.fullpage' );
        $tabs                                   = $( '.tabs' );
        $forms                                  = $( '.forms' );


        if ( $navigationMobile ) {
            new NavigationMobile( $navigationMobile );

        }

        if ( $fullpage ) {
            new Fullpage( $fullpage );

        }

        if ( $tabs.length ) {
            $tabs.each( function( index, tab ) {
                new Tabs( $( tab ) );

            } );

        }

        if ( $forms.length ) {
            $forms.each( function( index, form ) {
                new Form( $( form ) );

            } );

        }

    }


    return init;

} )( jQuery );
