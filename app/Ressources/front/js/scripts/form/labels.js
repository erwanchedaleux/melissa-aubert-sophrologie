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
