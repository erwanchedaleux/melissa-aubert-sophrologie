<?php
    if( array_key_exists('data', $_POST)) {
        require_once( $_SERVER['DOCUMENT_ROOT'] . '/vendor/michelf/php-markdown/Michelf/Markdown.php' );
        require_once( $_SERVER['DOCUMENT_ROOT'] . '/vendor/michelf/php-markdown/Michelf/MarkdownExtra.php' );

        $content = $_POST[ 'data' ];

        $content = substr($content, strpos($content, '*/') + 2);    // Remove Comment with Pico Meta Data

        die( Michelf\Markdown::defaultTransform($content) );
    }
?>
