<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-11 15:38:36
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/driverSet', function() {
/**
 * @api {get} /api/driverSet Get Driver Data List
 * @apiName DRIVER - GET DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of drivers
 * @apiSuccess {String} data.defaultdrv Default driver [is_default]
 * @apiSuccess {Number} data.driverId Driver id [driver_id]
 * @apiSuccess {String} data.driverCode Driver code [driver_code]
 * @apiSuccess {Object[]} data.department Department data
 * @apiSuccess {String} data.department.department Department name [title]
 * @apiSuccess {String} data.department.id Department id [ou_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.dobirth Date of birth [dob]
 * @apiSuccess {String} data.phoneHome Home tel. number [phone_home]
 * @apiSuccess {String} data.phoneMobile Mobile phone number [phone_mobile]
 * @apiSuccess {String} data.phoneOffice Office tel. number [phone_office]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccess {Object[]} departments List of departments
 * @apiSuccess {String} departments.department Department name [title]
 * @apiSuccess {String} departments.id Department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "defaultdrv": "N",
 *              "department": {
 *                  "department": "Root",
 *                  "id": "5"
 *              },
 *              "dobirth": "1983-10-01",
 *              "driverCode": "90123",
 *              "driverId": 1
 *              "name": "Chan Tai Man",
 *              "phoneHome": "21234567",
 *              "phoneMobile": "91234567",
 *              "phoneOffice": null,
 *              "staffId": "1D0049E425",
 *              "updated_by": "2016-09-27 03:29:20 (SYSTEM)",
 *              "version": "0"
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department": "8",
 *              "id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10502 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getDriver')->setName('DRIVER - GET DRIVER');
/**
 * @api {post} /api/driverSet Add Driver
 * @apiName DRIVER - ADD DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_code Driver code
 * @apiParam (Request Body) {String} name Driver name
 * @apiParam (Request Body) {String} dob Date of birth
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {String} phone_home Home tel. number
 * @apiParam (Request Body) {String} phone_office Office tel. number
 * @apiParam (Request Body) {String} phone_mobile Mobile phone number
 * @apiParam (Request Body) {Blob} photo Driver avatar
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10523 Driver already exist
 * @apiError (400) InternalError_10524 Call API error (add)
 * @apiError (400) UpdateFailure_10503 No record affected
 * @apiError (400) InternalError_10504 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->post('', 'addDriver')->setName('DRIVER - ADD DRIVER');
/**
 * @api {patch} /api/driverSet Edit Driver
 * @apiName DRIVER - EDIT DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_id Driver id
 * @apiParam (Request Body) {String} driver_code Driver code
 * @apiParam (Request Body) {String} name Driver name
 * @apiParam (Request Body) {String} dob Date of birth
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {String} phone_home Home tel. number
 * @apiParam (Request Body) {String} phone_office Office tel. number
 * @apiParam (Request Body) {String} phone_mobile Mobile phone number
 * @apiParam (Request Body) {Blob} photo Driver avatar
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10505 No record affected
 * @apiError (400) InternalError_10506 MySql error
 * @apiError (400) UpdateFailure_10517 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editDriver')->setName('DRIVER - EDIT DRIVER');
/**
 * @api {delete} /api/driverSet Delete Driver
 * @apiName DRIVER - DELETE DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_id Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10507 No record affected
 * @apiError (400) UpdateFailure_10508 Linked records exist
 * @apiError (400) InternalError_10509 MySql error
 * @apiError (400) InternalError_10525 Call API error (delete)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteDriver')->setName('DRIVER - DELETE DRIVER');
});

/**
 * @api {get} /api/drvAvatar/:driver_id Get Driver Avatar
 * @apiName DRIVER - GET AVATAR
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam {String} driver_id Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Blob} data Driver avatar
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtQAAAJZCAYAAAC"
 *  }
 *
 * @apiError (400) InternalError_10501 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/drvAvatar/{driver_id}', 'getDrvAvatar')->setName('DRIVER - GET AVATAR');

/**
 * @api {post} /api/driverImport Import Driver
 * @apiName DRIVER - IMPORT DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": 5
 *  }
 *
 * @apiError (400) ImportFailure_10510 Wrong input pattern
 * @apiError (400) ImportFailure_10511 Upload file error
 * @apiError (400) ImportFailure_10512 No record affected
 * @apiError (400) ImportFailure_10513 Read CSV fail
 * @apiError (400) ImportFailure_10514 MySql error
 * @apiError (400) ImportFailure_10515 MySql error (duplicate key)
 * @apiError (400) ImportFailure_10518 Empty CSV file
 * @apiError (400) ImportFailure_10519 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10520 Department not exist
 * @apiError (400) ImportFailure_10521 Driver already exist
 * @apiError (400) ImportFailure_10522 No record affected in Yuwei DB
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/driverImport', 'importDriver')->setName('DRIVER - IMPORT DRIVER');

function getDriver (Request $request, Response $response, array $args){
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

	$sql = "SELECT drv.driver_id AS driverId, drv.name AS name, drv.driver_code AS driverCode, drv.phone_home AS phoneHome, drv.phone_mobile AS phoneMobile, drv.phone_office AS phoneOffice, drv.dob AS dobirth, drv.version AS version, drv.ou_id AS departmentidtmp, org.title AS departmenttmp, case drv.update_user when 'System' then CONVERT(VARCHAR,ISNULL(drv.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(drv.update_ts,''),120)+' ('+ISNULL(drv.update_user,'')+')' end AS updated_by FROM driver AS drv LEFT JOIN org_chart AS org ON drv.ou_id = org.ou_id WHERE drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') ORDER BY drv.driver_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$driverData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($driverData){
			foreach ($driverData as $key => $data) {
				$driverData[$key]['department'] = array('department' => $driverData[$key]['departmenttmp'], 'id' => $driverData[$key]['departmentidtmp']);
				foreach ($data as $key2 => $value) {
					if($value!==null){
						if($key2=='driverId'){
							$driverData[$key][$key2] = (float)$value;
						}
					}
				}
				unset($driverData[$key]['departmentidtmp']);
				unset($driverData[$key]['departmenttmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $driverData,'departments' => $_SESSION['user']->departments);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'departments' => $_SESSION['user']->departments);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10502] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10502');
		return $response->withJson($returnData,400);
	}

};

function addDriver (Request $request, Response $response, array $args){
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

	$driver = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $driver);

	$t=date("Y-m-d H:i:s");
	$a="0";

	$sql = "SELECT * FROM driver WHERE driver_code = :driver_code AND company_id = :company_id";
	$sql2 = "INSERT INTO driver (company_id, ou_id, yuwei_driver_id, driver_code, name, dob, phone_home, phone_office, phone_mobile, photo, create_ts, create_user, update_ts, update_user, version) VALUES (:company_id, :ou_id, :yuwei_driver_id, :driver_code, :name, :dob, :phone_home, :phone_office, :phone_mobile, :photo, :create_ts, :create_user, :update_ts, :update_user, :version)";

	try{
		//check existence
		$db = $container->db;
		$stmt = $db->prepare($sql);
		$stmt->bindParam("driver_code", $driver["driver_code"]);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$driverData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		if($driverData){
			$container->logger->warning('['.$routename.'] driver already exist. [ErrCode=10523]');
			$returnData = array('message' => 'Fail', 'code' => '10523');
			return $response->withJson($returnData,400);
		}
		else{
			//call api add driver
			$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['addDriver'];
			$postData = $container->get('settings')['api']['yuweiParam']['addDriver'];
			$token = $container->get('settings')['api']['yuweiToken'];
			$driverCode = $company_id."-".$driver["driver_code"];

			$postData["token"] = $token;
			$postData["driverCode"] = $driverCode;
			$postData["driverWorkNumber"] = $driver["driver_code"];
			$postData["driverName"] = $driverCode;
			$postData["driverLicence"] = $driverCode;
			$postData["identityCard"] = $driverCode;
			$container->logger->info('['.$routename.'] postData: ', $postData);
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
				/*return {
					"code": 0,
					"content": "新增的司乘人员id为：620757030"
				}*/
				if($responseData && isset($responseData["code"]) && isset($responseData["content"]) && ($responseData["code"]==0 || __startWith($responseData["code"], "2"))){
					$yuwei_driver_id = explode("：",$responseData["content"])[1];
					$container->logger->error('['.$routename.'] '.$yuwei_driver_id);
				}
				else{
					$errorcurl = true;
					$error_msg = "ROSTER_CURL_ERROR=".'"'.$result.'"';
				}
			}
			else{
				$errorcurl = true;
				$error_msg = "ROSTER_CURL_ERROR=".'"'.curl_error($ch).'"';
			}
			curl_close($ch);

			if(isset($errorcurl) && !isset($yuwei_driver_id)){
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10524] ADD_DEVICE_CURL_PATH='.$path);
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10524] '.$error_msg);
				$returnData = array('message' => 'Fail','code' => '10524');
				return $response->withJson($returnData,400);
			}
			else{
				/*if($driver['photo']!==null){
					list($tmp, $photosrc) = explode('base64,', $driver['photo']);
					$avatar = $driver['photo'];
				}
				else{
					$avatar = null;
				}*/

				$db = $container->db;
				$stmt = $db->prepare($sql2);
				$stmt->bindParam("photo", $driver['photo']);
				$stmt->bindParam("yuwei_driver_id", $yuwei_driver_id);
				$stmt->bindParam("driver_code", $driver['driver_code']);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("name", $driver['name']);
				$stmt->bindParam("dob", $driver['dob']);
				$stmt->bindParam("phone_home", $driver['phone_home']);
				$stmt->bindParam("phone_office", $driver['phone_office']);
				$stmt->bindParam("phone_mobile", $driver['phone_mobile']);
				$stmt->bindParam("update_user", $_SESSION['user']->username);
				$stmt->bindParam("update_ts", $t);
				$stmt->bindParam("create_user", $_SESSION['user']->username);
				$stmt->bindParam("create_ts", $t);
				$stmt->bindParam("version", $a);
				$stmt->bindParam("ou_id", $driver['ou_id']);
				$stmt->execute();
				$driver['driver_id'] = $db->lastInsertId();
				$db = null;
				if($driver['driver_id']){
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success');
					return $response->withJson($returnData);
				}
				else{
					$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10503]');
					$returnData = array('message' => 'Fail', 'code' => '10503');
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
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10504] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10504');
		return $response->withJson($returnData,400);
	}
};

