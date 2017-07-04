/* global jQuery */
module.exports = ( function ( $ ) {

    function Fullpage( $fullpage ) {

        $fullpage.fullpage( {
            anchors:                            [ 'home', 'about-me', 'references', 'contact', '' ],
            scrollOverflow:                     true,
            navigation:                         true,
            navigationTooltips:                 [ 'Accueil', 'A propos de moi', 'Références', 'contact', '' ],
            onLeave: function( index ){
                if ( window.matchMedia('(max-width: 1023px)').matches ) {
                    if( index === 3 ){
                        $.fn.fullpage.setAutoScrolling( false );
                    } else {
                        $.fn.fullpage.setAutoScrolling( true );
                    }

                }
            }
        } );

    }

    return Fullpage;

}( jQuery ) );
