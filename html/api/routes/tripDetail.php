<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-19 11:57:18
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/warnFilter/:filter_type Get Trip Detail Filter List
 * @apiName WARNING - GET FILTER LIST
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of filter list data
 * @apiSuccess {String} data.licenceId Vehicle id [vrm_id]
 * @apiSuccess {String} data.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.driverId Driver id [driver_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.groupName Driver/Vehicle group name [grp_alias]
 * @apiSuccess {String} data.vehiclegrpId Vehicle group id [vrm_grp_id]
 * @apiSuccess {String} data.drivergrpId Driver group id [drv_grp_id]
 * @apiSuccess {Object[]} data.vehicleBelong List of vehicles belong to group
 * @apiSuccess {String} data.vehicleBelong.id Vehicle id [vrm_id]
 * @apiSuccess {String} data.vehicleBelong.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {Object[]} data.driverBelong List of drivers belong to group
 * @apiSuccess {String} data.id Driver id [driver_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "licenceId": "2337",
 *              "licence": "1001-1800-1138-cfac"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupName": "123",
 *              "vehiclegrpId": "13",
 *              "vehicleBelong": {
 *                  "id": "1327",
 *                  "licence": "GS-Tester-A-0938"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "driverId": "11753",
 *              "name": "2223"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupName": "123",
 *              "drivergrpId": "13",
 *              "driverBelong": {
 *                  "id": "11753",
 *                  "name": "2223"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10202 MySql error
 * @apiError (400) ParameterError_10203 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/warnFilter/{filter_type}', 'getWarnFilter')->setName('WARNING - GET FILTER LIST');

/**
 * @api {post} /api/warnTrip/:filter_type Get Trip List
 * @apiName WARNING - GET TRIP LIST
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 * @apiParam (Request Body) {String} start Start date
 * @apiParam (Request Body) {String} end End date
 * @apiParam (Request Body) {String[]} arrayData Vehicle/Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of trip data by vehicle/driver
 * @apiSuccess {String} data.distance Trip distance [drv_distance]
 * @apiSuccess {String} data.drv_name Trip driver name [name]
 * @apiSuccess {String} data.drv_name_ou Driver department [title]
 * @apiSuccess {String} data.duration Trip duration
 * @apiSuccess {String} data.endDate Trip end time [end_time]
 * @apiSuccess {String} data.licence Trip vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.licence_ou Vehicle department [title]
 * @apiSuccess {String} data.startDate Trip start time [start_time]
 * @apiSuccess {String} data.trip_id Trip id [veh_trip_id]
 * @apiSuccess {String} data.type Vehicle type [veh_type_code]
 * @apiSuccess {String} data.vrm_id Vehicle id [vrm_id]
 * @apiSuccess {String} data.driver_id Driver id [driver_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "distance": "0.0",
 *              "drv_name": null,
 *              "drv_name_ou": null,
 *              "duration": "00:43",
 *              "endDate": "2019-03-21 10:36:12",
 *              "licence": "GS-Tester-A-0765",
 *              "licence_ou: "Root",
 *              "startDate": "2019-03-21 09:52:42",
 *              "trip_id": "2856441",
 *              "type": "OTHERS_DEFAULT",
 *              "vrm_id": "955"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "distance": "0.0",
 *              "drv_name": "aa9a",
 *              "drv_name_ou": "lv2 u6",
 *              "duration": "00:43",
 *              "endDate": "2019-03-21 10:36:12",
 *              "licence": "GS-Tester-A-0765",
 *              "licence_ou: "Root",
 *              "startDate": "2019-03-21 09:52:42",
 *              "trip_id": "2856441",
 *              "type": "OTHERS_DEFAULT",
 *              "driver_id": "2179"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10204 MySql error
 * @apiError (400) ParameterError_10205 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/warnTrip/{filter_type}', 'getWarnTrip')->setName('WARNING - GET TRIP LIST');

/**
 * @api {post} /api/warnTripData/:map/:filter_type Get Trip Detail
 * @apiName WARNING - GET TRIP DATA
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 *
 * @apiParam (Request Body) {String} start Start time
 * @apiParam (Request Body) {String} end End time
 * @apiParam (Request Body) {String} id Vehicle/Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning data of trip
 * @apiSuccess {Number} data.duration Warning duration
 * @apiSuccess {Number} data.end_spd Warning end speed
 * @apiSuccess {Number} data.hw Warning headway distance
 * @apiSuccess {Number} data.near_hw Warning nearest headway distance
 * @apiSuccess {Number} data.start_spd Warning start speed
 * @apiSuccess {Number} data.start_time Warning start time
 * @apiSuccess {String} data.start_time_utc Warning start time millionseconds
 * @apiSuccess {Number} data.state Driver action
 * @apiSuccess {Number} data.top_spd Warning top speed
 * @apiSuccess {String} data.video Warning video id
 * @apiSuccess {String} data.videoReady Warning video status
 * @apiSuccess {String} data.warningType Warning type
 * @apiSuccess {Object[]} dataPoint List of warning location data of trip
 * @apiSuccess {Number[]} dataPoint.mark Warning location
 * @apiSuccess {String} dataPoint.warn Warning type
 * @apiSuccess {String} dataPoint.video Warning video id
 * @apiSuccess {String} dataPoint.videoReady Warning video status
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "duration": 1.64,
 *              "end_spd": 35,
 *              "hw": 0,
 *              "near_hw": 0,
 *              "start_spd": 35,
 *              "start_time": "2019-03-21 09:37:35",
 *              "start_time_utc": 1553132255,
 *              "state": 2,
 *              "top_spd": 35,
 *              "video": "2_20190321_093735_c7Eo9Ux",
 *              "videoReady": "N",
 *              "warningType": "PCW"
 *          }
 *      ],
 *      "dataPoint": [
 *          {
 *              "mark": [22.263154999999998, 114.23816666666669],
 *              "time_utc": 1549807138,
 *              "video": null,
 *              "videoReady": null,
 *              "warn": "UFCW"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) RequestError_10206 Baidu Call Error
 * @apiError (400) InternalError_10207 MySql error
 * @apiError (400) ParameterError_10208 Wrong Parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/warnTripData/{map}/{filter_type}', 'getWarnTripData')->setName('WARNING - GET TRIP DATA');

/**
 * @api {get} /api/getWarningPath/:map/:trip_id Get Trip Path
 * @apiName WARNING - GET TRIP PATH
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 * @apiParam {String} trip_id Trip id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Array[]} data List of trip path location
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          [22.26312133560225, 114.23867372697602],
 *          [22.2631266, 114.2385086]
 *      ]
 *  }
 *
 * @apiError (400) RequestError_10209 Baidu/ Google Call Fail
 * @apiError (400) InternalError_10207 Sql error
 * @apiUse ErrorResponse
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "message": "Fail",
 *      "data": [
 *          [22.26312133560225, 114.23867372697602],
 *          [22.2631266, 114.2385086]
 *      ]
 *  }
 * @apiUse UnauthorizedError
 */
$app->get('/getWarningPath/{map}/{trip_id}', 'getWarnPath')->setName('WARNING - GET TRIP PATH');

function getWarnFilter (Request $request, Response $response, array $args){
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

	$filter_type = $args['filter_type'];
	$container->logger->info('['.$routename.'] parameters:', array('type'=>$filter_type));

	switch ($filter_type) {
	    case "driver":
	        $sql = "SELECT driver_id AS driverId, name AS name FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY name ASC";

			try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehdtlData = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				if($vehdtlData){
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $vehdtlData);
					return $response->withJson($returnData);
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( driver ): [ErrCode=10202] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10202');
				return $response->withJson($returnData,400);
			}
	        break;
	    case "vehicle":
	        $sql = "SELECT vrm_id AS licenceId, vrm_mark_code AS licence FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY vrm_mark_code ASC";

			try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleData = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				if($vehicleData){
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $vehicleData);
					return $response->withJson($returnData);
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( vehicle ): [ErrCode=10202] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10202');
				return $response->withJson($returnData,400);
			}
	        break;
	    case "driverGrp":
	       $sql = "SELECT drvgrpdtl.driver_id AS id, drv.name AS name, drvgrp.drv_grp_id AS drivergrpId, drvgrp.grp_alias AS groupName FROM driver_group AS drvgrp LEFT JOIN driver_group_dtl AS drvgrpdtl ON drvgrpdtl.drv_grp_id = drvgrp.drv_grp_id LEFT JOIN driver AS drv ON drvgrpdtl.driver_id = drv.driver_id WHERE drvgrp.company_id = :company_id AND drvgrp.ou_id IN ('".$oc_list."') ORDER BY drv.name ASC";

	        try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$drvgrpDataTMP = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				if($drvgrpDataTMP){
					$grpList = [];
					$drvgrpData = [];
					for($i=0;$i<count($drvgrpDataTMP);$i++){
						$index = array_search($drvgrpDataTMP[$i]->drivergrpId,$grpList);
						if($index!==false){
							if($drvgrpDataTMP[$i]->id!==null&&$drvgrpDataTMP[$i]->name!==null){
								array_push($drvgrpData[$index]['driverBelong'], array('id' => $drvgrpDataTMP[$i]->id,'name'=> $drvgrpDataTMP[$i]->name));
							}
						}
						else{
							array_push($grpList,$drvgrpDataTMP[$i]->drivergrpId);
							if($drvgrpDataTMP[$i]->id==null&&$drvgrpDataTMP[$i]->name==null){
								array_push($drvgrpData,array('drivergrpId' => $drvgrpDataTMP[$i]->drivergrpId,'groupName'=> $drvgrpDataTMP[$i]->groupName,'driverBelong'=>[]));
							}
							else{
								array_push($drvgrpData,array('drivergrpId' => $drvgrpDataTMP[$i]->drivergrpId,'groupName'=> $drvgrpDataTMP[$i]->groupName,'driverBelong'=>[array('id' => $drvgrpDataTMP[$i]->id,'name'=> $drvgrpDataTMP[$i]->name)]));
							}
						}
					}
					usort($drvgrpData, function($a, $b) {
  					    return $a['groupName'] <=> $b['groupName'];
 					});
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $drvgrpData);
					return $response->withJson($returnData);
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( drivergrp ): [ErrCode=10202] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10202');
				return $response->withJson($returnData,400);
			}
	        break;
	    case "vehicleGrp":
	        $sql = "SELECT vehgrpdtl.vrm_id AS id, veh.vrm_mark_code AS licence, vehgrp.vrm_grp_id AS vehiclegrpId, vehgrp.grp_alias AS groupName FROM vehicle_group AS vehgrp LEFT JOIN vehicle_group_dtl AS vehgrpdtl ON vehgrpdtl.vrm_grp_id = vehgrp.vrm_grp_id LEFT JOIN vehicle AS veh ON vehgrpdtl.vrm_id = veh.vrm_id WHERE vehgrp.company_id = :company_id AND vehgrp.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code ASC";

	        try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehgrpDataTMP = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				if($vehgrpDataTMP){
					$grpList = [];
					$vehgrpData = [];
					for($i=0;$i<count($vehgrpDataTMP);$i++){
						$index = array_search($vehgrpDataTMP[$i]->vehiclegrpId,$grpList);
						if($index!==false){
							if($vehgrpDataTMP[$i]->id!==null&&$vehgrpDataTMP[$i]->licence!==null){
								array_push($vehgrpData[$index]['vehicleBelong'], array('id' => $vehgrpDataTMP[$i]->id,'licence'=> $vehgrpDataTMP[$i]->licence));
							}
						}
						else{
							array_push($grpList,$vehgrpDataTMP[$i]->vehiclegrpId);
							if($vehgrpDataTMP[$i]->id==null&&$vehgrpDataTMP[$i]->licence==null){
								array_push($vehgrpData,array('vehiclegrpId' => $vehgrpDataTMP[$i]->vehiclegrpId,'groupName'=> $vehgrpDataTMP[$i]->groupName,'vehicleBelong'=>[]));
							}else{
								array_push($vehgrpData,array('vehiclegrpId' => $vehgrpDataTMP[$i]->vehiclegrpId,'groupName'=> $vehgrpDataTMP[$i]->groupName,'vehicleBelong'=>[array('id' => $vehgrpDataTMP[$i]->id,'licence'=> $vehgrpDataTMP[$i]->licence)]));
							}
						}
					}
					usort($vehgrpData, function($a, $b) {
  					    return $a['groupName'] <=> $b['groupName'];
 					});
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $vehgrpData);
					return $response->withJson($returnData);
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( vehiclegrp ): [ErrCode=10202] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10202');
				return $response->withJson($returnData,400);
			}
	        break;
	    default:
	    	$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=10203]');
			$returnData = array('message' => 'Fail','code'=>'10203');
			return $response->withJson($returnData,400);
	}
};

