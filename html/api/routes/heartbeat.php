<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:38
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/heartbeat Maintain Session
 * @apiName HEARTBEAT
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 202 Accepted
 *  {
 *      "message": "Accepted"
 *  }
 *
 * @apiUse UnauthorizedError
 */
$app->get('/heartbeat', 'heartbeat')->setName('HEARTBEAT');

function heartbeat (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

    $container->logger->info('['.$routename.'] success.');
	$returnData = array('message' => 'Accepted');
    return $response->withJson($returnData, 202);
};