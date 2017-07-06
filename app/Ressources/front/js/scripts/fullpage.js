/* global jQuery */
module.exports = ( function ( $ ) {

    var ANIMATED_CLASS;

    ANIMATED_CLASS                              = 'animated';
    ALT_CLASS                                   = 'alt';


    function Fullpage( $fullpage ) {

        var $menuBurger;

        $menuBurger                             = $( '.menu-burger' );


        $fullpage.fullpage( {
            anchors:                            [ 'accueil', 'la-sophrologie', 'quels-accompagnements', 'qui-suis-je', 'contact', '' ],
            menu:                               '.site-navigation',
            scrollOverflow:                     true,
            navigation:                         true,
            navigationTooltips:                 [ 'Accueil', 'La Sophrologie', 'Quels accompagnements', 'Qui suis-je ?', 'Contact', '' ],
            afterLoad: function( anchorLink, index ) {
                checkMenuBurger( index );

                if ( index === 1 ) {
                    animateHome();
                } else if ( index === 2 ) {
                    animateSophrology();
                } else if ( index === 3 ) {
                    animateAccompaniments();
                } else if ( index === 4 ) {
                    animateWhoAmI();
                } else if ( index === 5 ) {
                    animateContact();
                }

            },
            onLeave: function( index, nextIndex ){
                if ( window.matchMedia('(max-width: 639px)').matches ) {
                    if( nextIndex === 1 ){
                        $.fn.fullpage.setAutoScrolling( true );
                        $.fn.fullpage.setFitToSection( true );
                    } else {
                        $.fn.fullpage.setAutoScrolling( false );
                        $.fn.fullpage.setFitToSection( false );
                    }

                }
            }
        } );


        /**
         * Toggle "alt" css class on burger menu
         * @return {void}
         */
        function checkMenuBurger( index ) {
            if ( index !== 4 && $menuBurger.hasClass( ALT_CLASS ) ) {
                $menuBurger.removeClass( ALT_CLASS );
            } else if ( index === 4 && !$menuBurger.hasClass( ALT_CLASS ) ) {
                $menuBurger.addClass( ALT_CLASS );
            }

        }

        /**
         * Animate home elements
         * @return {void}
         */
        function animateHome() {
            var $bg, $logo, $title, $text, $scroll;

            $bg                                 = $( '.sch-background' );
            $logo                               = $( '.sch-title-1' );
            $title                              = $( '.sch-title-2' );
            $text                               = $( '.sch-text' );
            $scroll                             = $( '.sch-scroll-bottom' );

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
                                .delay( 250 )
                                .queue( function() {
                                    $text
                                        .addClass( ANIMATED_CLASS ).delay( 100 )
                                        .queue( function() {
                                            $scroll
                                                .addClass( ANIMATED_CLASS )
                                                .dequeue();

                                        } );

                                } );

                        } );

                } );

        }

        /**
         * Animate Sophrology elements
         * @return {void}
         */
        function animateSophrology() {
            var $title, $diagram, $diagramChildren, $text, $textHighlight;

            $title                              = $( '.scs-title-1' );
            $diagram                            = $( '.scs-diagram' );
            $diagramChildren                    = $diagram.children();
            $text                               = $( '.scs-text' );
            $textHighlight                      = $( '.scs-text_highlight' );

            $title
                .addClass( ANIMATED_CLASS )
                .delay( 250 )
                .queue( function() {
                    $diagram
                        .queue( function() {
                            $diagramChildren.each( function( index ) {
                                ( function( figure, i ) {
                                    setTimeout( function() {
                                        $( figure )
                                            .addClass( ANIMATED_CLASS )
                                            .dequeue();

                                    }, 250 * i );

                                } )( this, index );

                            } );

                            $text
                                .addClass( ANIMATED_CLASS )
                                .delay( 250 )
                                .queue( function() {
                                    $textHighlight
                                        .addClass( ANIMATED_CLASS )
                                        .delay( 250 )
                                        .dequeue();
                                } );

                        } );

                } );
        }

        /**
         * Animate accompaniments elements
         * @return {void}
         */
        function animateAccompaniments() {
            var $bg, $title, $tabs;

            $bg                                 = $( '.sca-background' );
            $title                              = $( '.sca-title-1' );
            $tabs                               = $( '.sca-tabs' );

            $bg
                .addClass( ANIMATED_CLASS )
                .delay( 250 )
                .queue( function() {
                    $title
                        .addClass( ANIMATED_CLASS )
                        .delay( 500 )
                        .queue( function() {
                            $tabs
                                .addClass( ANIMATED_CLASS )
                                .delay( 250 )
                                .dequeue();

                        } );

                } );
        }

        /**
         * Animate Who Am I elements
         * @return {void}
         */
        function animateWhoAmI() {
            var $title, $top, $bottom;

            $title                              = $( '.scw-title-1' );
            $top                                = $( '.scw-top' );
            $bottom                             = $( '.scw-bottom' );

            $title
                .addClass( ANIMATED_CLASS )
                .delay( 250 )
                .queue( function() {
                    $top
                        .addClass( ANIMATED_CLASS )
                        .delay( 500 )
                        .queue( function() {
                            $bottom
                                .addClass( ANIMATED_CLASS )
                                .delay( 250 )
                                .dequeue();

                        } );

                } );

        }

        /**
         * Animate contact elements
         * @return {void}
         */
        function animateContact() {
            var $bg, $title, $form;

            $bg                                 = $( '.scc-background' );
            $title                              = $( '.scc-title-1' );
            $form                               = $( '.scc-form' );

            $bg
                .addClass( ANIMATED_CLASS )
                .delay( 250 )
                .queue( function() {
                    $title
                        .addClass( ANIMATED_CLASS )
                        .delay( 250 )
                        .queue( function() {
                            $form
                                .addClass( ANIMATED_CLASS )
                                .delay( 500 )
                                .dequeue();

                        } );

                } );

        }

    }

    return Fullpage;

}( jQuery ) );
