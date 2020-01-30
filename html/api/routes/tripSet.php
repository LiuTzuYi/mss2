<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-28 13:06:17
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/vehtripFilterList Get Trip Filter List
 * @apiName VEHICLE TRIP - GET FILTER LIST
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object} data Filter option lists
 * @apiSuccess {Object[]} data.deptList Department option list
 * @apiSuccess {String} data.deptList.id Department id [ou_id]
 * @apiSuccess {String} data.deptList.name Department name [title]
 * @apiSuccess {Object[]} data.drvList Driver option list
 * @apiSuccess {String} data.drvList.id Driver id [driver_id]
 * @apiSuccess {String} data.drvList.name Driver name [name]
 * @apiSuccess {Object[]} data.vehList Vehicle option list
 * @apiSuccess {String} data.vehList.id Vehicle id [vrm_id]
 * @apiSuccess {String} data.vehList.name Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vehList.ou_id Vehicle department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": {
 *          "deptList": [
 *              {
 *                  "id": "265",
 *                  "name": "8"
 *              }
 *          ],
 *          "drvList": [
 *              {
 *                  "id": "11753",
 *                  "name": "2223 [Root]"
 *              }
 *          ],
 *          "vehList": [
 *              {
 *                  "id": "2337",
 *                  "name": "1001-1800-1138-cfac [Root]",
 *                  "ou_id": "5"
 *              }
 *          ]
 *      }
 *  }
 *
 * @apiError (400) InternalError_11801 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/vehtripFilterList', 'getVehtripFilterList')->setName('VEHICLE TRIP - GET FILTER LIST');

