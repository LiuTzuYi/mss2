<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:13
 */

/**
 * Log module - Monolog
 */
$container['logger'] = function ($c) {
    $logset = $c['settings']['logger'];
    // initial logger
    $logger = new Monolog\Logger($logset['name']);
    // set log variable
    $dateFormat = "Y-m-d H:i:s";
    $sessionId = session_id();
    if(isset($_SESSION['user'])){
        $comp = $_SESSION['user']->company_code;
        $user = $_SESSION['user']->username;
    }
    else{
        $comp = "";
        $user = "";
    }
    // format log
    $output = "[%datetime%][".$sessionId."][%level_name%][".$comp."][".$user."]%message% %context% %extra%\n";
    $formatter = new Monolog\Formatter\LineFormatter($output, $dateFormat, true, true);
    // include trackback for exception
    $formatter->includeStacktraces(true);
    // output log stream
    $stream = new Monolog\Handler\StreamHandler($logset['path']."_".date("Y-m-d").".log", Monolog\Logger::DEBUG);
    $stream->setFormatter($formatter);
    $logger->pushHandler($stream);
    return $logger;
};
?>
