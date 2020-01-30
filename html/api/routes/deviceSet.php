<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-11 17:01:02
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/deviceSet', function() {
/**
 * @api {get} /api/deviceSet Get Device Data List
 * @apiName DEVICE - GET DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 2.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of devices
 * @apiSuccess {String} data.deviceSn Device SN [md_sn]
 * @apiSuccess {String} data.lastLocUpdate Last GPS update timestamp [last_loc_update_ts]
 * @apiSuccess {Object} data.licence Binded vehicle data
 * @apiSuccess {String} data.licence.licence Licence plate [vrm_mark_code]
 * @apiSuccess {String} data.licence.vrm_id Vehicle id [vrm_id]
 * @apiSuccess {Number} data.lat Latitude [lat]
 * @apiSuccess {Number} data.lng Longitude [lng]
 * @apiSuccess {String} data.status Device status [status]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "deviceSn": "1000-2000-0000-8a01",
 *              "lastLocUpdate": "2017-04-10 14:24:33",
 *              "licence": {
 *                  "licence": "EX196",
 *                  "vrm_id": "28"
 *              },
 *              "lat": 22.3327952,
 *              "lng": 114.2129047,
 *              "status": "I",
 *              "updated_by": "2018-01-12 13:27:42 (ben)",
 *              "version": "2"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10302 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getDevice')->setName('DEVICE - GET DEVICE');
/**
 * @api {post} /api/deviceSet Add Device
 * @apiName DEVICE - ADD DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 * @apiParam (Request Body) {String} vrm_id Vehicle id
 * @apiParam (Request Body) {String="A","I"} status Device status
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10303 No record affected
 * @apiError (400) InternalError_10304 MySql error
 * @apiError (400) UpdateFailure_10309 MySql error (duplicate key)
 * @apiError (400) UpdateFailure_10310 Binded vehicle
 * @apiError (400) UpdateFailure_10311 Vehicle not exist
 * @apiError (400) InternalError_10317 Add API error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->post('', 'addDevice')->setName('DEVICE - ADD DEVICE');
/**
 * @api {patch} /api/deviceSet Edit Device
 * @apiName DEVICE - EDIT DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 * @apiParam (Request Body) {String} vrm_id Vehicle id
 * @apiParam (Request Body) {String="A","I"} status Device status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10305 No record affected
 * @apiError (400) InternalError_10306 MySql error
 * @apiError (400) UpdateFailure_10312 Invalid SN
 * @apiError (400) UpdateFailure_10313 No record affected
 * @apiError (400) UpdateFailure_10314 Vehicle binded
 * @apiError (400) UpdateFailure_10315 Vehicle not exist
 * @apiError (400) InternalError_10316 Delete API error
 * @apiError (400) InternalError_10318 Add API error
 * @apiError (400) UpdateFailure_10319 No record affected
 * @apiError (400) UpdateFailure_10320 No record affected
 * @apiError (400) InternalError_10321 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editDevice')->setName('DEVICE - EDIT DEVICE');
/**
 * @api {delete} /api/deviceSet Delete Device
 * @apiName DEVICE - DELETE DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10307 No record affected
 * @apiError (400) InternalError_10308 MySql error
 * @apiError (400) UpdateFailure_10322 Invalid SN
 * @apiError (400) InternalError_10323 Delete API error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteDevice')->setName('DEVICE - DELETE DEVICE');
});

/**
 * @api {get} /api/licenceAddL Get Licence Plate List (Device Dialog)
 * @apiName DEVICE - GET LICENCE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of vehicles
 * @apiSuccess {String} data.licence Licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vrm_id Vehicle id [vrm_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "licence": "1001-1800-1138-cfac",
 *              "vrm_id": "2337"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10301 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/licenceAddL', 'getLicenceAddL')->setName('DEVICE - GET LICENCE');

function getDevice (Request $request, Response $response, array $args){
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

	$sql = "SELECT device.yuwei_sn AS deviceSn, device.status AS status, veh.vrm_mark_code AS licencetmp, device.vrm_id AS vrmidtmp, device.lat AS lat, device.lng AS lng, device.last_loc_update_ts AS lastLocUpdate, device.version AS version, case device.update_user when 'System' then CONVERT(VARCHAR,device.update_ts,120)+' (SYSTEM)' else CONVERT(VARCHAR,device.update_ts,120)+' ('+device.update_user+')' end AS updated_by FROM mob_device AS device LEFT JOIN vehicle AS veh ON device.vrm_id = veh.vrm_id WHERE device.company_id = :company_id ORDER BY device.yuwei_sn";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$deviceData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($deviceData){
			for($i=0;$i<count($deviceData);$i++){
				$deviceData[$i]['licence'] = array('licence' => $deviceData[$i]['licencetmp'], 'vrm_id' => $deviceData[$i]['vrmidtmp']);
				if($deviceData[$i]['lat']!==null){
					$deviceData[$i]['lat'] = (float)$deviceData[$i]['lat'];
				}
				if($deviceData[$i]['lng']!==null){
					$deviceData[$i]['lng'] = (float)$deviceData[$i]['lng'];
				}
				unset($deviceData[$i]['licencetmp']);
				unset($deviceData[$i]['vrmidtmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $deviceData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10302] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10302');
		return $response->withJson($returnData,400);
	}
};

function addDevice (Request $request, Response $response, array $args){
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

	$device = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $device);

	$ts=date("Y-m-d H:i:s");
	$ver="0";

	$sql = "SELECT * FROM mob_device WHERE yuwei_sn = :yuwei_sn AND company_id = 0";
	$sql1 = "SELECT * FROM mob_device WHERE vrm_id = :vrm_id";
	$sql2 = "SELECT * FROM vehicle WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql3 = "UPDATE vehicle SET yuwei_vehicle_id = :yuwei_vehicle_id, update_user = :update_user, update_ts = :update_ts, version = version+1 WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql4 = "UPDATE mob_device SET vrm_id = :vrm_id, company_id = :company_id, status = :status, lat = NULL, lng = NULL, last_loc_update_ts = NULL, update_user = :update_user, update_ts = :update_ts, version = :version WHERE yuwei_sn = :yuwei_sn AND company_id = 0";

	try{
		//check SN
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("yuwei_sn", $device['md_sn']);
		$stmt->execute();
		$deviceData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		$db = $container->db;
		$stmt = $db->prepare($sql1, $prepOpts);
		$stmt->bindParam("vrm_id", $device['vrm_id']);
		$stmt->execute();
		$bindDevice = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$deviceData){
			//invalidSN
			$container->logger->warning('['.$routename.'] SN is invalid. [ErrCode=10309]');
			$returnData = array('message' => 'Fail', 'code' => '10309');
			return $response->withJson($returnData,400);
		}
		else if($bindDevice){
			$container->logger->warning('['.$routename.'] vehicle bind with device already. [ErrCode=10310]');
			$returnData = array('message' => 'Fail', 'code' => '10310');
			return $response->withJson($returnData,400);
		}
		else{
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_id", $device['vrm_id']);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$vehicleData = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;

			if(!$vehicleData){
				//internal error
				$container->logger->warning('['.$routename.'] vehicle not exist. [ErrCode=10311]');
				$returnData = array('message' => 'Fail', 'code' => '10311');
				return $response->withJson($returnData,400);
			}
			else{
				$licencePlate = $vehicleData->vrm_mark_code;
				//call API: need modification - add
				//licencePlate: $licencePlate
				//write the yuwei vehicle id to $yuwei_vehicle_id

				$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['addDevice'];
				$postData = $setting['api']['yuweiParam']['addDevice'];
				$token = $setting['api']['yuweiToken'];
				$postData["token"] = $token;
				$postData["vehicleNo"] = $company_id.'-'.$licencePlate;
				$postData["termNo"] = '1'.$device['md_sn'];
				$postData["code"] = '1'.$device['md_sn'];
				//$postData["termNo"] = $device['md_sn'];
				//$postData["code"] = $device['md_sn'];
				$postData = http_build_query($postData);
				//$container->logger->info('['.$routename.'] $postData='.$postData);

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
					$responseData = json_decode($result,true);
					if(isset($responseData) && isset($responseData["code"]) && isset($responseData["content"]) && ($responseData["code"]==0 || __startWith($responseData["code"], "2"))){
						/*return {
							"code": 0,
							"content": "新增的车辆id为：100663434"
						}*/
						$yuwei_vehicle_id = explode("：",$responseData["content"])[1];
					}
					else{
						$errorcurl = true;
						$error_msg = "ADD_DEVICE_CURL_ERROR=".'"'.$result.'"';
					}
				}
				else{
					$errorcurl = true;
					$error_msg = "ADD_DEVICE_CURL_ERROR=".'"'.curl_error($ch).'"';
				}

				curl_close($ch);

				if(isset($errorcurl) && !isset($yuwei_vehicle_id)){
					$container->logger->error('['.$routename.'] call server error: [ErrCode=10317] ADD_DEVICE_CURL_PATH='.$path);
					$container->logger->error('['.$routename.'] call server error: [ErrCode=10317] '.$error_msg);
					$returnData = array('message' => 'Fail','code' => '10317');
					return $response->withJson($returnData,400);
				}
				else{
					$db = $container->db;
					$db->beginTransaction();
					$stmt = $db->prepare($sql3, $prepOpts);
					$stmt->bindParam("yuwei_vehicle_id", $yuwei_vehicle_id);
					$stmt->bindParam("update_user", $username);
					$stmt->bindParam("update_ts", $ts);
					$stmt->bindParam('vrm_id', $device['vrm_id']);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$count = $stmt->rowCount();
					$stmt = $db->prepare($sql4, $prepOpts);
					$stmt->bindParam("vrm_id", $device['vrm_id']);
					$stmt->bindParam("company_id", $company_id);
					$stmt->bindParam("status", $device['status']);
					$stmt->bindParam("yuwei_sn", $device['md_sn']);
					$stmt->bindParam("update_user", $username);
					$stmt->bindParam("update_ts", $ts);
					$stmt->bindParam("version", $ver);
					$stmt->execute();
					$count2 = $stmt->rowCount();
					if($count===1 && $count2===1){
						$db->commit();
						$db = null;
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success');
						return $response->withJson($returnData);
					}
					else{
						$db->rollback();
						$db = null;
						$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10303]');
						$returnData = array('message' => 'Fail', 'code' => '10303');
						return $response->withJson($returnData,400);
					}
				}
			}
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10304] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10304');
		return $response->withJson($returnData,400);
	}
};