/**
 * @api {post} /api/queryVehTrip Get Trip Data
 * @apiName VEHICLE TRIP - GET TRIP
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} start Start date
 * @apiParam (Request Body) {String} end End date
 * @apiParam (Request Body) {String} drvid Driver id
 * @apiParam (Request Body) {String} vehid Vehicle id
 * @apiParam (Request Body) {String} vehdept Vehicle department
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of trip data
 * @apiSuccess {String} data.driver Driver name [name]
 * @apiSuccess {String} data.drvDepart Driver department [title]
 * @apiSuccess {String} data.drvId Driver id [driver_id]
 * @apiSuccess {String} data.start_time Start time [start_time]
 * @apiSuccess {String} data.end_time End time [end_time]
 * @apiSuccess {String} data.tripId Trip id [veh_trip_id]
 * @apiSuccess {String} data.vehicle Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vehDepart Vehicle department [title]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "driver": "28",
 *              "drvDepart": "Root",
 *              "drvId": "12193",
 *              "end_time": "2019-03-22 08:32:55",
 *              "start_time": "2019-03-22 08:10:53",
 *              "tripId": 2859915,
 *              "updated_by": "2019-03-22 12:47:32 (zilvia)",
 *              "vehDepart": "lv1 u4",
 *              "vehicle": "GS-Tester-A-0762",
 *              "version": "3"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11802 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/queryVehTrip', 'queryVehTrip')->setName('VEHICLE TRIP - GET TRIP');

/**
 * @api {patch} /api/tripDrvUpdate Update Trip Driver
 * @apiName VEHICLE TRIP - UPDATE DRIVER
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driverId Device SN
 * @apiParam (Request Body) {Number} tripId Vehicle id
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess SuccessResponse:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10803 No record affected
 * @apiError (400) UpdateFailure_10804 MySql error (duplicate key)
 * @apiError (400) InternalError_10805 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->patch('/tripDrvUpdate', 'tripDrvUpdate')->setName('VEHICLE TRIP - UPDATE DRIVER');

/**
 * @api {post} /api/tripDrvImport Import Trip Driver
 * @apiName VEHICLE TRIP - IMPORT DRIVER
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String[]} tripDrv List of trip driver data (Trip ID, Driver Code)
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": 1
 *  }
 *
 * @apiError (400) ImportFailure_11806 Some record not updated
 * @apiError (400) ImportFailure_11807 Some driver not exist
 * @apiError (400) ImportFailure_11808 No driver exist in company or department
 * @apiError (400) InternalError_10809 MySql error
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Unauthorized",
 *      "code": 1xxxx,
 *      "data": [1, 3, 4]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/tripDrvImport', 'tripDrvImport')->setName('VEHICLE TRIP - IMPORT DRIVER');

function getVehtripFilterList (Request $request, Response $response, array $args){
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

	$sql = "SELECT veh.vrm_id AS id, ISNULL(veh.vrm_mark_code,'')+' ['+ISNULL(ou.title,'')+']' AS name, veh.ou_id AS ou_id FROM vehicle AS veh LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code ASC";

	$sql2 = "SELECT drv.driver_id AS id, ISNULL(drv.name,'')+' ['+ISNULL(ou.title,'')+']' AS name FROM driver AS drv LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') ORDER BY drv.name ASC";

	$sql3 = "SELECT ou_id AS id, title AS name FROM org_chart WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY title ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListVeh = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql2, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListDrv = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql3, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListDept = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$dataList = array();
		if($dataListVeh){
			$dataList['vehList'] = $dataListVeh;
		}
		else{
			$dataList['vehList'] = array();
		}
		if($dataListDrv){
			$dataList['drvList'] = $dataListDrv;
		}
		else{
			$dataList['drvList'] = array();
		}
		if($dataListDept){
			$dataList['deptList'] = $dataListDept;
		}
		else{
			$dataList['deptList'] = array();
		}
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => $dataList);
		return $response->withJson($returnData);
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11801] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11801');
		return $response->withJson($returnData,400);
	}
}

function queryVehTrip (Request $request, Response $response, array $args){
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
	$container->logger->info('['.$routename.'] parameters:', $query);

	$timezone = $_SESSION['user']->timezone;

	$sql = "SELECT trip.veh_trip_id AS tripId, case trip.update_user when 'System' then CONVERT(VARCHAR,ISNULL(veh.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(trip.update_ts,''),120)+' ('+ISNULL(trip.update_user,'')+')' end AS updated_by, trip.start_time AS start_time, trip.end_time AS end_time, trip.version AS version, trip.driver_id AS drvId, drv.driver_code AS driverCode, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepart, ouveh.title AS vehDepart, trip.drv_distance AS distancetmp, ROUND(CAST(CAST(CAST(trip.drv_distance/100.0 AS FLOAT)/NULLIF(trip.drv_duration,0) AS FLOAT)/3.6 AS FLOAT),1) AS avgspeed FROM veh_trip AS trip LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id LEFT JOIN vehicle AS veh ON trip.vrm_id = veh.vrm_id LEFT JOIN org_chart AS oudrv ON drv.ou_id = oudrv.ou_id LEFT JOIN org_chart AS ouveh ON veh.ou_id = ouveh.ou_id WHERE ( trip.driver_id IN ( SELECT driver_id FROM driver WHERE company_id = :company_id ) OR trip.driver_id IS NULL ) AND trip.vrm_id IN ( SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ) AND trip.acc_date >= :start_time AND trip.acc_date <= :end_time";

	if($query['drvid']!=="NA"){
		if($query['drvid']){
			$sql .= " AND trip.driver_id = " . $query['drvid'];
		}
		else{
			$sql .= " AND trip.driver_id IS NULL";
		}
	}

	if($query['vehdept']!=="NA"){
		$sql .= " AND veh.ou_id = " . $query['vehdept'];
	}

	if($query['vehid']!=="NA"){
		$sql .= " AND trip.vrm_id = " . $query['vehid'];
	}

	$sql .= " ORDER BY trip.veh_trip_id ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("start_time", $query['start']);
		$stmt->bindParam("end_time", $query['end']);
		$stmt->execute();
		$tripList = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($tripList){
			for ($i=0;$i<count($tripList);$i++) {
				$tripList[$i]['tripId'] = (float)$tripList[$i]['tripId'];
				$tripList[$i]['distance'] = number_format((float)$tripList[$i]['distancetmp']/100000,1,'.','');
				unset($tripList[$i]['distancetmp']);
				/*$dttmp = new DateTime($tripList[$i]['start_time'],new DateTimeZone($timezone));
				$startts = $dttmp->format('U');
				$dttmp2 = new DateTime($tripList[$i]['end_time'],new DateTimeZone($timezone));
				$endts = $dttmp2->format('U');
				$tripList[$i]['durationtmp'] = $endts-$startts;
				if(preg_match('/-\d+/',$tripList[$i]['durationtmp'])){
					$sec = explode("-", $tripList[$i]['durationtmp']);
				}
				else{
					$sec = $tripList[$i]['durationtmp'];
				}*/
				//$tripList[$i]['avgspeed'] = number_format((((float)$tripList[$i]['distance']*1000)/$sec)/1000*3600,1,'.','');
				//unset($tripList[$i]['durationtmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $tripList);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11802] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11802');
		return $response->withJson($returnData,400);
	}
}

function tripDrvUpdate (Request $request, Response $response, array $args){
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

	$update = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $update);

	$sql = "SELECT vrm_id, start_time, end_time FROM veh_trip WHERE veh_trip_id = :trip_id";

	if($update['driverId']){
		$driverId = $update['driverId'];
	}
	else{
		$driverId = 'null';
	}

	$sql1 = "UPDATE veh_trip SET driver_id = ".$driverId.", update_ts = :update_ts, update_user = :update_user, version = :version+1 WHERE veh_trip_id = :trip_id AND version = :version AND ( ".$driverId." IN (  SELECT driver_id FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ) OR ".$driverId." IS NULL )";

	$sql2 = "UPDATE log_data SET driver_id = ".$driverId.", update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE vrm_id = :vrm_id AND start_time >= :start_time AND end_time <= :end_time AND ( ".$driverId." IN (  SELECT driver_id FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ) OR ".$driverId." IS NULL )";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("trip_id", $update['tripId']);
		$stmt->execute();
		$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		$db = $container->db;
		$db->beginTransaction();
		$t=date("Y-m-d H:i:s");

		$stmt = $db->prepare($sql1, $prepOpts);
		$stmt->bindParam("trip_id", $update['tripId']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $update['version']);
		$stmt->execute();
		$count = $stmt->rowCount();

		if($count==1){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_id", $tripData[0]['vrm_id']);
			$stmt->bindParam("start_time", $tripData[0]['start_time']);
			$stmt->bindParam("end_time", $tripData[0]['end_time']);
			$stmt->bindParam("company_id", $company_id);
			$stmt->bindParam("update_user", $username);
			$stmt->bindParam("update_ts", $t);
			$result = $stmt->execute();
			if($result){
				$db->commit();
				$db = null;
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11803]');
				$returnData = array('message' => 'Fail','code'=>'11803');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$db->rollback();
			$db = null;
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11803]');
			$returnData = array('message' => 'Fail','code'=>'11803');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11804] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11804');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11805] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11805');
			return $response->withJson($returnData,400);
    	}
	}
}