function getWarnTrip (Request $request, Response $response, array $args){
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

	$query = $request->getParsedBody();
	$logparams = $query;
	$filter_type = $args['filter_type'];
	$logparams['type'] = $filter_type;
	$container->logger->info('['.$routename.'] parameters:', $logparams);

	$query_parts = implode("','", $query['arrayData']);
	$timezone = $_SESSION['user']->timezone;

	switch ($filter_type) {
	    case "driver":
		case "driverGrp":
	        $sql = "SELECT trip.veh_trip_id AS trip_id, trip.driver_id AS driver_id, trip.start_time AS startDate, trip.end_time AS endDate, trip.drv_distance AS distancetmp, CAST(trip.drv_duration/1000.0 AS INT) AS durationtmp, drv.name AS drv_name, veh.vrm_mark_code AS licence, vt.veh_type_code AS type, ou.title AS licence_ou, ou2.title AS drv_name_ou FROM veh_trip AS trip LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id LEFT JOIN vehicle AS veh ON trip.vrm_id = veh.vrm_id LEFT JOIN vehicle_type AS vt ON veh.type = vt.veh_type_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id LEFT JOIN org_chart AS ou2 ON drv.ou_id = ou2.ou_id WHERE trip.driver_id IN ( SELECT driver_id FROM driver WHERE driver_id IN ('".$query_parts."') AND company_id = :company_id ) AND trip.acc_date >= :start_time AND trip.acc_date <= :end_time ORDER BY trip.start_time DESC, veh.vrm_mark_code ASC";
	        break;
	    case "vehicle":
	    case "vehicleGrp":
	        $sql = "SELECT trip.veh_trip_id AS trip_id, trip.vrm_id AS vrm_id, trip.start_time AS startDate, trip.end_time AS endDate, trip.drv_distance AS distancetmp, CAST(trip.drv_duration/1000.0 AS INT) AS durationtmp, drv.name AS drv_name, veh.vrm_mark_code AS licence, vt.veh_type_code AS type, ou.title AS licence_ou, ou2.title AS drv_name_ou FROM veh_trip AS trip LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id LEFT JOIN vehicle AS veh ON trip.vrm_id = veh.vrm_id LEFT JOIN vehicle_type AS vt ON veh.type = vt.veh_type_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id LEFT JOIN org_chart AS ou2 ON drv.ou_id = ou2.ou_id WHERE trip.vrm_id IN ( SELECT vrm_id FROM vehicle WHERE vrm_id IN ('".$query_parts."') AND company_id = :company_id ) AND trip.acc_date >= :start_time AND trip.acc_date <= :end_time ORDER BY trip.start_time DESC, veh.vrm_mark_code ASC";
	        break;
	    default:
	    	$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=10205]');
			$returnData = array('message' => 'Fail','code'=>'10205');
			return $response->withJson($returnData,400);
	}

    try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("start_time", $query['start']);
		$stmt->bindParam("end_time", $query['end']);
		$stmt->execute();
		$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($tripData){
			if(isset($query['mileage'])){
				foreach ($tripData as $key => $data) {
					$calcdistance = (float)number_format((float)$data['distancetmp']/100000,1,'.','');
					if($calcdistance<=$query['mileage']){
						unset($tripData[$key]);
					}
				}
				$tripData = array_values($tripData);
			}
			for($i=0;$i<count($tripData);$i++){
				$tripData[$i]['distance'] = number_format((float)$tripData[$i]['distancetmp']/100000,1,'.','');
				unset($tripData[$i]['distancetmp']);
				/*$dttmp = new DateTime($tripData[$i]['startDate'],new DateTimeZone($timezone));
				$startts = $dttmp->format('U');
				$dttmp2 = new DateTime($tripData[$i]['endDate'],new DateTimeZone($timezone));
				$endts = $dttmp2->format('U');
				$tripData[$i]['durationtmp'] = $endts-$startts;*/
				$dt = new DateTime();
				if(preg_match('/-\d+/',$tripData[$i]['durationtmp'])){
					$sec = explode("-", $tripData[$i]['durationtmp']);
					$dt->add(new DateInterval('PT'.$sec[1].'S'));
					$interval = $dt->diff(new DateTime());
					$calint = $interval->format('%a %H:%I');
					$days = explode(" ", $calint);
					if($days[0]=='0'){
						$tripData[$i]['duration'] = '-'.$interval->format('%H:%I');
					}
					else{
						$tripData[$i]['duration'] = '-'.$interval->format('%a %H:%I');
					}
				}else{
					$dt->add(new DateInterval('PT'.$tripData[$i]['durationtmp'].'S'));
					$interval = $dt->diff(new DateTime());
					$calint = $interval->format('%a %H:%I');
					$days = explode(" ", $calint);
					if($days[0]=='0'){
						$tripData[$i]['duration'] = $interval->format('%H:%I');
					}
					else{
						$tripData[$i]['duration'] = $interval->format('%a %H:%I');
					}
				}
				unset($tripData[$i]['durationtmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $tripData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error ('.$filter_type.'): [ErrCode=10204] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10204');
		return $response->withJson($returnData,400);
	}
};

function getWarnTripData (Request $request, Response $response, array $args){
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

	$query = $request->getParsedBody();
	$logparams = $query;
	$filter_type = $args['filter_type'];
	$logparams['type'] = $filter_type;
	$map = $args['map'];
	$logparams['map'] = $map;
	$container->logger->info('['.$routename.'] parameters:', $logparams);

	$timezone = $_SESSION['user']->timezone;
	$wt = implode("','", $setting['data']['wt']);

	switch ($filter_type) {
	    case "driver":
	    case "driverGrp":
	    	$sql = "SELECT trip.lat AS lat, trip.lng AS lng, warn.warn_type_code AS warningType, trip.wt AS wt, trip.wt_grp AS wtGrp, trip.warning_lv AS warningLv, trip.start_time, ROUND(CAST(trip.duration/1000.0 AS FLOAT),2) AS duration, trip.start_spd AS start_spd, trip.end_spd AS end_spd, trip.top_spd AS top_spd, ROUND(CAST(trip.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(trip.near_hw/10.0 AS FLOAT),1) AS near_hw, trip.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady FROM log_data AS trip LEFT JOIN warning_type AS warn ON warn.warn_type_id = trip.wt LEFT JOIN log_data_media AS media ON ( trip.yuwei_alarm_id = media.yuwei_alarm_id AND trip.vrm_id = media.vrm_id AND trip.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id WHERE trip.driver_id = :id AND drv.company_id = :company_id AND trip.start_time >= :start_time AND trip.end_time <= :end_time AND warn.warn_type_code IN ('".$wt."') ORDER BY trip.start_time ASC";
	    	/*$sql = "SELECT trip.lat AS lat, trip.lng AS lng, warn.warn_type_code AS warningType, trip.wt AS wt, trip.wt_grp AS wtGrp, trip.warning_lv AS warningLv, trip.start_time, ROUND(CAST(trip.duration/1000.0 AS FLOAT),2) AS duration, trip.start_spd AS start_spd, trip.end_spd AS end_spd, trip.top_spd AS top_spd, ROUND(CAST(trip.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(trip.near_hw/10.0 AS FLOAT),1) AS near_hw, trip.vehicle_status AS vehStatus, media.log_media_id AS video, media.status AS videoReady FROM log_data AS trip LEFT JOIN warning_type AS warn ON warn.warn_type_id = trip.wt LEFT JOIN log_data_media AS media ON ( trip.yuwei_post_time = media.yuwei_post_time AND trip.vrm_id = media.vrm_id ) LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id WHERE trip.driver_id = :id AND drv.company_id = :company_id AND trip.veh_trip_id = :trip_id AND warn.warn_type_code IN ('".$wt."') ORDER BY trip.start_time ASC";*/

	    	try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("id", $query['id']);
				//$stmt->bindParam("trip_id", $query['trip_id']);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("start_time", $query['start']);
				$stmt->bindParam("end_time", $query['end']);
				$stmt->execute();
				$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;
				if($tripData){
					for($i=0;$i<count($tripData);$i++){
						$dttmp = new DateTime($tripData[$i]['start_time'],new DateTimeZone($timezone));
						$tripData[$i]['start_time_utc'] = $dttmp->format('U');
					}
					$points = array();
					if($map == 'googleMap'){
						foreach( $tripData as $key => $data ) {
							foreach ($data as $key2 => $value) {
								if($value!==null){
									if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='warningType'&&$key2!=='start_time'){
										$tripData[$key][$key2] = (float)$value;
									}
								}
							}
							$tmplng = (float)$data['lng'];
							$tmplat = (float)$data['lat'];
							$tripData[$key]['rawgps'] = array($tmplat,$tmplng);
							array_push($points, array('mark'=>array($tmplat,$tmplng),'warn'=>$data['warningType'],'video'=>$data['video'],'videoReady'=>$data['videoReady'],'time_utc'=>(float)$data['start_time_utc']));
							unset($tripData[$key]['lat']);
							unset($tripData[$key]['lng']);
						}
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success','data' => $tripData, 'dataPoint' => $points);
						return $response->withJson($returnData);
					}
					else{
						$tmptripdata = $tripData;
						foreach( $tripData as $key => $data ) {
							foreach ($data as $key2 => $value) {
								if($value!==null){
									if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='warningType'&&$key2!=='start_time'){
										$tripData[$key][$key2] = (float)$value;
									}
								}
							}
							$tmplng = (float)$data['lng'];
							$tmplat = (float)$data['lat'];
							$tripData[$key]['rawgps'] = array($tmplat,$tmplng);
							unset($tripData[$key]['lat']);
							unset($tripData[$key]['lng']);
						}
						$tmptripdata1 = array_values(array_filter($tmptripdata,function($var) {return (($var['lat'] != null && $var['lng'] != null)&&($var['lat'] != 0 && $var['lng'] != 0));}));
						$tmptripdata2 = array_values(array_filter($tmptripdata,function($var) {return ( $var['lat'] == null || $var['lng'] == null || ($var['lat'] == 0 && $var['lng'] == 0));}));
						$ptarr = [];
						foreach( $tmptripdata1 as $data ) {
							$pt = $data['lng'] . ',' . $data['lat'];
							array_push($ptarr, $pt);
						}
						$tripchunk = array_chunk($ptarr, 100);
						for ($i=0; $i < count($tripchunk); $i++) {
							$tripchunk[$i] = join(';', $tripchunk[$i]);
						}
						$APIkey = $container->get('settings')['api']['baiduKey'];
						$path = $container->get('settings')['api']['baidupath']['geoconv'];
						foreach ( $tripchunk as $key=>$data ) {
							$postData = array(
							    'coords'=>$data,
							    'from'=>1,
							    'to'=>5,
							    'ak'=>$APIkey
							);
							$postData = http_build_query($postData);
							if(($key+1)%50==0){
								sleep(1);
							}
							$ch = curl_init();
							$timeout = 5;
							curl_setopt($ch,CURLOPT_URL,$path);
							curl_setopt($ch, CURLOPT_POST, true);
							curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
							curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
							curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
							curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
							$result = curl_exec($ch);

							if(!curl_errno($ch)){
								$json = json_decode($result,true);
								if($json['status'] == 0){
								 	$pointpath = $json['result'];
								 	foreach ($pointpath as $key2 => $point) {
								 		array_push($points,array('mark'=>array($point['x'],$point['y']),'warn'=>$tmptripdata1[$key*100+$key2]['warningType'],'video'=>$tmptripdata1[$key*100+$key2]['video'],'videoReady'=>$tmptripdata1[$key*100+$key2]['videoReady'],'time_utc'=>(float)$tmptripdata1[$key*100+$key2]['start_time_utc']));
								 	}
								}
								else{
									$errorcurl = true;
									if(isset($json['message'])&&isset($json['status'])){
										$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
									}
									else{
										$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
									}
									break;
								}
							}
							else{
								$errorcurl = true;
								$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
								break;
							}
							curl_close($ch);
						}
						if(!isset($errorcurl)){
							foreach ($tmptripdata2 as $empty) {
								if($empty['lng']!==null){
									$emptytmplng = (float)$empty['lng'];
								}
								if($empty['lat']!==null){
									$emptytmplat = (float)$empty['lat'];
								}
								array_push($points,array('mark'=>array($emptytmplng,$emptytmplat),'warn'=>$empty['warningType'],'video'=>$empty['video'],'videoReady'=>$empty['videoReady'],'time_utc'=>(float)$empty['start_time_utc']));
							}
							usort($points, function($a, $b) {
							    return $a['time_utc'] <=> $b['time_utc'];
							});
							$container->logger->info('['.$routename.'] success.');
							$returnData = array('message' => 'Success','data' => $tripData, 'dataPoint' => $points);
							return $response->withJson($returnData);
						}
						else{
							$container->logger->error('['.$routename.'] call baidu error ( driver ): [ErrCode=10206] '.$error_msg);
							$returnData = array('message' => 'Success','code' => '10206','data' => $tripData, 'dataPoint' => []);
							return $response->withJson($returnData);
						}
					}
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => [], 'dataPoint' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( driver ): [ErrCode=10207] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10207');
				return $response->withJson($returnData,400);
			}
	        break;
	    case "vehicle":
	    case "vehicleGrp":
	    	$sql = "SELECT trip.lat AS lat, trip.lng AS lng, warn.warn_type_code AS warningType, trip.wt AS wt, trip.wt_grp AS wtGrp, trip.warning_lv AS warningLv, trip.start_time, ROUND(CAST(trip.duration/1000.0 AS FLOAT),2) AS duration, trip.start_spd AS start_spd, trip.end_spd AS end_spd, trip.top_spd AS top_spd, ROUND(CAST(trip.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(trip.near_hw/10.0 AS FLOAT),1) AS near_hw, trip.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady FROM log_data AS trip LEFT JOIN warning_type AS warn ON warn.warn_type_id = trip.wt LEFT JOIN log_data_media AS media ON ( trip.yuwei_alarm_id = media.yuwei_alarm_id AND trip.vrm_id = media.vrm_id AND trip.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON trip.vrm_id = veh.vrm_id WHERE trip.vrm_id = :id AND veh.company_id = :company_id AND trip.start_time >= :start_time AND trip.end_time <= :end_time AND warn.warn_type_code IN ('".$wt."') ORDER BY trip.start_time ASC";
	    	/*$sql = "SELECT trip.lat AS lat, trip.lng AS lng, warn.warn_type_code AS warningType, trip.wt AS wt, trip.wt_grp AS wtGrp, trip.warning_lv AS warningLv, trip.start_time, ROUND(CAST(trip.duration/1000.0 AS FLOAT),2) AS duration, trip.start_spd AS start_spd, trip.end_spd AS end_spd, trip.top_spd AS top_spd, ROUND(CAST(trip.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(trip.near_hw/10.0 AS FLOAT),1) AS near_hw, trip.vehicle_status AS vehStatus, media.log_media_id AS video, media.status AS videoReady FROM log_data AS trip LEFT JOIN warning_type AS warn ON warn.warn_type_id = trip.wt LEFT JOIN log_data_media AS media ON ( trip.yuwei_post_time = media.yuwei_post_time AND trip.vrm_id = media.vrm_id ) LEFT JOIN vehicle AS veh ON trip.vrm_id = veh.vrm_id WHERE trip.vrm_id = :id AND veh.company_id = :company_id AND trip.veh_trip_id = :trip_id AND warn.warn_type_code IN ('".$wt."') ORDER BY trip.start_time ASC";*/
	    	try{
				$db = $container->db;
				$stmt = $db->prepare($sql, $prepOpts);
				$stmt->bindParam("id", $query['id']);
				//$stmt->bindParam("trip_id", $query['trip_id']);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("start_time", $query['start']);
				$stmt->bindParam("end_time", $query['end']);
				$stmt->execute();
				$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;
				if($tripData){
					for($i=0;$i<count($tripData);$i++){
						$dttmp = new DateTime($tripData[$i]['start_time'],new DateTimeZone($timezone));
						$tripData[$i]['start_time_utc'] = $dttmp->format('U');
					}
					$points = array();
					if($map == 'googleMap'){
						foreach( $tripData as $key => $data ) {
							foreach ($data as $key2 => $value) {
								if($value!==null){
									if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='warningType'&&$key2!=='start_time'){
										$tripData[$key][$key2] = (float)$value;
									}
								}
							}
							$tmplng = (float)$data['lng'];
							$tmplat = (float)$data['lat'];
							$tripData[$key]['rawgps'] = array($tmplat,$tmplng);
							array_push($points, array('mark'=>array($tmplat,$tmplng),'warn'=>$data['warningType'],'video'=>$data['video'],'videoReady'=>$data['videoReady'],'time_utc'=>(float)$data['start_time_utc']));
							unset($tripData[$key]['lat']);
							unset($tripData[$key]['lng']);
						}
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'success','data' => $tripData, 'dataPoint' => $points);
						return $response->withJson($returnData);
					}
					else{
						$tmptripdata = $tripData;
						foreach( $tripData as $key => $data ) {
							foreach ($data as $key2 => $value) {
								if($value!==null){
									if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='warningType'&&$key2!=='start_time'){
										$tripData[$key][$key2] = (float)$value;
									}
								}
							}
							$tmplng = (float)$data['lng'];
							$tmplat = (float)$data['lat'];
							$tripData[$key]['rawgps'] = array($tmplat,$tmplng);
							unset($tripData[$key]['lat']);
							unset($tripData[$key]['lng']);
						}
						$tmptripdata1 = array_values(array_filter($tmptripdata,function($var) {return (($var['lat'] != null && $var['lng'] != null)&&($var['lat'] != 0 && $var['lng'] != 0));}));
						$tmptripdata2 = array_values(array_filter($tmptripdata,function($var) {return ( $var['lat'] == null || $var['lng'] == null || ($var['lat'] == 0 && $var['lng'] == 0));}));
						$ptarr = [];
						foreach( $tmptripdata1 as $data ) {
							$pt = $data['lng'] . ',' . $data['lat'];
							array_push($ptarr, $pt);
						}
						$tripchunk = array_chunk($ptarr, 100);
						for ($i=0; $i < count($tripchunk); $i++) {
							$tripchunk[$i] = join(';', $tripchunk[$i]);
						}
						$APIkey = $container->get('settings')['api']['baiduKey'];
						$path = $container->get('settings')['api']['baidupath']['geoconv'];
						foreach ( $tripchunk as $key=>$data ) {
							$postData = array(
							    'coords'=>$data,
							    'from'=>1,
							    'to'=>5,
							    'ak'=>$APIkey
							);
							$postData = http_build_query($postData);
							if(($key+1)%50==0){
								sleep(1);
							}
							$ch = curl_init();
							$timeout = 5;
							curl_setopt($ch,CURLOPT_URL,$path);
							curl_setopt($ch, CURLOPT_POST, true);
							curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
							curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
							curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
							curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
							$result = curl_exec($ch);

							if(!curl_errno($ch)){
								$json = json_decode($result,true);
							 	if($json['status'] == 0){
								 	$pointpath = $json['result'];
								 	foreach ($pointpath as $key2 => $point) {
								 		array_push($points,array('mark'=>array($point['x'],$point['y']),'warn'=>$tmptripdata1[$key*100+$key2]['warningType'],'video'=>$tmptripdata1[$key*100+$key2]['video'],'videoReady'=>$tmptripdata1[$key*100+$key2]['videoReady'],'time_utc'=>(float)$tmptripdata1[$key*100+$key2]['start_time_utc']));
								 	}
								}
								else{
									$errorcurl = true;
									if(isset($json['message'])&&isset($json['status'])){
										$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
									}
									else{
										$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
									}
									break;
								}
							}
							else{
								$errorcurl = true;
								$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
								break;
							}
							curl_close($ch);
						}
						if(!isset($errorcurl)){
							foreach ($tmptripdata2 as $empty) {
								if($empty['lng']!==null){
									$emptytmplng = (float)$empty['lng'];
								}
								if($empty['lat']!==null){
									$emptytmplat = (float)$empty['lat'];
								}
								/*$emptytmplng = $empty['lng'];
								$emptytmplat = $empty['lat'];*/
								array_push($points,array('mark'=>array($emptytmplng,$emptytmplat),'warn'=>$empty['warningType'],'video'=>$empty['video'],'videoReady'=>$empty['videoReady'],'time_utc'=>(float)$empty['start_time_utc']));
							}
							usort($points, function($a, $b) {
							    return $a['time_utc'] <=> $b['time_utc'];
							});
							$container->logger->info('['.$routename.'] success.');
							$returnData = array('message' => 'Success','data' => $tripData, 'dataPoint' => $points);
							return $response->withJson($returnData);
						}
						else{
							$container->logger->error('['.$routename.'] call baidu error ( vehicle ): [ErrCode=10206] '.$error_msg);
							$returnData = array('message' => 'Success','code' => '10206','data' => $tripData, 'dataPoint' => []);
							return $response->withJson($returnData);
						}
					}
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => [], 'dataPoint' => []);
					return $response->withJson($returnData);
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( vehicle ): [ErrCode=10207] '.$e);
				$returnData = array('message' => 'Fail', 'code' => '10207');
				return $response->withJson($returnData,400);
			}
	        break;
	    default:
	    	$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=10208]');
			$returnData = array('message' => 'Fail','code'=>'10208');
			return $response->withJson($returnData,400);
	}
};


