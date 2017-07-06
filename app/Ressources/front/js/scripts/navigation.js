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
