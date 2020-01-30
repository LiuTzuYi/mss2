<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-08-14 18:30:18
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-22 17:49:55
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->group('/liveMonitor', function() {
	$this->get('', 'getDeviceData')->setName('LIVEMONITOR - GET DEVICE MONITOR SETTING');
	$this->get('/play[/{vehicle}[/{channel}]]', 'liveMonitorPlay')->setName('LIVEMONITOR - PLAY');
});

function getDeviceData (Request $request, Response $response, array $args){
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

	$camList = implode(", dev.", $setting['data']['camList']);

	$sql = "SELECT DISTINCT dev.md_id AS id, dev.".$camList.", veh.vrm_mark_code AS name, ISNULL(veh.vrm_mark_code,'')+' ['+ISNULL(ou.title,'')+']' AS display FROM mob_device AS dev LEFT JOIN vehicle AS veh ON dev.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE dev.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataList = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($dataList){
			foreach ($dataList as $key => $value){
				$dataList[$key]['name'] = $company_id.'-'.$value['name'];
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $dataList, 'camlist' => $setting['data']['camList']);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11223] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11223');
		return $response->withJson($returnData,400);
	}
};

function liveMonitorPlay (Request $request, Response $response, array $args){
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

	$params = array();

	if(isset($args['vehicle'])){
		$params['vehicle'] = $args['vehicle'];
	}
	if(isset($args['channel'])){
		$params['channel'] = $args['channel'];
	}

	$container->logger->info('['.$routename.'] parameters:', $params);

	$url = $setting['api']['yuweipath']['livehost'].$setting['api']['yuweipath']['liveMonitor'];

	if(isset($args['vehicle'])){
		$url .= 'PlateNum='.$args['vehicle'];
		if(isset($args['channel'])){
			$url .= '&ChannelNum='.implode(",",explode("-",$args['channel']));
		}
	}

	$container->logger->info('['.$routename.'] success.');

	return $response->withRedirect($url);
};