function getWarnPath (Request $request, Response $response, array $args){
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

	$trip_id = $args['trip_id'];
	$map = $args['map'];
	$container->logger->info('['.$routename.'] parameters:', array('trip_id'=>$trip_id,'map'=>$map));

	$timezone = $_SESSION['user']->timezone;

	$sql = "INSERT INTO trip_access_log (veh_trip_id,username) values (:trip_id,:user)";

	if($map == 'googleMap'){
		$sql2 = "SELECT lat, lng FROM google_snap_gps WHERE veh_trip_id = :trip_id ORDER BY google_snap_gps_id ASC";
	}
	else{
		$sql2 = "SELECT lat, lng FROM baidu_snap_gps WHERE veh_trip_id = :trip_id ORDER BY baidu_gps_id ASC";
	}

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("trip_id", $trip_id);
		$stmt->bindParam("user", $username);
		$stmt->execute();
		$accesslogId = $db->lastInsertId();
		$db = null;

		$db = $container->db;
		$stmt = $db->prepare($sql2, $prepOpts);
		$stmt->bindParam("trip_id", $trip_id);
		$stmt->execute();
		$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		if($tripData){
			$points = array();
			if($map == 'googleMap'){
				foreach( $tripData as $data ) {
					array_push($points, array($data['lat'],$data['lng']));
				}
			}
			else{
				foreach( $tripData as $data ) {
					array_push($points, array($data['lng'],$data['lat']));
				}
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $points);
			return $response->withJson($returnData);
		}
		else{
			if($map == 'googleMap'){
				$sql3 = "SELECT point FROM ( ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND seq_no = ( SELECT MIN(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND time = ( SELECT MIN(time) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) ) UNION ( SELECT pathtmp.point, pathtmp.time, pathtmp.seq_no FROM ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no, ROW_NUMBER() OVER (ORDER BY time ASC, seq_no ASC) AS rownum FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AS pathtmp WHERE pathtmp.rownum % 5 = 0 ) UNION ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND seq_no = ( SELECT MAX(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND time = ( SELECT MAX(time) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) ) ) AS tmp ORDER BY time ASC, seq_no ASC";
				/*$sql2 = "SELECT point FROM ( ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL AND seq_no = ( SELECT MIN(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id ) ) UNION ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL AND seq_no%5 = 0 ) UNION ( SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL AND seq_no = ( SELECT MAX(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id ) ) ) tmp ORDER BY time ASC, seq_no ASC";*/
				/*$sql2 = "(SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND  lat NOT IN (0, NULL) AND lng NOT IN (0, NULL) AND seq_no%5 = 0 ORDER BY seq_no ASC) UNION (SELECT CONVERT(VARCHAR,lat)+','+CONVERT(VARCHAR,lng) AS point FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat NOT IN (0, NULL) AND lng NOT IN (0, NULL) ORDER BY seq_no DESC LIMIT 1)";*/
			}
			else{
				/*$sql2 = "(SELECT CONCAT(lng, ',', lat) AS point FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND COALESCE(lat NOT IN ('0', ''), 0) AND COALESCE(lng NOT IN ('0', ''), 0) AND seq_no%5 = 0 ORDER BY seq_no ASC) UNION (SELECT CONCAT(lng, ',', lat) AS point FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND COALESCE(lat NOT IN ('0', ''), 0) AND COALESCE(lng NOT IN ('0', ''), 0) ORDER BY seq_no DESC LIMIT 1)";*/
				/*$sql2 = "(SELECT lng AS longitude, lat AS latitude, time AS loc_time, 'wgs84' AS coord_type_input FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND COALESCE(lat NOT IN ('0', ''), 0) AND COALESCE(lng NOT IN ('0', ''), 0) AND seq_no%5 = 0 ORDER BY seq_no ASC) UNION (SELECT lng AS longitude, lat AS latitude, time AS loc_time, 'wgs84' AS coord_type_input FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND COALESCE(lat NOT IN ('0', ''), 0) AND COALESCE(lng NOT IN ('0', ''), 0) ORDER BY seq_no DESC LIMIT 1)";*/
				$sql3 = "SELECT lng AS longitude, lat AS latitude, time AS loc_time, 'wgs84' AS coord_type_input FROM ( ( SELECT lng, lat, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND seq_no = ( SELECT MIN(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND time = ( SELECT MIN(time) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) ) UNION ( SELECT pathtmp.lng, pathtmp.lat, pathtmp.time, pathtmp.seq_no FROM ( SELECT lng, lat, time, seq_no, ROW_NUMBER() OVER (ORDER BY time ASC, seq_no ASC) AS rownum FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AS pathtmp WHERE pathtmp.rownum % 5 = 0 ) UNION ( SELECT lng, lat, time, seq_no FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND seq_no = ( SELECT MAX(seq_no) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND time = ( SELECT MAX(time) FROM veh_trip_detail WHERE veh_trip_id = :trip_id AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) AND lat <> 0 AND lat IS NOT NULL AND lng <> 0 AND lng IS NOT NULL ) ) ) AS tmp ORDER BY time ASC, seq_no ASC";
			}
			$db = $container->db;
			$stmt = $db->prepare($sql3, $prepOpts);
			$stmt->bindParam("trip_id", $trip_id);
			$stmt->execute();
			if($map == 'googleMap'){
				$tripData2 = $stmt->fetchAll(PDO::FETCH_COLUMN);
			}
			else{
				$tripData2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
			$db = null;
			if($tripData2){
				$modifyData = [];
				if($map == 'googleMap'){
					$tripchunk = array_chunk($tripData2, 100);
					for ($i=0; $i < count($tripchunk); $i++) {
						$tripchunk[$i] = join('|', $tripchunk[$i]);
					}
					$APIkey = $container->get('settings')['api']['googleKey'];
					$path = $container->get('settings')['api']['googlepath'];
					foreach ( $tripchunk as $key=>$data ) {
						$postData = array(
						    'path'=>$data,
						    'interpolate'=>true,
						    'key'=>$APIkey
						);
						$postData = http_build_query($postData);
						if(($key+1)%50==0){
							sleep(1);
						}
						$ch = curl_init();
						$timeout = 5;
						curl_setopt($ch,CURLOPT_URL,$path);
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
						curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
						curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
						$result = curl_exec($ch);

						if(!curl_errno($ch)){
							$json = json_decode($result,true);
							if(isset($json['snappedPoints'])){
								$pointpath = $json['snappedPoints'];
							 	foreach ($pointpath as $point) {
							 		if(isset($point['originalIndex'])){
							 			$point['originalIndex'] = $point['originalIndex']*15 + $key*1500;
							 		}
							 		array_push($modifyData,array($point['location']['latitude'],$point['location']['longitude']));
							 	}
							}
							else{
								$errorcurl = true;
								if(isset($json['error'])){
									$error_msg = "GOOGLE_RETURN=".'"'.$json['error']['message'].' ['.$json['error']['code']."]".'"';
								}
								else{
									$error_msg = "GOOGLE_RETURN=".'"'.json_encode($json).'"';
								}
								break;
							}
						}else{
							$errorcurl = true;
							$error_msg = "GOOGLE_CURL_ERROR=".'"'.curl_error($ch).'"';
							break;
						}
						curl_close($ch);
					}
					if(!isset($errorcurl)){
						$container->logger->info('['.$routename.'] success with snap to road.');
						$returnData = array('message' => 'Success with snap to road','data' => $modifyData);
						return $response->withJson($returnData);
					}
					else{
						$container->logger->error('['.$routename.'] call google error: [ErrCode=10209] '.$error_msg);
						$modifyData = [];
						foreach ($tripData2 as $point) {
							$pointset = explode(",", $point);
							array_push($modifyData,array($pointset[0],$pointset[1]));
						}
						$container->logger->info('['.$routename.'] success without snap to road.');
						$returnData = array('message' => 'Success without snap to road','data' => $modifyData);
						return $response->withJson($returnData);
					}
				}
				else{
					for ($i=0; $i < count($tripData2); $i++) {
						$dttmp = new DateTime($tripData2[$i]['loc_time'],new DateTimeZone($timezone));
						$tripData2[$i]['loc_time'] = (float)$dttmp->format('U');
						$tripData2[$i]['longitude'] = (float)$tripData2[$i]['longitude'];
						$tripData2[$i]['latitude'] = (float)$tripData2[$i]['latitude'];
					}
					$tripchunk = array_chunk($tripData2, 2000);
					$APIkey = $container->get('settings')['api']['baiduKey'];
					$path = $container->get('settings')['api']['baidupath']['trackrectify'];
					foreach ( $tripchunk as $key=>$data ) {
						$postData = array(
						    'point_list'=>json_encode($data),
						    'rectify_option'=>'need_mapmatch:1|transport_mode:driving|denoise_grade:1|vacuate_grade:0',
						    'supplement_mode'=>'driving',
						    'ak'=>$APIkey
						);
						$postData = http_build_query($postData);
						if(($key+1)%50==0){
							sleep(1);
						}
						$ch = curl_init();
						$timeout = 5;
						curl_setopt($ch,CURLOPT_URL,$path);
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
						curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
						curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
						$result = curl_exec($ch);

						if(!curl_errno($ch)){
							$json = json_decode($result,true);
							if($json['status'] == 0){
							 	$pointpath = $json['points'];
							 	foreach ($pointpath as $point) {
							 		array_push($modifyData,array($point['longitude'],$point['latitude']));
							 	}
							}
							else{
								$errorcurl_track = true;
								if(isset($json['message'])&&isset($json['status'])){
									$error_msg_track = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
								}
								else{
									$error_msg_track = "BAIDU_RETURN=".'"'.json_encode($json).'"';
								}
								break;
							}
						}else{
							$errorcurl_track = true;
							$error_msg_track = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
							break;
						}
						curl_close($ch);
					}
					if(isset($errorcurl_track)){
						$modifyData = [];
						for ($i=0; $i < count($tripData2); $i++) {
							$tripData2[$i] = $tripData2[$i]['longitude'].','.$tripData2[$i]['latitude'];
						}
						$tripchunk = array_chunk($tripData2, 100);
						for ($i=0; $i < count($tripchunk); $i++) {
							$tripchunk[$i] = join(';', $tripchunk[$i]);
						}
						$APIkey = $container->get('settings')['api']['baiduKey'];
						$path = $container->get('settings')['api']['baidupath']['geoconv'];
						foreach ( $tripchunk as $key=>$data ) {
							$postData = array(
							    'coords'=>$data,
							    'from'=>1,
							    'to'=>5,
							    'ak'=>$APIkey
							);
							$postData = http_build_query($postData);
							if(($key+1)%50==0){
								sleep(1);
							}
							$ch = curl_init();
							$timeout = 5;
							curl_setopt($ch,CURLOPT_URL,$path);
							curl_setopt($ch, CURLOPT_POST, true);
							curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
							curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
							curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
							curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
							$result = curl_exec($ch);

							if(!curl_errno($ch)){
								$json = json_decode($result,true);
								if($json['status'] == 0){
								 	$pointpath = $json['result'];
								 	foreach ($pointpath as $point) {
								 		array_push($modifyData,array($point['x'],$point['y']));
								 	}
								}
								else{
									$errorcurl = true;
									if(isset($json['message'])&&isset($json['status'])){
										$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
									}
									else{
										$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
									}
									break;
								}
							}
							else{
								$errorcurl = true;
								$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
								break;
							}
							curl_close($ch);
						}
					}
					if(!isset($errorcurl_track)){
						$container->logger->info('['.$routename.'] success with snap to road.');
						$returnData = array('message' => 'Success with snap to road','data' => $modifyData);
						return $response->withJson($returnData);
					}
					else if(!isset($errorcurl)){
						$container->logger->error('['.$routename.'] call baidu error: [ErrCode=10209] '.$error_msg_track);
						$container->logger->info('['.$routename.'] success without snap to road.');
						$returnData = array('message' => 'Success without snap to road','data' => $modifyData);
						return $response->withJson($returnData);
					}
					else{
						$container->logger->error('['.$routename.'] call baidu error: [ErrCode=10209] '.$error_msg);
						$returnData = array('message' => 'Fail', 'code' => '10209');
						return $response->withJson($returnData,400);
					}
				}
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10207] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10207');
		return $response->withJson($returnData,400);
	}
};