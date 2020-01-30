<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:22
 */

/**
 * Mailing module - PHPMailer
 */
$container['mailer'] = function ($c) {
    $mailer = $c['settings']['mailer'];
    try {
    	// inital mailer
    	$mail = new PHPMailer\PHPMailer\PHPMailer(true);
    	// set charater support
    	$mail->CharSet = $mailer['CharSet'];
    	// debug level
    	$mail->SMTPDebug = $mailer['SMTPDebug'];
    	// debug output
	    $mail->Debugoutput = $mailer['Debugoutput'];
    	// send via SMTP
	    $mail->isSMTP();
	    // mailer setting
	    $mail->Host = $mailer['host'];
	    $mail->SMTPAuth = $mailer['SMTPAuth'];
	    $mail->Username = $mailer['username'];
	    $mail->Password = $mailer['password'];
	    $mail->SMTPSecure = $mailer['SMTPSecure'];
	    $mail->Port = $mailer['port'];
	    $mail->SMTPOptions = $mailer['SMTPoption'];
	    $mail->setFrom($mailer['sender']);
	    return $mail;
    }
    catch (Exception $e) {
	    return FALSE;
	}
};

?>