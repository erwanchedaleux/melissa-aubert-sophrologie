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

},{}],5:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function init() {

        var NavigationMobile,Fullpage, Tabs, Form,
            $navigationMobile, $fullpage, $forms, $tabs;

        NavigationMobile                        = require( '../navigation-mobile.js' );
        Fullpage                                = require( '../fullpage.js' );
        Tabs                                    = require( '../tabs.js' );
        Form                                    = require( '../form/validation.js' );

        $navigationMobile                       = $( '.site-navigation-mobile' );
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

},{"../form/validation.js":3,"../fullpage.js":4,"../navigation-mobile.js":6,"../tabs.js":7}],6:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function NavigationMobile( $navigationMobile ) {

        var NAV_OPENED_CLASS, NO_SCROLL_CLASS, ACTIVE_CLASS,
            $body, $mask, $siteNavigation;

        NAV_OPENED_CLASS                    = 'navigation-mobile-opened';
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
            if ( window.matchMedia('(max-width: 1023px)').matches ) {
                $body.toggleClass( NAV_OPENED_CLASS ).toggleClass( NO_SCROLL_CLASS );
                $mask.toggleClass( ACTIVE_CLASS );

            }

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
            if ( e.type === 'resize' && window.matchMedia('(max-width: 1023px)').matches ) {
                return;
            }

            $body.removeClass( NAV_OPENED_CLASS ).removeClass( NO_SCROLL_CLASS );
            $mask.removeClass( ACTIVE_CLASS );
            $.fn.fullpage.setAllowScrolling( true );

        }


        $navigationMobile.on( 'click', toggleMobileNavigation );
        $siteNavigation.on( 'click', '.sn-lnk', removeMobileNavigation );
        $( window ).on( 'resize', removeMobileNavigation );

    }

    return NavigationMobile;

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