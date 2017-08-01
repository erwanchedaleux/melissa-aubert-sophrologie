(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global jQuery, document */
( function() {

    var mainInit;

    mainInit                                = require( './scripts/init/main.js' );


    function init() {
        mainInit();

    }


    jQuery( document ).ready(function() {
        init();
    } );

} ).call( this );

},{"./scripts/init/main.js":5}],2:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( /*$*/ ) {

    var STATE_BLUR, STATE_FORCE_BLUR, STATE_FOCUS, STATE_KEYUP, STATE_CHANGE, STATE_INPUT, NO_FOCUS;

    STATE_BLUR                     = 'blur';
    STATE_FORCE_BLUR               = 'forceBlur';
    STATE_FOCUS                    = 'focus';
    STATE_KEYUP                    = 'keyup';
    STATE_CHANGE                   = 'change';
    STATE_INPUT                    = 'input';
    NO_FOCUS                       = false; // To disable focus state

    /* /!\ IMPORTANT : Place a for attribute to the label element to match with this input */

    function Label( $label ) {

        var $field, $input,
            state;

        $field                     = $label.closest( '.fields' );
        $input                     = $field.find( 'input:not([placeholder]), textarea:not([placeholder])' );

        state                      = STATE_BLUR;

        /**
        * Detect if inputs value is different of empty
        */
        function onloadLabels() {
            if ( $input.hasClass( 'password' ) ) {
                $input.value        = '';
            }

            if ( $input.value !== '' && $input.value != null ) {
                state               = STATE_CHANGE;
                changeOpacity();

            }

            $label.css( {
                'display':          'block'
            } );

        }

        /**
        * Makes disapear the label element on focus field
        */
        function focusLabels() {
            if ( state === STATE_BLUR ) {
                state               = STATE_FOCUS;
                changeOpacity();

            }

        }

        /**
        * Makes apear the label element on unfocus field
        */
        function blurLabels( e ) {
            if ( e.type === STATE_FORCE_BLUR || state !== STATE_BLUR && e.currentTarget.value === '' && e.currentTarget.value != null ) {
                state               = STATE_BLUR;
                changeOpacity();

            }

        }

        /**
         * Change state of label element
         */
        function changeLabels( e ) {
            if ( e.currentTarget.value !== '' && e.currentTarget.value != null ) {
                state               = STATE_CHANGE;

            }
            else {
                state               = STATE_FOCUS;

            }

            changeOpacity();

        }

        /**
        * Makes disapear the label element on keyup field
        */
        function keyupLabels( e ) {
            if ( e.currentTarget.value !== '' && e.currentTarget.value != null ) {
                state               = STATE_KEYUP;

            }
            else {
                state               = STATE_FOCUS;

            }

            changeOpacity();

        }

        /**
        * Allow to change opacity with different levels
        */
        function changeOpacity() {
            if ( state === STATE_FOCUS ) {
                $label.css( {
                    'display':      'block'
                } );

                $label.animate( {
                    'opacity':  ( NO_FOCUS ? 1 : 0.3 )
                }, 100, function() {
                    state           = STATE_FOCUS;
                } );

            } else if ( state === STATE_KEYUP || state === STATE_CHANGE ) {
                $label.animate( {
                    'opacity':  0
                }, 100, function() {
                    $label.css( {
                        'display':  'none'
                    } );
                } );

            } else if ( state === STATE_BLUR ) {
                $label.css( {
                    'display':      'block'
                } );

                $label.animate( {
                    'opacity':  1,
                }, 100 );

            }

        }


        if ( $input && $label.css( 'position' ) === 'absolute' ) {
            onloadLabels();
            $input.on( STATE_FOCUS, focusLabels );
            $input.on( STATE_INPUT, changeLabels );
            $input.on( STATE_BLUR, blurLabels );
            $input.on( STATE_FORCE_BLUR, blurLabels );
            $input.on( STATE_KEYUP, keyupLabels );

        }


    }

    return Label;

}( jQuery ) );

},{}],3:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function Form( $form ) {

        var Labels,
            $submitBtn, $labels;

        Labels                                  = require( './labels.js' );

        $submitBtn                              = $form.find( '.btn-submit' );
        $labels                                 = $( '.labels-placeholder' );


        // If label type elements are detected, call associated object class to manage it
        if ( $labels.length ) {

            $labels.each( function( index, label ) {
                new Labels( $( label ) );
            } );

        }


        /**
         * [submitForm description]
         * @return {[type]} [description]
         */
        function submitForm( e ) {
            e.preventDefault();

            $.smkProgressBar( {
                element:                        'body',
                status:                         'start',
                bgColor:                        'rgba( 255, 255, 255, 0.7 )',
                barColor:                       '#1b7491'
            } );

            setTimeout( function() {
                $.smkProgressBar( {
                    status:                     'end'
                } );
            }, 1000 );

            if( $form.smkValidate() ){

                $.smkAlert( {
                    text:                       'Merci, votre message a bien été envoyé !',
                    type:                       'success',
                    icon:                       'fa fa-check-circle',
                } );

                $.fn.fullpage.moveTo( 1 );

                setTimeout( function() {
                    $form.submit();

                }, 3000 );

            }

        }


        $submitBtn.on( 'click', submitForm );

    }

    return Form;

}( jQuery ) );

},{"./labels.js":2}],4:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    var ANIMATED_CLASS, ALT_CLASS, IDLE_STATE, LOADED_STATE, DISPLAYED_CLASS, 
        menuOffsetTop, menuOffsetBottom, menuBurgerState;

    ANIMATED_CLASS                              = 'animated';
    ALT_CLASS                                   = 'alt';
    DISPLAYED_CLASS                             = 'displayed';
    IDLE_STATE                                  = 'idle';
    LOADED_STATE                                = 'loaded';

    menuOffsetTop                               = 0;
    menuOffsetBottom                            = 0;
    menuBurgerState                             = IDLE_STATE;


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

            menuOffsetTop                       = 0;
            menuOffsetBottom                    = parseInt( $( window ).height(), 10 );

            $menuBurger.addClass( DISPLAYED_CLASS );

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

            menuOffsetTop                       = 0;
            menuOffsetBottom                    = parseInt( $title.offset().top + $title.height() - 20, 10 );

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

            menuOffsetTop                       = parseInt( $title.offset().top - 60, 10 );
            menuOffsetBottom                    = parseInt( $title.offset().top + $title.height() - 20, 10 );

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

            menuOffsetTop                       = parseInt( $title.offset().top - 60, 10 );
            menuOffsetBottom                    = parseInt( $title.offset().top + $title.height() - 20, 10 );

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

            menuOffsetTop                       = parseInt( $title.offset().top - 60, 10 );
            menuOffsetBottom                    = parseInt( $title.offset().top + $title.height() - 20, 10 );

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

        /**
         * [onScrollHandler description]
         * @return {[type]} [description]
         */
        function onScrollHandler() {
            if ( menuBurgerState === LOADED_STATE ) {
                return;
            }

            if ( $( window ).scrollTop() >= menuOffsetTop && $( window ).scrollTop() <= menuOffsetBottom ) {
                menuBurgerState                 = LOADED_STATE;

                $menuBurger
                    .addClass( DISPLAYED_CLASS )
                    .delay( 250 )
                    .queue( function() {
                        menuBurgerState         = IDLE_STATE;
                        $menuBurger.dequeue();
                    } );

            } else {
                $menuBurger
                    .removeClass( DISPLAYED_CLASS )
                    .delay( 250 )
                    .queue( function() {
                        menuBurgerState         = IDLE_STATE;
                        $menuBurger.dequeue();
                    } );
            }

        }


        if ( window.matchMedia('(max-width: 639px)').matches ) {
            $( window ).on ( 'scroll', onScrollHandler );
        }

    }

    return Fullpage;

}( jQuery ) );

},{}],5:[function(require,module,exports){
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

},{"../form/validation.js":3,"../fullpage.js":4,"../navigation.js":6,"../tabs.js":7}],6:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function Navigation( $menu ) {

        var NAV_OPENED_CLASS, NO_SCROLL_CLASS, ACTIVE_CLASS,
            $body, $mask, $siteNavigation;

        NAV_OPENED_CLASS                    = 'navigation-opened';
        NO_SCROLL_CLASS                     = "no-scroll";
        ACTIVE_CLASS                        = 'active';

        $body                               = $( 'body' );
        $mask                               = $( '.site-mask' );
        $siteNavigation                     = $( '.site-navigation' );


        /**
         * Allows to toggle body css class to open or close mobile navigation
         * @return {void}
         */
        function toggleMobileNavigation() {
            $body.toggleClass( NAV_OPENED_CLASS ).toggleClass( NO_SCROLL_CLASS );
            $mask.toggleClass( ACTIVE_CLASS );

            if ( $body.hasClass( NAV_OPENED_CLASS ) ) {
                $.fn.fullpage.setAllowScrolling( false );
            } else {
                $.fn.fullpage.setAllowScrolling( true );
            }

        }

        /**
         * Allows to remove mobile navigation aspect if window is more than 1023px
         * Or if user click on item menu
         * @param  {event} e - event
         * @return {void}
         */
        function removeMobileNavigation( e ) {
            if ( e.type === 'resize' ) {
                return;
            }

            $body.removeClass( NAV_OPENED_CLASS ).removeClass( NO_SCROLL_CLASS );
            $mask.removeClass( ACTIVE_CLASS );
            $.fn.fullpage.setAllowScrolling( true );

        }


        $menu.on( 'click', toggleMobileNavigation );
        $siteNavigation.on( 'click', '.sn-lnk', removeMobileNavigation );
        $( window ).on( 'resize', removeMobileNavigation );

    }

    return Navigation;

}( jQuery ) );

},{}],7:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( /*$*/ ) {

    function Tabs( $tab ) {

        $tab.tabslet( {
            mouseevent:                     'click',
            attribute:                      'href',
            animation:                      true
        } );

    }

    return Tabs;

}( jQuery ) );

},{}]},{},[1])