function editDevice (Request $request, Response $response, array $args){
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

	$device = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $device);

	$ts=date("Y-m-d H:i:s");
	$ver="0";

	$sql = "SELECT mob_device.*, vehicle.vrm_mark_code AS vrm_mark_code FROM mob_device LEFT JOIN vehicle ON mob_device.vrm_id = vehicle.vrm_id WHERE mob_device.yuwei_sn = :yuwei_sn AND mob_device.company_id = :company_id";
	$sql1 = "UPDATE mob_device SET status = :status, update_user = :update_user, update_ts = :update_ts, version = :version+1 WHERE yuwei_sn = :yuwei_sn AND company_id = :company_id AND version = :version";
	$sql2 = "SELECT * FROM mob_device WHERE vrm_id = :vrm_id";
	$sql3 = "SELECT * FROM vehicle WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql4 = "UPDATE vehicle SET yuwei_vehicle_id = NULL, update_user = :update_user, update_ts = :update_ts, version = version+1 WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql5 = "UPDATE mob_device SET vrm_id = NULL, company_id = 0, update_user = :update_user, update_ts = :update_ts, version = 0 WHERE yuwei_sn = :yuwei_sn AND company_id = :company_id";
	$sql6 = "UPDATE vehicle SET yuwei_vehicle_id = :yuwei_vehicle_id, update_user = :update_user, update_ts = :update_ts, version = version+1 WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql7 = "UPDATE mob_device SET vrm_id = :vrm_id, company_id = :company_id, status = :status, lat = NULL, lng = NULL, last_loc_update_ts = NULL, update_user = :update_user, update_ts = :update_ts, version = :version WHERE yuwei_sn = :yuwei_sn AND company_id = 0";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("yuwei_sn", $device['md_sn']);
		$stmt->bindParam("company_id",$company_id);
		$stmt->execute();
		$deviceData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$deviceData){
			$container->logger->warning('['.$routename.'] SN is invalid. [ErrCode=10312]');
			$returnData = array('message' => 'Fail', 'code' => '10312');
			return $response->withJson($returnData,400);
		}
		//check if the vehicle changes
		else if($deviceData->vrm_id==$device['vrm_id']){
			$db = $container->db;
			$stmt = $db->prepare($sql1, $prepOpts);
			$stmt->bindParam("yuwei_sn", $device['md_sn']);
			$stmt->bindParam("status", $device['status']);
			$stmt->bindParam("company_id",$company_id);
			$stmt->bindParam("update_user", $username);
			$stmt->bindParam("update_ts", $ts);
			$stmt->bindParam("version", $device['version']);
			$stmt->execute();
			$count = $stmt->rowCount();
			$db = null;
			if($count===1){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10313]');
				$returnData = array('message' => 'Fail', 'code' => '10313');
				return $response->withJson($returnData,400);
			}
		}
		else{
			//check bind device
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_id", $device['vrm_id']);
			$stmt->execute();
			$bindDevice = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;

			if($bindDevice){
				$container->logger->warning('['.$routename.'] vehicle bind with device already. [ErrCode=10314]');
				$returnData = array('message' => 'Fail', 'code' => '10314');
				return $response->withJson($returnData,400);
			}
			else{
				$db = $container->db;
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->bindParam("vrm_id", $device['vrm_id']);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleData = $stmt->fetch(PDO::FETCH_OBJ);
				$db = null;

				if(!$vehicleData){
					//internal error
					$container->logger->warning('['.$routename.'] vehicle not exist. [ErrCode=10315]');
					$returnData = array('message' => 'Fail', 'code' => '10315');
					return $response->withJson($returnData,400);
				}
				else{
					//delete old vehicle
					$oldLicencePlate = $deviceData->vrm_mark_code;

					$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['deleteDevice'];
					$postData = $container->get('settings')['api']['yuweiParam']['deleteDevice'];
					$token = $container->get('settings')['api']['yuweiToken'];
					$postData["token"] = $token;
					$postData["vehicleNo"] = $company_id.'-'.$oldLicencePlate;
					$postData = http_build_query($postData);

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
						$responseData = json_decode($result,true);
						if(!$responseData || !isset($responseData["code"]) || ($responseData["code"]!=0 && !__startWith($responseData["code"], "2"))){
							$errorcurl = true;
							$error_msg = "DELETE_DEVICE_CURL_ERROR=".'"'.$result.'"';
						}
					}
					else{
						$errorcurl = true;
						$error_msg = "DELETE_DEVICE_CURL_ERROR=".'"'.curl_error($ch).'"';
					}
					curl_close($ch);

					if(isset($errorcurl)){
						$container->logger->error('['.$routename.'] call server error: [ErrCode=10316] DELETE_DEVICE_CURL_PATH='.$path);
						$container->logger->error('['.$routename.'] call server error: [ErrCode=10316] '.$error_msg);
						$returnData = array('message' => 'Fail','code' => '10316');
						return $response->withJson($returnData,400);
					}
					else{
						//when success, set yuwei_vehicle_id NULL, set sn to pool
						$db = $container->db;
						$db->beginTransaction();
						$stmt = $db->prepare($sql4, $prepOpts);
						$stmt->bindParam("vrm_id", $deviceData->vrm_id);
						$stmt->bindParam("company_id", $company_id);
						$stmt->bindParam("update_user", $username);
						$stmt->bindParam("update_ts", $ts);
						$stmt->execute();
						$count = $stmt->rowCount();
						$stmt = $db->prepare($sql5, $prepOpts);
						$stmt->bindParam("company_id", $company_id);
						$stmt->bindParam("yuwei_sn", $device['md_sn']);
						$stmt->bindParam("update_user", $username);
						$stmt->bindParam("update_ts", $ts);
						$stmt->execute();
						$count2 = $stmt->rowCount();
						if($count===1 && $count2===1){
							$db->commit();
							$db = null;

							$licencePlate = $vehicleData->vrm_mark_code;
							//add
							$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['addDevice'];
							$postData = $setting['api']['yuweiParam']['addDevice'];
							$token = $setting['api']['yuweiToken'];
							$postData["token"] = $token;
							$postData["vehicleNo"] = $company_id.'-'.$licencePlate;
							$postData["termNo"] = '1'.$device['md_sn'];
							$postData["code"] = '1'.$device['md_sn'];
							//$postData["termNo"] = $device['md_sn'];
							//$postData["code"] = $device['md_sn'];
							$postData = http_build_query($postData);
							//$container->logger->info('['.$routename.'] $postData='.$postData);

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
								$responseData = json_decode($result,true);
								if($responseData && isset($responseData["code"]) && isset($responseData["content"]) && ($responseData["code"]==0 || __startWith($responseData["code"], "2"))){
									/*return {
										"code": 0,
										"content": "新增的车辆id为：100663434"
									}*/
									$yuwei_vehicle_id = explode("：",$responseData["content"])[1];
								}
								else{
									$errorcurl = true;
									$error_msg = "ADD_DEVICE_CURL_ERROR=".'"'.$result.'"';
								}
							}
							else{
								$errorcurl = true;
								$error_msg = "ADD_DEVICE_CURL_ERROR=".'"'.curl_error($ch).'"';
							}

							curl_close($ch);

							if(isset($errorcurl) && !isset($yuwei_vehicle_id)){
								$container->logger->error('['.$routename.'] call server error: [ErrCode=10318] ADD_DEVICE_CURL_PATH='.$path);
								$container->logger->error('['.$routename.'] call server error: [ErrCode=10318] '.$error_msg);
								$returnData = array('message' => 'Fail','code' => '10318');
								return $response->withJson($returnData,400);
							}
							else{
								$db = $container->db;
								$db->beginTransaction();
								$stmt = $db->prepare($sql6, $prepOpts);
								$stmt->bindParam("yuwei_vehicle_id", $yuwei_vehicle_id);
								$stmt->bindParam("update_user", $username);
								$stmt->bindParam("update_ts", $ts);
								$stmt->bindParam('vrm_id', $device['vrm_id']);
								$stmt->bindParam("company_id", $company_id);
								$stmt->execute();
								$count = $stmt->rowCount();
								$stmt = $db->prepare($sql7, $prepOpts);
								$stmt->bindParam("vrm_id", $device['vrm_id']);
								$stmt->bindParam("company_id", $company_id);
								$stmt->bindParam("status", $device['status']);
								$stmt->bindParam("yuwei_sn", $device['md_sn']);
								$stmt->bindParam("update_user", $username);
								$stmt->bindParam("update_ts", $ts);
								$stmt->bindParam("version", $ver);
								$stmt->execute();
								$count2 = $stmt->rowCount();
								if($count===1 && $count2===1){
									$db->commit();
									$db = null;
									$container->logger->info('['.$routename.'] success.');
									$returnData = array('message' => 'Success');
									return $response->withJson($returnData);
								}
								else{
									$db->rollback();
									$db = null;
									$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10319]');
									$returnData = array('message' => 'Fail', 'code' => '10319');
									return $response->withJson($returnData,400);
								}
							}
						}
						else{
							$db->rollback();
							$db = null;
							$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10320]');
							$returnData = array('message' => 'Fail', 'code' => '10320');
							return $response->withJson($returnData,400);
						}
					}
				}
			}
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=10321] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10321');
		return $response->withJson($returnData,400);
	}
};

