/* global jQuery */
module.exports = ( function ( $ ) {

    function Fullpage( $fullpage ) {

        $fullpage.fullpage( {
            anchors:                            [ 'accueil', 'la-sophrologie', 'quels-accompagnements', 'qui-suis-je', 'contact', '' ],
            scrollOverflow:                     true,
            navigation:                         true,
            navigationTooltips:                 [ 'Accueil', 'La Sophrologie', 'Quels accompagnements', 'Qui suis-je ?', 'Contact', '' ],
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
