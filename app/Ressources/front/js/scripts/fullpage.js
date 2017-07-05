/* global jQuery */
module.exports = ( function ( $ ) {

    var ANIMATED_CLASS;

    ANIMATED_CLASS                              = 'animated';

    function Fullpage( $fullpage ) {

        $fullpage.fullpage( {
            anchors:                            [ 'accueil', 'la-sophrologie', 'quels-accompagnements', 'qui-suis-je', 'contact', '' ],
            scrollOverflow:                     true,
            navigation:                         true,
            navigationTooltips:                 [ 'Accueil', 'La Sophrologie', 'Quels accompagnements', 'Qui suis-je ?', 'Contact', '' ],
            afterLoad: function( anchorLink, index ) {
                if ( index === 1 ) {
                    animateHome();
                }

            },
            onLeave: function( index, nextIndex, direction ){
                console.log(index, nextIndex, direction);
            }
        } );


        function animateHome() {
            var $bg, $logo, $title, $text;

            $bg                                 = $( '.sch-background' );
            $logo                               = $( '.sch-title-1' );
            $title                              = $( '.sch-title-2' );
            $text                               = $( '.sch-text' );

            $bg
                .addClass( ANIMATED_CLASS )
                .delay( 250 )
                .queue( function() {
                    $logo
                        .addClass( ANIMATED_CLASS )
                        .delay( 500 )
                        .queue( function() {
                            $title
                                .addClass( ANIMATED_CLASS )
                                .delay( 500 )
                                .queue( function() {
                                    $text
                                        .addClass( ANIMATED_CLASS )
                                        .dequeue();
                                } );
                        } );
                } )



        }

    }

    return Fullpage;

}( jQuery ) );