function deleteDevice (Request $request, Response $response, array $args){
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

	$device = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $device);

	$ts=date("Y-m-d H:i:s");

	$sql = "SELECT mob_device.*, vehicle.vrm_mark_code AS vrm_mark_code FROM mob_device LEFT JOIN vehicle ON mob_device.vrm_id = vehicle.vrm_id WHERE mob_device.yuwei_sn = :yuwei_sn AND mob_device.company_id = :company_id";
	$sql1 = "UPDATE vehicle SET yuwei_vehicle_id = NULL, run_distance_his = run_distance, run_distance = 0, update_user = :update_user, update_ts = :update_ts, version = version+1 WHERE vrm_id = :vrm_id AND company_id = :company_id";
	$sql2 = "UPDATE mob_device SET vrm_id = NULL, company_id = 0, update_user = :update_user, update_ts = :update_ts, version = 0 WHERE yuwei_sn = :yuwei_sn AND company_id = :company_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("yuwei_sn", $device['md_sn']);
		$stmt->bindParam("company_id",$company_id);
		$stmt->execute();
		$deviceData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$deviceData){
			$container->logger->warning('['.$routename.'] SN is invalid. [ErrCode=10322]');
			$returnData = array('message' => 'Fail', 'code' => '10322');
			return $response->withJson($returnData,400);
		}
		else{
			$licencePlate = $deviceData->vrm_mark_code;

			$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['deleteDevice'];
			$postData = $container->get('settings')['api']['yuweiParam']['deleteDevice'];
			$token = $container->get('settings')['api']['yuweiToken'];
			$postData["token"] = $token;
			$postData["vehicleNo"] = $company_id.'-'.$licencePlate;
			$postData = http_build_query($postData);

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
				$responseData = json_decode($result,true);
				if(!$responseData || !isset($responseData["code"]) || ($responseData["code"]!=0 && !__startWith($responseData["code"], "2"))){
					$errorcurl = true;
					$error_msg = "DELETE_DEVICE_CURL_ERROR=".'"'.$result.'"';
				}
			}
			else{
				$errorcurl = true;
				$error_msg = "DELETE_DEVICE_CURL_ERROR=".'"'.curl_error($ch).'"';
			}
			curl_close($ch);

			if(isset($errorcurl)){
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10323] DELETE_DEVICE_CURL_PATH='.$path);
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10323] '.$error_msg);
				$returnData = array('message' => 'Fail','code' => '10323');
				return $response->withJson($returnData,400);
			}
			else{
				//when success, set yuwei_vehicle_id NULL, set sn to pool
				$db = $container->db;
				$db->beginTransaction();
				$stmt = $db->prepare($sql1, $prepOpts);
				$stmt->bindParam("vrm_id", $deviceData->vrm_id);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("update_user", $username);
				$stmt->bindParam("update_ts", $ts);
				$stmt->execute();
				$count = $stmt->rowCount();
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("yuwei_sn", $device['md_sn']);
				$stmt->bindParam("update_user", $username);
				$stmt->bindParam("update_ts", $ts);
				$stmt->execute();
				$count2 = $stmt->rowCount();
				if($count===1 && $count2===1){
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success');
					return $response->withJson($returnData);
				}
				else{
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10307]');
					$returnData = array('message' => 'Fail', 'code' => '10307');
					return $response->withJson($returnData,400);
				}
			}
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10308] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10308');
		return $response->withJson($returnData,400);
	}
};

function getLicenceAddL (Request $request, Response $response, array $args){
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

	$sql = "SELECT vrm_mark_code AS licence, vrm_id AS vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY vrm_mark_code ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$licenceData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($licenceData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $licenceData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10301] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10301');
		return $response->withJson($returnData,400);
	}
};