function editDriver (Request $request, Response $response, array $args){
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

	$driver = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $driver);

	$sql = "UPDATE driver SET driver_code = :driver_code, name = :name, dob = :dob, phone_home = :phone_home, phone_office = :phone_office, phone_mobile = :phone_mobile, photo = :photo, update_ts = :update_ts, update_user = :update_user, version = :version+1, ou_id = :ou_id WHERE driver_id = :driver_id AND version = :version AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		/*if($driver['photo']!==null){
			list($tmp, $photosrc) = explode('base64,', $driver['photo']);
			$avatar = $photosrc;
		}
		else{
			$avatar = null;
		}*/
		$stmt->bindParam("photo", $driver['photo']);
		$stmt->bindParam("driver_id", $driver['driver_id']);
		$stmt->bindParam("company_id", $_SESSION['user']->company_id);
		$stmt->bindParam("driver_code", $driver['driver_code']);
		$stmt->bindParam("name", $driver['name']);
		$stmt->bindParam("dob", $driver['dob']);
		$stmt->bindParam("phone_home", $driver['phone_home']);
		$stmt->bindParam("phone_office", $driver['phone_office']);
		$stmt->bindParam("phone_mobile", $driver['phone_mobile']);
		$stmt->bindParam("update_user", $_SESSION['user']->username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $driver['version']);
		$stmt->bindParam("ou_id", $driver['ou_id']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;

		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10505]');
			$returnData = array('message' => 'Fail','code'=>'10505');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10517] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10517');
			return $response->withJson($returnData,400);
    	}
    	else{
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10506] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10506');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteDriver (Request $request, Response $response, array $args){
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

	$driver = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $driver);

	$sql = "SELECT driver_id FROM driver_group_dtl WHERE driver_id = :driver_id UNION ALL SELECT driver_id FROM log_data WHERE driver_id = :driver_id UNION ALL SELECT driver_id FROM veh_trip WHERE driver_id = :driver_id UNION ALL SELECT driver_id FROM avg_warning_drv WHERE driver_id = :driver_id UNION ALL SELECT driver_id FROM warning_rank_drv WHERE driver_id = :driver_id";

	$sql2 = "DELETE FROM driver WHERE driver_id = :driver_id AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("driver_id", $driver['driver_id']);
		$stmt->execute();
		$driverData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if(!$driverData){
			//call api delete driver
			$path = $setting['api']['yuweipath']['host'].$setting['api']['yuweipath']['deleteDriver'];
			$postData = $container->get('settings')['api']['yuweiParam']['deleteDriver'];
			$token = $container->get('settings')['api']['yuweiToken'];
			$driverCode = $company_id."-".$driver["driver_code"];

			$postData["token"] = $token;
			$postData["driverCode"] = $driverCode;
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
				/*return {
					"code": 0,
					"content": "delete success"
				}*/
				if(!$responseData || !isset($responseData["code"]) || ($responseData["code"]!=0 && !__startWith($responseData["code"], "2"))){
					$errorcurl = true;
					$error_msg = "DELETE_DRIVER_CURL_ERROR=".'"'.$result.'"';
				}
			}
			else{
				$errorcurl = true;
				$error_msg = "DELETE_DRIVER_CURL_ERROR=".'"'.curl_error($ch).'"';
			}
			curl_close($ch);

			if(isset($errorcurl)){
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10525] ROSTER_CURL_PATH='.$path);
				$container->logger->error('['.$routename.'] call server error: [ErrCode=10525] '.$error_msg);
				$returnData = array('message' => 'Fail','code' => '10525');
				return $response->withJson($returnData,400);
			}
			else{
				$db = $container->db;
				$stmt = $db->prepare($sql2);
				$stmt->bindParam("driver_id", $driver['driver_id']);
				$stmt->bindParam("company_id", $_SESSION['user']->company_id);
				$stmt->execute();
				$count = $stmt->rowCount();
				$db = null;
				if($count==1){
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success');
					return $response->withJson($returnData);
				}
				else{
					$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10507]');
					$returnData = array('message' => 'Fail', 'code' => '10507');
					return $response->withJson($returnData,400);
				}
			}
		}else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=10508]');
			$returnData = array('message' => 'Fail', 'code' => '10508');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10509] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10509');
		return $response->withJson($returnData,400);
	}
};

