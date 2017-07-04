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
