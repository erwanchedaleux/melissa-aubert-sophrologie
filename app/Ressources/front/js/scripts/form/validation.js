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
                barColor:                       '#f59434'
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
