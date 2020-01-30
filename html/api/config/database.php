<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:04
 */

/**
 * Database connect module - PDO
 * for SQL Server
 */
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO('sqlsrv:server=' . $db['host'] . ', ' . $db['port'] . ';Database=' . $db['dbname'],
        $db['user'], $db['pass']);
    // utf8 support
    $pdo->setAttribute(PDO::SQLSRV_ATTR_ENCODING, PDO::SQLSRV_ENCODING_UTF8);
    // return number for numberic type field
	$pdo->setAttribute(PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true);
	// throw exception when error
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    // default fetch mode - array
    $pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    return $pdo;
};

?>