function tripDrvImport (Request $request, Response $response, array $args){
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

	$import = $request->getParsedBody();
	$container->logger->info($routename.': parameters.', $import);

	$sql = "SELECT veh_trip_id, vrm_id, start_time, end_time FROM veh_trip";

	$sql1 = "SELECT driver_id, driver_code FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY driver_id ASC";

	$sql2 = "UPDATE veh_trip SET driver_id = :drv_id, update_ts = :update_ts, update_user = :update_user WHERE veh_trip_id = :trip_id AND vrm_id IN (SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."'))";

	$sql3 = "UPDATE log_data SET driver_id = :drv_id, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE vrm_id = :vrm_id AND start_time >= :start_time AND end_time <= :end_time";

	try{
		$tripIds = array();
	 	foreach( $import['tripDrv'] as $key => $data ) {
			$row = str_getcsv($data);
			array_push($tripIds,$row[0]);
		}
		$tripIdsData = implode("','", $tripIds);
		$sql .= " WHERE veh_trip_id IN ('".$tripIdsData."')";
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$tripData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		$error = array();
		$errorTrip = array();
		$importArr = array();
		$t=date("Y-m-d H:i:s");
		$db = $container->db;
		$stmt = $db->prepare($sql1, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$drvInComp = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($drvInComp){
			foreach( $import['tripDrv'] as $key => $data ) {
				$row = str_getcsv($data);
				if(($idx = array_search($row[1], array_column($drvInComp, 'driver_code')))=== FALSE){
					array_push($error, $key+1);
				}
				else if(($tripidx = array_search($row[0], array_column($tripData, 'veh_trip_id')))=== FALSE){
					array_push($errorTrip, $key+1);
				}
				else{
					array_push($importArr,array($row[0],$row[1],$drvInComp[$idx]['driver_id'],$tripData[$tripidx]['vrm_id'],$tripData[$tripidx]['start_time'],$tripData[$tripidx]['end_time']));
				}
			}
			if(count($errorTrip)===0&&count($error)===0){
				$db = $container->db;
				$db->beginTransaction();
				$totalUpdated = 0;
				foreach( $importArr as $key => $data ) {
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->bindParam("update_user", $username);
					$stmt->bindParam("update_ts", $t);
					$stmt->bindParam("trip_id", $data[0]);
					$stmt->bindParam("drv_id", $data[2]);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$count = $stmt->rowCount();
					if($count!=1){
						array_push($error, $key+1);
					}
					else{
						$stmt = $db->prepare($sql3, $prepOpts);
						$stmt->bindParam("update_user", $username);
						$stmt->bindParam("update_ts", $t);
						$stmt->bindParam("drv_id", $data[2]);
						$stmt->bindParam("vrm_id", $data[3]);
						$stmt->bindParam("start_time", $data[4]);
						$stmt->bindParam("end_time", $data[5]);
						$result = $stmt->execute();
						if($result){
							$totalUpdated++;
						}
						else{
							array_push($error, $key+1);
						}
					}
				}
				if(count($error)===0){
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] Success.');
					$returnData = array('message' => 'Success','data'=>$totalUpdated);
					return $response->withJson($returnData);
				}
				else{
					$db->rollback();
					$db = null;
					$error = __consecutiveArray($error);
					$container->logger->info('['.$routename.'] some record not updated. [ErrCode=11806]');
					$returnData = array('message' => 'Fail','code'=>'11806','data'=>$error);
					return $response->withJson($returnData);
				}
			}
			else if(count($errorTrip)>0){
				$error = __consecutiveArray($error);
				$container->logger->info('['.$routename.'] some trip not exist in company or department. [ErrCode=11810]');
				$returnData = array('message' => 'Fail','code'=>'11810','data'=>$errorTrip);
				return $response->withJson($returnData);
			}
			else{
				$error = __consecutiveArray($error);
				$container->logger->info('['.$routename.'] some driver not exist in company or department. [ErrCode=11807]');
				$returnData = array('message' => 'Fail','code'=>'11807','data'=>$error);
				return $response->withJson($returnData);
			}
		}
		else{
			$container->logger->info('['.$routename.'] no driver exist in company or department. [ErrCode=11808');
			$returnData = array('message' => 'Fail','code'=>'11808');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11809] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11809');
		return $response->withJson($returnData,400);
	}
}

