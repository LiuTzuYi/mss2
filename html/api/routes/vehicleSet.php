<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-25 16:36:33
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/vehicleSet', function() {
/**
 * @api {get} /vehicleSet Get Vehicle
 * @apiName VEHICLE - GET VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle list
 * @apiSuccess {Object} data.department Department Information
 * @apiSuccess {String} data.department.department Department name
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.licence Vehicle licence
 * @apiSuccess {String} data.vehicleId Vehicle ID
 * @apiSuccess {String} data.status Vehicle status
 * @apiSuccess {String} data.updated_by Last update timestamp
 * @apiSuccess {Object} data.vehicle Vehicle object
 * @apiSuccess {String} data.vehicle.vehicle Vehicle name
 * @apiSuccess {String} data.vehicle.vehicle_id Vehicle ID
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "vehicleId":10,
 *              "status":"A",
 *              "version":"0",
 *              "licence":"RA8326",
 *              "updated_by":"2016-09-07 17:14:46 (SYSTEM)",
 *              "vehicle":
 *                  {
 *                      "vehicle":null,
 *                      "vehicle_id":null
 *                  },
 *              "department":
 *                  {
 *                      "department":"Root",
 *                      "id":"5"
 *                  }
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
 * @apiError (400) InternalError_10802 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/
	$this->get('', 'getVehicle')->setName('VEHICLE - GET VEHICLE');
/**
 * @api {post} /vehicleSet Add Vehicle
 * @apiName VEHICLE - ADD VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_mark_code Vehicle mark code
 * @apiParam (Request body) {String} status Vehicle status
 * @apiParam (Request body) {String} vehicle_id Vehicle ID
 * @apiParam (Request body) {String} ou_id Department ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10803 Fail (no row affected)
 * @apiError (400) InternalError_10804 SQL error
 * @apiError (400) UpdateFailure_10810 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->post('', 'addVehicle')->setName('VEHICLE - ADD VEHICLE');
/**
 * @api {patch} /vehicleSet Edit Vehicle
 * @apiName VEHICLE - EDIT VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_id Vehicle ID
 * @apiParam (Request body) {String} vrm_mark_code Vehicle mark code
 * @apiParam (Request body) {String} status Vehicle status
 * @apiParam (Request body) {String} vehicle_id Vehicle ID
 * @apiParam (Request body) {String} version Version
 * @apiParam (Request body) {String} ou_id Department ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10805 Fail (no row affected)
 * @apiError (400) InternalError_10806 SQL error
 * @apiError (400) UpdateFailure_10811 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->patch('', 'editVehicle')->setName('VEHICLE - EDIT VEHICLE');
/**
 * @api {delete} /vehicleSet Delete Vehicle
 * @apiName VEHICLE - DELETE VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_id Vehicle ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10807 Fail (no row affected)
 * @apiError (400) UpdateFailure_10808 Fail (has linked record)
 * @apiError (400) InternalError_10809 SQL error
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteVehicle')->setName('VEHICLE - DELETE VEHICLE');
});

/**
 * @api {get} /vehicleAddL Get Vehicle Type Detail
 * @apiName VEHICLE - GET VEHICLE DTL
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle list
 * @apiSuccess {String} data.id Vehicle type ID
 * @apiSuccess {String} data.veh_type Vehicle type name
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "id": "80",
 *              "veh_type": "CAR"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10801 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/vehicleAddL', 'getVehicleAddL')->setName('VEHICLE - GET VEHICLE DTL');

/**
 * @api {post} /vehicleImport Import Vehicle Detail
 * @apiName VEHICLE - IMPORT VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam {File} - File stream
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
 * @apiError (400) ImportFailure_10812 Empty CSV file
 * @apiError (400) ImportFailure_10813 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10814 Wrong pattern
 * @apiError (400) ImportFailure_10815 Department not exist
 * @apiError (400) ImportFailure_10816 Vehicle type not exist
 * @apiError (400) InternalError_10817 Nothing added
 * @apiError (400) ImportFailure_10818 Duplicate key
 * @apiError (400) InternalError_10819 SQL error
 * @apiError (400) ImportFailure_10820 Read CSV fail
 * @apiError (400) ImportFailure_10821 Upload file error
 * @apiError (400) ImportFailure_10822 Licence already exist
 * @apiError (400) ImportFailure_10823 VIN already exist
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
$app->post('/vehicleImport', 'importVehicle')->setName('VEHICLE - IMPORT VEHICLE');

function importVehicle (Request $request, Response $response, array $args){
	//get container
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

	//get uploaded file
	$uploadedFiles = $request->getUploadedFiles();
	$uploadedFile = $uploadedFiles['file'];

	try{
		if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
			//file uploaded successfully
			$container->logger->info('['.$routename.'] uploaded: '.$uploadedFile->getClientFilename());
			$filesize = filesize($_FILES["file"]["tmp_name"]);
			if($filesize > 0) {
				//not empty file
				if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {

					$sql = "SELECT ou_id, title FROM org_chart WHERE ou_id IN ('".$oc_list."') AND company_id = ".$company_id;
					$sql2 = "SELECT vrm_mark_code, vin FROM vehicle WHERE company_id = :company_id";
					$sql3 = "SELECT veh_type_id FROM vehicle_type";

					//get department title list (ou title) and vehicle list from db
					$db = $container->db;
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->execute();
					$ou_title_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					$db = $container->db;
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$vehicle_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					$db = $container->db;
					$stmt = $db->prepare($sql3, $prepOpts);
					$stmt->execute();
					$vehicle_type_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
					//can read CSV
					$error = array();
					$dep_not_exist_error = array();
					$veh_type_invalid_error = array();
					$record_exist_error = array();
					$vin_exist_error = array();
					$query_parts = array();
					$row = 1;

					while (($data = __fgetcsv($handle)) !== FALSE) {
						//read line by line
						if($row==1){
							//check encoding method
							//if there is error, $encode = FALSE;
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

						//check record format (validation)
						$num = count($data);
						$match = TRUE;
						$exist_dept = TRUE;
						$exist_record = false;
						$exist_vin = FALSE;
						$veh_type_invalid = false;

						if($num == 8){
							//correct number of fields
							$rowData = $data;
							foreach ($rowData as $key => $value) {
								//trim the each data
								if(empty($rowData[$key])){
									if($key == 4){
										$rowData[$key] = "7";
									}else{
										$rowData[$key] = NULL;
									}
				        		}
				        		else{
				        			$rowData[$key] = trim($rowData[$key]);
								}
							}

							//licence
							if(!preg_match("/^.{1,12}$/",$rowData[0])){
								$match = false;
							}
							if(in_array($rowData[0], array_column($vehicle_db, "vrm_mark_code"))){
								$exist_record=true;
							}

							//vin
							if(!preg_match("/^.{1,25}$/",$rowData[1])){
								$match = false;
							}
							if(in_array($rowData[1], array_column($vehicle_db, "vin"))){
								$exist_vin = true;
							}

							//brand
							if(!preg_match("/^.{1,20}$/",$rowData[2])){
								$match = false;
							}

							//model
							if(!preg_match("/^.{1,20}$/",$rowData[3])){
								$match = false;
							}

							//type code
							if(!preg_match("/^[1-7]{1}$/",$rowData[4])){
								$match = false;
							}
							if(!in_array($rowData[4], array_column($vehicle_type_db, "veh_type_id"))){
								$veh_type_invalid=true;
							}

							//year
							if(!preg_match("/^(19|20)\d{2}$/",$rowData[5])){
								$match = false;
							}

							//status
							if(!preg_match("/^[A,I]{1,1}$/",$rowData[6])){
								$match = false;
							}

							//check if department matches
							if(!in_array($rowData[7], array_column($ou_title_db, "title"))){
								$exist_dept=false;
							}else{
								$ou_index = array_search($rowData[7], array_column($ou_title_db, "title"));
							}
						}else{
							$match = FALSE;
						}

						//if format is correct or department exists
						if($match && $exist_dept && !$exist_record && !$veh_type_invalid){
							//prep query_parts
							//input: Licence plate, vin, brand, model, type, year, status, department
							$tmp = "(";
							foreach ($rowData as $key => $value) {
								if($key == 7){
									//replace with ou_id
									$tmp .= "'".$ou_title_db[$ou_index]["ou_id"]."', ";
								}
								else if(!empty($rowData[$key])){
									$tmp .= "'".$rowData[$key]."', ";
								}
								else{
									$tmp .= "null, ";
								}
							}

							$t=date("Y-m-d H:i:s");
							$a="0";
							$comp = $_SESSION['user']->company_id;
							$user = $_SESSION['user']->username;
							$tmp .= "'". $comp . "', '" . $user . "', '" . $t . "', '" . $user . "', '" . $t . "', '" . $a . "')";
							array_push($query_parts, $tmp);
						}
						else{
							if(!$exist_dept){
								array_push($dep_not_exist_error, $row);
							}
							if(!$match){
								array_push($error, $row);
							}
							if($exist_record){
								array_push($record_exist_error, $row);
							}
							if($exist_vin){
								array_push($vin_exist_error, $row);
							}
							if($veh_type_invalid){
								array_push($veh_type_invalid_error, $row);
							}
						}
						$row++;
					}

					if($empty==TRUE){
						$container->logger->warning('['.$routename.'] empty file. [ErrCode=10812]');
						$returnData = array('message' => 'Fail', 'code' => '10812');
						return $response->withJson($returnData,400);
					}
					else if($encode==FALSE){
						$container->logger->warning('['.$routename.'] not ansi or utf-8. [ErrCode=10813]');
						$returnData = array('message' => 'Fail', 'code' => '10813');
						return $response->withJson($returnData,400);
					}
					else if(count($error)!=0){
						$container->logger->warning('['.$routename.'] wrong pattern. [ErrCode=10814]');
						$returnData = array('message' => 'Fail', 'code' => '10814', 'data' => $error);
						return $response->withJson($returnData,400);
					}else if(count($dep_not_exist_error)!=0){
						$container->logger->warning('['.$routename.'] department not exist. [ErrCode=10815]');
						$returnData = array('message' => 'Fail', 'code' => '10815', 'data' => $dep_not_exist_error);
						return $response->withJson($returnData,400);
					}else if(count($veh_type_invalid_error)!=0){
						$container->logger->warning('['.$routename.'] vehicle type not exist. [ErrCode=10816]');
						$returnData = array('message' => 'Fail', 'code' => '10816', 'data' => $veh_type_invalid_error);
						return $response->withJson($returnData,400);
					}else if(count($record_exist_error)!=0){
						$container->logger->warning('['.$routename.'] licence already exist. [ErrCode=10822]');
						$returnData = array('message' => 'Fail', 'code' => '10822', 'data' => $record_exist_error);
						return $response->withJson($returnData,400);
					}else if(count($vin_exist_error)!=0){
						$container->logger->warning('['.$routename.'] vehicle vin already exist. [ErrCode=10823]');
						$returnData = array('message' => 'Fail', 'code' => '10823', 'data' => $vin_exist_error);
						return $response->withJson($returnData,400);
					}
					else{
						//insert to db
						$sql = "INSERT INTO vehicle (vrm_mark_code, vin, brand, model, type, year, status, ou_id, company_id, update_user, update_ts, create_user, create_ts, version) VALUES ".implode(',', $query_parts);
						$db = $container->db;
						$stmt = $db->prepare($sql, $prepOpts);
						$stmt->execute();
						$count = $stmt->rowCount();
						$db = null;
						if($count!=0){
							$container->logger->info('['.$routename.'] success.');
							$returnData = array('message' => 'Success','data' => $count);
							return $response->withJson($returnData);
						}
						else{
							$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10817]');
							$returnData = array('message' => 'Fail', 'code' => '10817');
							return $response->withJson($returnData,400);
						}
					}
					fclose($handle);
				}else{
					$container->logger->warning('['.$routename.'] read csv fail. [ErrCode=10820]');
					$returnData = array('message' => 'Fail', 'code' => '10820');
					return $response->withJson($returnData,400);
				}
			}else{
				$container->logger->warning('['.$routename.'] empty file. [ErrCode=10812]');
				$returnData = array('message' => 'Fail', 'code' => '10812');
				return $response->withJson($returnData,400);
			}
		}else{
			$container->logger->warning('['.$routename.'] upload file error: [ErrCode=10821] '.$uploadedFile->getError());
			$returnData = array('message' => 'Fail', 'code' => '10821');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10818] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10818');
			return $response->withJson($returnData,400);
		}
		else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10819] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10819');
			return $response->withJson($returnData,400);
		}
	}
}

function getVehicleAddL (Request $request, Response $response, array $args){
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

	$sql = "SELECT veh_type_id AS id, veh_type_code AS veh_type FROM vehicle_type";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
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
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10801] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10801');
		return $response->withJson($returnData,400);
	}

};

function getVehicle (Request $request, Response $response, array $args){
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

	$departments = $_SESSION['user']->departments;

	$sql = "SELECT veh.vrm_id AS vehicleId, veh.status AS status, veh.version AS version, veh.vrm_mark_code AS licence, veh.vin AS vin, ROUND(CAST((veh.run_distance_his+veh.run_distance)/100000.0 AS FLOAT),1) AS runDistance,veh.year AS year, veh.model AS model, veh.brand AS brand, vt.veh_type_code AS type, veh.type AS type_code, veh.ou_id AS departmentidtmp, org.title AS departmenttmp, case veh.update_user when 'System' then CONVERT(VARCHAR,ISNULL(veh.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(veh.update_ts,''),120)+' ('+ISNULL(veh.update_user,'')+')' end AS updated_by FROM vehicle AS veh LEFT JOIN org_chart AS org ON veh.ou_id = org.ou_id LEFT JOIN vehicle_type AS vt ON veh.type = vt.veh_type_id WHERE veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$vehicleData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($vehicleData){
			for($i=0;$i<count($vehicleData);$i++){
				$vehicleData[$i]['department'] = array('department' => $vehicleData[$i]['departmenttmp'], 'id' => $vehicleData[$i]['departmentidtmp']);
				$vehicleData[$i]['runDistance'] = (float)$vehicleData[$i]['runDistance'];
				unset($vehicleData[$i]['departmentidtmp']);
				unset($vehicleData[$i]['departmenttmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $vehicleData,'departments' => $departments);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'departments' => $departments);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10802] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10802');
		return $response->withJson($returnData,400);
	}

};

function addVehicle (Request $request, Response $response, array $args){
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

	$licence = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $licence);

	$sql = "INSERT INTO vehicle (vrm_mark_code, vin, brand, model, type, year, status, company_id, update_user, update_ts, create_user, create_ts, version, ou_id) VALUES (:vrm_mark_code, :vin, :brand, :model, :type, :year, :status, :company_id, :update_user, :update_ts, :create_user, :create_ts, :version, :ou_id)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$a="0";
		$stmt->bindParam("vrm_mark_code", $licence['vrm_mark_code']);
		$stmt->bindParam("vin", $licence['vin']);
		$stmt->bindParam("brand", $licence['brand']);
		$stmt->bindParam("model", $licence['model']);
		$stmt->bindParam("type", $licence['type']);
		$stmt->bindParam("year", $licence['year']);
		$stmt->bindParam("status", $licence['status']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("create_user", $username);
		$stmt->bindParam("create_ts", $t);
		$stmt->bindParam("version", $a);
		$stmt->bindParam("ou_id", $licence['ou_id']);
		$stmt->execute();
		$licence['vrm_id'] = $db->lastInsertId();
		$db = null;
		if($licence['vrm_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10803]');
			$returnData = array('message' => 'Fail', 'code' => '10803');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10810] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10810');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10804] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10804');
			return $response->withJson($returnData,400);
    	}
	}
};

function editVehicle (Request $request, Response $response, array $args){
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

	$licence = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $licence);

	$sql = "UPDATE vehicle SET brand = :brand, model = :model, type = :type, year = :year, status = :status, update_ts = :update_ts, update_user = :update_user, version = version+1, ou_id = :ou_id WHERE vrm_id = :vrm_id AND version = :version AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("vrm_id", $licence['vrm_id']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("brand", $licence['brand']);
		$stmt->bindParam("model", $licence['model']);
		$stmt->bindParam("type", $licence['type']);
		$stmt->bindParam("year", $licence['year']);
		$stmt->bindParam("status", $licence['status']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $licence['version']);
		$stmt->bindParam("ou_id", $licence['ou_id']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;

		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10805]');
			$returnData = array('message' => 'Fail','code'=>'10805');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10811] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10811');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10806] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10806');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteVehicle (Request $request, Response $response, array $args){
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

	$licence = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $licence);

	$sql = "SELECT vrm_id FROM vehicle_group_dtl WHERE vrm_id = :vrm_id UNION ALL SELECT vrm_id FROM log_data WHERE vrm_id = :vrm_id UNION ALL SELECT vrm_id FROM veh_trip WHERE vrm_id = :vrm_id UNION ALL SELECT vrm_id FROM mob_device WHERE vrm_id = :vrm_id UNION ALL SELECT vrm_id FROM avg_warning_veh WHERE vrm_id = :vrm_id UNION ALL SELECT vrm_id FROM warning_rank_veh WHERE vrm_id = :vrm_id";

	$sql2 = "DELETE FROM vehicle WHERE vrm_id = :vrm_id AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("vrm_id", $licence['vrm_id']);
		$stmt->execute();
		$vehicleData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if(!$vehicleData){
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_id", $licence['vrm_id']);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$count = $stmt->rowCount();
			$db = null;
			if($count==1){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10807]');
				$returnData = array('message' => 'Fail', 'code' => '10807');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=10808]');
			$returnData = array('message' => 'Fail', 'code' => '10808');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10809] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10809');
		return $response->withJson($returnData,400);
	}
};