function getDrvAvatar (Request $request, Response $response, array $args){
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

    $driver_id = $args['driver_id'];
    $container->logger->info('['.$routename.'] parameters:', array('driver_id'=>$driver_id));

    $sql = "SELECT photo FROM driver WHERE company_id = :company_id AND driver_id = :driver_id AND ou_id IN ('".$oc_list."')";

    try{
    	$db = $container->db;
		$stmt = $db->prepare($sql);
		$stmt->bindParam("driver_id", $driver_id);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindColumn(1, $photo);
		$stmt->execute();
		$stmt->fetch(PDO::FETCH_BOUND);
		if($photo){
			/*$finfo = new finfo(FILEINFO_MIME_TYPE);
			$finfo->buffer($photo);*/
			//$avatar = "data:".$finfo->buffer($photo).";base64,".base64_encode($photo);
			/*$avatar = $photo;*/
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $photo);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => null);
			return $response->withJson($returnData);
		}
    }
    catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10501] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10501');
		return $response->withJson($returnData,400);
	}
}

function importDriver (Request $request, Response $response, array $args){
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

	$uploadedFiles = $request->getUploadedFiles();
	$uploadedFile = $uploadedFiles['file'];

	$t=date("Y-m-d H:i:s");
	$a="0";

	$sql = "SELECT ou_id, title FROM org_chart WHERE ou_id IN ('".$oc_list."') AND company_id = ".$company_id;
	$sql2 = "SELECT driver_code FROM driver WHERE company_id = :company_id";
	$sql3 = "INSERT INTO mainserver.dbo.tb_driver_infos (driverCode, driver_work_number, driverName, driverLicence, identityCard, JobCard, f1, f2, f3, f4, f5, f6, f7, f8, companyNo, sex,password, licenseAgency, DriverRFID, service_level, reserve, el_type, mobile_phone_verify, blacklist_flag) VALUES (:ydriverCode, :driverCode, :driverName, :ydriverCode, :ydriverCode, :ydriverCode, -1, -1, -1, -1, -1, -1, -1, -1, '117440513','男','0', 'GST', '', NULL, NULL, NULL, NULL, NULL)";

	try{
		if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
			$container->logger->info('['.$routename.'] uploaded: '.$uploadedFile->getClientFilename());
			$filesize = filesize($_FILES["file"]["tmp_name"]);
			if($filesize > 0) {
				if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {

					//get department list
					$db = $container->db;
					$stmt = $db->prepare($sql);
					$stmt->execute();
					$ou_title_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					//get existing driver code
					$db = $container->db;
					$stmt = $db->prepare($sql2);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$driver_list_db = $stmt->fetchAll(PDO::FETCH_COLUMN);
					$db = null;

					$error = array();
					$dep_not_exist_error = array();
					$driver_exist_error = array();
					$driver_exist_drvcode = array();
					$api_error = array();
					$query_parts = array();
					$yuwei_error = array();
					$row = 1;

					$db = $container->db;
					$db->beginTransaction();
					while (($data = __fgetcsv($handle)) !== FALSE) {
						/**
						 * 8 fields
						* Name, driver code, staff card id (optional),  phone home (optional), phone mobile (optional), phone office (optional), date of birth (optional), department
						*/
						if($row==1){
							$empty = FALSE;
							$encode = TRUE;
							if(!empty($data[0])){
								if(isset($data[0][0])&&isset($data[0][1])&&isset($data[0][2])&&preg_match("/^\xEF\xBB\xBF$/",$data[0][0].$data[0][1].$data[0][2])){
									if($filesize > 3){
										$data[0] = str_replace("\xEF\xBB\xBF",'',$data[0]);
									}
									else{
										$empty = TRUE;
										break;
									}
								}
								else{
									if(!preg_match("/^[\x20-\x7F]$/",$data[0][0])){
										$encode = FALSE;
										break;
									}
								}
							}
						}
						$num = count($data);
						$match = true;
						$exist_dept = true;
						$exist_driver = false;
						if($num!=7){
							$match = false;
						}
						else{
							$rowData = $data;
							foreach ($rowData as $key => $value) {
								if(empty($rowData[$key])){
									$rowData[$key] = NULL;
								}
								else{
									$rowData[$key] = trim($rowData[$key]);
								}
							}
							if(!preg_match("/^.{1,45}$/",$rowData[0])){
								$match = false;
							}
							if(!preg_match("/^.{1,20}$/",$rowData[1]) || !preg_match("/^([0-9|A-Z|a-z|\-]+||[0-9|A-Z|a-z|\-]+\_\d+)$/",$rowData[1])){
								$match = false;
							}
							if(in_array($rowData[1], $driver_list_db)){
								$exist_driver = true;
							}
							if(!preg_match("/^.{0,15}$/",$rowData[2])){
								$match = false;
							}
							if(!preg_match("/^.{0,15}$/",$rowData[3])){
								$match = false;
							}
							if(!preg_match("/^.{0,15}$/",$rowData[4])){
								$match = false;
							}
							if($rowData[5]&&!preg_match("/^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/",$rowData[5])){
								$match = false;
							}
							if(!preg_match("/^.{1,20}$/",$rowData[6])){
								$match = false;
							}
							if(!in_array($rowData[6], array_column($ou_title_db, "title"))){
								$exist_dept=false;
							}
							else{
								$ou_index = array_search($rowData[6], array_column($ou_title_db, "title"));
							}
						}

						if($match && $exist_dept && !$exist_driver){

							$driverCode = $company_id."-".$rowData[1];

							$stmt = $db->prepare($sql3, $prepOpts);
							$stmt->bindParam("ydriverCode", $driverCode);
							$stmt->bindParam("driverCode", $rowData[1]);
							$stmt->bindParam("driverName", $rowData[0]);
							$stmt->execute();
							$count = $stmt->rowCount();

							if($count!=0){
								$yuwei_driver_id = $db->lastInsertId();
								$tmp = "(";
								foreach ($rowData as $key => $value) {
									if($key == 6){
										continue;
									}
									if(!empty($rowData[$key])){
										$tmp .= "'".$rowData[$key]."', ";
									}
									else{
										$tmp .= "null, ";
									}
								}
								$comp = $_SESSION['user']->company_id;
								$user = $_SESSION['user']->username;
								$ou = "'".$ou_title_db[$ou_index]["ou_id"]."'";
								$yu = "'".$yuwei_driver_id."'";
								$tmp .= "'". $comp . "', '" . $user . "', '" . $t . "', '" . $user . "', '" . $t . "', '" . $a . "', " . $ou . "," . $yu . ")";
								array_push($query_parts, $tmp);
							}else{
								array_push($yuwei_error, $row);
							}
						}
						else{
							if(!$exist_dept){
								array_push($dep_not_exist_error, $row);
							}
							if($exist_driver){
								array_push($driver_exist_error, $row);
								$drv_code = $rowData[1];
								if(preg_match("/.*\_\d+/", $rowData[1])){
									$trim = explode("_",$rowData[1]);
									$drv_code = explode("_".$trim[count($trim)-1],$rowData[1])[0];
								}
								$drv_version = preg_grep("/^(".$drv_code."||".$drv_code."\_\d+)$/", $driver_list_db);
								usort($drv_version, function($a,$b) {
									return explode("_", $b) <=> explode("_", $a);
								});
								$existed_drv_code = $drv_version[0];
								array_push($driver_exist_drvcode, $row.": ".$existed_drv_code);
							}
							if(!$match){
								array_push($error, $row);
							}
						}
						$row++;
					}

					if($empty==TRUE){
						$db->rollback();
						$db = null;
						$container->logger->warning('['.$routename.'] empty file. [ErrCode=10518]');
						$returnData = array('message' => 'Fail', 'code' => '10518');
						return $response->withJson($returnData,400);
					}
					else if($encode==FALSE){
						$db->rollback();
						$db = null;
						$container->logger->warning('['.$routename.'] not ansi or utf-8. [ErrCode=10519]');
						$returnData = array('message' => 'Fail', 'code' => '10519');
						return $response->withJson($returnData,400);
					}
					else if(count($error)!=0){
						$db->rollback();
						$db = null;
						$error = __consecutiveArray($error);
						$container->logger->warning('['.$routename.'] wrong pattern. [ErrCode=10510]');
						$returnData = array('message' => 'Fail', 'code' => '10510', 'data' => $error);
						return $response->withJson($returnData,400);
					}
					else if(count($yuwei_error)!=0){
						$db->rollback();
						$db = null;
						$yuwei_error = __consecutiveArray($yuwei_error);
						$container->logger->warning('['.$routename.'] nothing added to yuwei db. [ErrCode=10522]');
						$returnData = array('message' => 'Fail', 'code' => '10522', 'data' => $yuwei_error);
						return $response->withJson($returnData,400);
					}
					else if(count($driver_exist_error)!=0){
						$db->rollback();
						$db = null;
						$driver_exist_error = __consecutiveArray($driver_exist_error);
						$driver_exist_drvcode = __consecutiveArray($driver_exist_drvcode);
						$container->logger->warning('['.$routename.'] driver already exist. [ErrCode=10521]');
						$returnData = array('message' => 'Fail', 'code' => '10521', 'data' => $driver_exist_error, 'drv_code' => $driver_exist_drvcode);
						return $response->withJson($returnData,400);
					}
					else if(count($dep_not_exist_error)!=0){
						$db->rollback();
						$db = null;
						$dep_not_exist_error = __consecutiveArray($dep_not_exist_error);
						$container->logger->warning('['.$routename.'] department not exist. [ErrCode=10520]');
						$returnData = array('message' => 'Fail', 'code' => '10520', 'data' => $dep_not_exist_error);
						return $response->withJson($returnData,400);
					}
					else{
						//execute sql
						$sql = "INSERT INTO driver (name, driver_code, phone_home, phone_mobile, phone_office, dob, company_id, update_user, update_ts, create_user, create_ts, version, ou_id, yuwei_driver_id) VALUES ".implode(',', $query_parts);

						$stmt = $db->prepare($sql);
						$stmt->execute();
						$count = $stmt->rowCount();

						if($count!=0){
							$db->commit();
							$db = null;
							$container->logger->info('['.$routename.'] success.');
							$returnData = array('message' => 'Success','data' => $count);
							return $response->withJson($returnData);
						}else{
							$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10512]');
							$returnData = array('message' => 'Fail', 'code' => '10512');
							return $response->withJson($returnData,400);
						}
					}
					fclose($handle);
				}
				else{
					$container->logger->warning('['.$routename.'] read csv fail. [ErrCode=10513]');
					$returnData = array('message' => 'Fail', 'code' => '10513');
					return $response->withJson($returnData,400);
				}
			}else{
				$container->logger->warning('['.$routename.'] empty file. [ErrCode=10518]');
				$returnData = array('message' => 'Fail', 'code' => '10518');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] upload file error: [ErrCode=10511] '.$uploadedFile->getError());
			$returnData = array('message' => 'Fail', 'code' => '10511');
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
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10515] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10515');
			return $response->withJson($returnData,400);
		}
		else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10514] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10514');
			return $response->withJson($returnData,400);
		}
	}
}