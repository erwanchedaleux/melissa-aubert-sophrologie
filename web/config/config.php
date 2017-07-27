<?php
/**
 * Pico configuration
 *
 * @author  Gilbert Pellegrom
 * @link    http://picocms.org
 * @license http://opensource.org/licenses/MIT The MIT License
 * @version 1.0
 */

/*
 * BASIC
 */
$config['site_title'] = 'Mélissa Aubert';                  // Site title
// $config['base_url'] = 'http://www.melissa-aubert-sophrologie.fr/';      // Override base URL (e.g. http://example.com) [/melissa-aubert-sophrologie/]
$config['rewrite_url'] = true;                              // A boolean indicating forced URL rewriting

/*
 * THEME
 */
 $config['twig_config'] = array(              // Twig settings
     'cache' => false,                        // To enable Twig caching change this to a path to a writable directory
     'autoescape' => false,                   // Auto-escape Twig vars
     'debug' => false                          // Enable Twig debug
 );

/*
 * PLUGINS
 */
$config['pages_order_by'] = 'placing';

/*
 * CUSTOM
 */
// $config['custom_setting'] = 'Hello';         // Can be accessed by {{ config.custom_setting }} in a theme
$pkg_file                = file_get_contents("./../app/Ressources/front/package.json", FILE_USE_INCLUDE_PATH);
$pkg_json                = json_decode($pkg_file, true);
$config['version']       = ( $config['twig_config']['debug'] ? time() : $pkg_json['version'] );
