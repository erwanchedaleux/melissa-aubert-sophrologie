<?php // @codingStandardsIgnoreFile

// check PHP version
if (PHP_VERSION_ID < 50306) {
    die('Pico requires PHP 5.3.6 or above to run');
}

// load dependencies
require_once(__DIR__ . '/vendor/autoload.php');

// instance Pico
$pico = new Pico(
    __DIR__,    // root dir
    'config/',  // config dir
    'plugins/', // plugins dir
    'themes/'   // themes dir
);

// run application
echo $pico->run();

$lastname       = $_POST['contact_form_lastname'];
$firstname      = $_POST['contact_form_firstname'];
$email          = $_POST['contact_form_email'];
$message        = $_POST['contact_form_message'];

if(isset($lastname) && !empty($lastname) &&
isset($firstname) && !empty($firstname) &&
isset($email) && !empty($email) &&
isset($message) && !empty($message)) {


    $mailFrom       = 'contact@melissa-aubert-sophrologie.fr';
    $mailTo         = 'sophrologie.ma@gmail.com';
    $password       = 'XXXXXXXXXXX';

    $swiftTransport = Swift_SmtpTransport::newInstance('SSL0.OVH.NET', 587) ->setUsername($mailFrom) ->setPassword($password);


    // send email
    $swiftMessage   = Swift_Message::newInstance();
    $swiftMessage   ->setSubject('Contact depuis mon portfolio')
                    ->setFrom(array($mailFrom => 'Contact - Site'))
                    ->setTo($mailTo)
                    ->setBody( '<strong>Nom et prénom :</strong> '.$firstname.' '.$lastname.' <br />'. '<strong>E-mail :</strong> '.$email.' <br /><strong>Envoyé le</strong> '.date('d/m/Y', time()).'<br /><br /><strong>Message :</strong><br />'. nl2br($message), 'text/html' ) ;
    $swiftMailer    = Swift_Mailer::newInstance($swiftTransport);
    $result         = $swiftMailer->send($swiftMessage);

    if(!$result){
        echo "<script>alert('Désolé, une erreur s\'est produite, veuillez réessayer ultérieurement.')</script>";
    }

}
