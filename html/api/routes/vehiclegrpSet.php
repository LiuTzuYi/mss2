<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-27 15:35:30
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/vehiclegrpSet', function() {
/**
 * @api {get} /vehiclegrpSet Get Vehicle Detail
 * @apiName VEHICLEGRP - GET VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle group information
 * @apiSuccess {Object} data.department Department information
 * @apiSuccess {String} data.department.department Department name
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.groupDesc Group description
 * @apiSuccess {String} data.groupName Group name
 * @apiSuccess {String} data.updated_by Update timestamp
 * @apiSuccess {Object[]} data.vehicleBelong Vehicle member
 * @apiSuccess {String} data.vehicleBelong.id Vehicle ID
 * @apiSuccess {String} data.vehicleBelong.licence Vehicle licence
 * @apiSuccess {String} data.vehiclegrpId Vehicle group ID
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "vehiclegrpId":1,
 *              "groupName":"VEH_GRP_A",
 *              "groupDesc":"Vehicle Group A",
 *              "updated_by":"2018-09-14 16:57:44 (zilvia)",
 *              "version":"2",
 *              "vehicleBelong": [
 *                  {
 *                      "id":"17",
 *                      "licence":"LE3415"
 *                  }
 *              ],
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
 * @apiError (400) InternalError_10702 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('', 'getVehiclegrp')->setName('VEHICLEGRP - GET VEHICLE GRP');
/**
 * @api {post} /vehiclegrpSet Add Vehicle Detail
 * @apiName VEHICLEGRP - ADD VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Group name
 * @apiParam (Request Body) {String} grp_descp Group description
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} vehicleBelong Vehicle list
 * @apiParam (Request Body) {String} vehicleBelong.id Vehicle ID
 * @apiParam (Request Body) {String} vehicleBelong.licence Vehicle licence
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10703 Fail (no row affected)
 * @apiError (400) InternalError_10704 SQL error
 * @apiError (400) UpdateFailure_10711 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->post('', 'addVehiclegrp')->setName('VEHICLEGRP - ADD VEHICLE GRP');
/**
 * @api {patch} /vehiclegrpSet Edit Vehicle Detail
 * @apiName VEHICLEGRP - ADD VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Group name
 * @apiParam (Request Body) {String} grp_descp Group description
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} vrm_grp_id Vehicle group ID
 * @apiParam (Request Body) {String} version Version
 * @apiParam (Request Body) {String} vehicleBelong Vehicle list
 * @apiParam (Request Body) {String} vehicleBelong.id Vehicle ID
 * @apiParam (Request Body) {String} vehicleBelong.licence Vehicle licence
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10705 Fail (no row affected)
 * @apiError (400) InternalError_10706 SQL error
 * @apiError (400) UpdateFailure_10712 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->patch('', 'editVehiclegrp')->setName('VEHICLEGRP - EDIT VEHICLE GRP');
/**
 * 0@api {delete} /vehiclegrpSet Delete Vehicle Detail
 * @apiName VEHICLEGRP - DELETE VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} vrm_grp_id Group ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10707 Fail (no row affected)
 * @apiError (400) UpdateFailure_10708 Fail (has linked record)
 * @apiError (400) UpdateFailure_10709 Fail (SQL execute return false)
 * @apiError (400) InternalError_10710 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteVehiclegrp')->setName('VEHICLEGRP - DELETE VEHICLE GRP');
});
/**
 * @api {get} /vehiclegrpAddL Get Vehicle List
 * @apiName VEHICLEGRP - GET VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Vehicle list
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 * 			{
 * 				"id": "2337",
 * 				"licence": "1001-1800-1138-cfac"
 * 			}
 * 		]
 *  }
 *
 * @apiError (400) InternalError_10701 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/vehiclegrpAddL', 'getVehiclegrpAddL')->setName('VEHICLEGRP - GET VEHICLE');

/**
 * @api {post} /vehiclegrpImport Import Vehicle Group
 * @apiName VEHICLEGRP - IMPORT VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} add_group_count Number of group added
 * @apiSuccess {Number} add_vehicle_count Number of vehicle added
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "add_group_count": 10,
 *      "add_vehicle_count": 100
 *  }
 *
 * @apiError (400) ImportFailure_10713 Empty CSV file
 * @apiError (400) ImportFailure_10714 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10715 Wrong pattern
 * @apiError (400) ImportFailure_10716 Department not exist
 * @apiError (400) ImportFailure_10717 Read CSV fail
 * @apiError (400) ImportFailure_10718 Upload file error
 * @apiError (400) ImportFailure_10719 Vehicle group not exist
 * @apiError (400) ImportFailure_10720 License not exist
 * @apiError (400) InternalError_10721 Nothing added
 * @apiError (400) ImportFailure_10722 Duplicate key
 * @apiError (400) InternalError_10723 SQL error
 * @apiError (400) ImportFailure_10724 Duplicate group name
 * @apiError (400) ImportFailure_10725 Duplicate driver in one group
 * @apiError (400) ImportFailure_10726 File not sorted
 * @apiError (400) ImportFailure_10727 Some group not added
 * @apiError (400) ImportFailure_10728 Some veh not added
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
$app->post('/vehiclegrpImport', 'importVehiclegrp')->setName('VEHICLEGRP - IMPORT VEHICLE GRP');

function importVehiclegrp (Request $request, Response $response, array $args){
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

					$sql = "SELECT ou_id, title FROM org_chart WHERE ou_id IN ('".$oc_list."') AND company_id = :company_id";
					$sql2 = "SELECT grp_alias, vrm_grp_id FROM vehicle_group WHERE company_id = :company_id";

					//get department title list (ou title) from db
					$db = $container->db;
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$ou_title_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					//get existing vehicle group list
					$db = $container->db;
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$vehicle_group_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
					//can read CSV
					$add_grp = array();
					$add_veh = array();
					$add_grp_num_successful_rows = 0;
					$add_vehicle_num_successful_rows = 0;
					$switched = false;
					$sorted = true;
					$error = array();
					$dep_not_exist_error = array();
					$duplicate_group = array();
					$row = 1;

					while (($data = __fgetcsv($handle)) !== FALSE) {
						$db = $container->db;
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
				    				}
				    			}
				    			else{
				    				if(!preg_match("/^[\x20-\x7F]$/",$data[0][0])){
				    					$encode = FALSE;
				    				}
				    			}
				    		}
						}

						//check record format (validation)
						//* 1, group name, group descpt, department
						//* 2, group name, licence plate
						$num = count($data);
						$match = TRUE;
						$exist_dept = TRUE;
						$exist_vehgrp = FALSE;
						if($num == 4 && $data[0]=='1' && !$switched){
							//correct number of fields with number 1
							$rowData = $data;
				        	foreach ($rowData as $key => $value) {
								//trim the each data
				        		if(empty($rowData[$key])){
				        			$rowData[$key] = NULL;
				        		}
				        		else{
				        			$rowData[$key] = trim($rowData[$key]);
				        		}
							}

							//check group name and uniqueness
							if(!preg_match("/^.{1,20}$/",$rowData[1])){
				        		$match = false;
							}
							if(in_array($rowData[1], array_column($vehicle_group_db,"grp_alias"))){
								$exist_vehgrp = TRUE;
							}

							if(!preg_match("/^.{1,45}$/",$rowData[2])){
				        		$match = false;
							}

							//check if department matches
							if(!in_array($rowData[3], array_column($ou_title_db, "title"))){
								$container->logger->info("ou_titles: ". implode(",", array_column($ou_title_db, "title"))."; rowData[3]: ".$rowData[3]);
								$exist_dept=false;
							}
							else{
								$ou_index = array_search($rowData[3], array_column($ou_title_db, "title"));
							}

							if($match && $exist_dept && !$exist_vehgrp){
								array_push($add_grp, $rowData);
							}
						}
						else if($num==4 && $data[0]=='1' && $switched){
							//switched but 1 again
							//not sorted
							$sorted = false;
						}
						else if($num == 3 && $data[0]=='2'){
							//correct number of fields with number 2
							$rowData = $data;
				        	foreach ($rowData as $key => $value) {
								//trim the each data
				        		if(empty($rowData[$key])){
				        			$rowData[$key] = NULL;
				        		}
				        		else{
				        			$rowData[$key] = trim($rowData[$key]);
				        		}
							}

							if(!preg_match("/^.{1,20}$/",$rowData[1])){
				        		$match = false;
							}
							if(!preg_match("/^.{1,20}$/",$rowData[2])){
				        		$match = false;
							}
							if($match==true){
								array_push($add_veh, $rowData);
							}

							if(!$switched){
								$switched = true;
							}
						}
						else{
							$match = FALSE;
						}

						if(!$exist_dept){
							array_push($dep_not_exist_error, $row);
						}
						if(!$match){
							array_push($error, $row);
						}
						if($exist_vehgrp){
							array_push($duplicate_group, $row);
						}
						$row++;
					}
					if($empty==TRUE){
				    	$container->logger->warning('['.$routename.'] empty file. [ErrCode=10713]');
						$returnData = array('message' => 'Fail', 'code' => '10713');
						return $response->withJson($returnData,400);
					}
					else if($encode==FALSE){
				    	$container->logger->warning('['.$routename.'] not ansi or utf-8. [ErrCode=10714]');
						$returnData = array('message' => 'Fail', 'code' => '10714');
						return $response->withJson($returnData,400);
				    }
					else if($sorted==FALSE){
						$container->logger->warning('['.$routename.'] file not sorted. [ErrCode=10726]');
						$returnData = array('message' => 'Fail', 'code' => '10726');
						return $response->withJson($returnData,400);
					}
				    else if(count($error)!=0){
				    	$container->logger->warning('['.$routename.'] wrong pattern. [ErrCode=10715]');
						$returnData = array('message' => 'Fail', 'code' => '10715', 'data' => $error);
						return $response->withJson($returnData,400);
				    }
				    else if(count($dep_not_exist_error)!=0){
				    	$container->logger->warning('['.$routename.'] department not exist. [ErrCode=10716]');
						$returnData = array('message' => 'Fail', 'code' => '10716', 'data' => $dep_not_exist_error);
						return $response->withJson($returnData,400);
					}
					else if(count($duplicate_group)!=0){
						$container->logger->warning('['.$routename.'] group name duplicated [ErrCode=10724]');
						$returnData = array('message' => 'Fail', 'code' => '10724', 'data' => $duplicate_group);
						return $response->withJson($returnData,400);
					}
					fclose($handle);
				}
				else{
					$container->logger->warning('['.$routename.'] read csv fail. [ErrCode=10717]');
					$returnData = array('message' => 'Fail', 'code' => '10717');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$container->logger->warning('['.$routename.'] empty file. [ErrCode=10713]');
				$returnData = array('message' => 'Fail', 'code' => '10713');
				return $response->withJson($returnData,400);
			}
		}
		else{
	    	$container->logger->warning('['.$routename.'] upload file error: [ErrCode=10718] '.$uploadedFile->getError());
			$returnData = array('message' => 'Fail', 'code' => '10718');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$db->beginTransaction();

		$vehgrp_not_exist_error = array();
		$license_not_exist_error = array();
		$vehicle_duplicate_error = array();
		$grpnothingadd = array();
		$vehnothingadd = array();
		//add group first
		//* 1, group name, group descpt, department
		foreach($add_grp as $index => $entry){
			$ou_id_index=array_search($entry[3], array_column($ou_title_db, "title"));
			$company_id = $_SESSION['user']->company_id;
			$user = $_SESSION['user']->username;
			$t=date("Y-m-d H:i:s");
			$a="0";

			$sql = "INSERT INTO vehicle_group (company_id, grp_alias, grp_descpt, update_user, update_ts, create_user, create_ts, version, ou_id) VALUES (:company_id, :grp_alias, :grp_descpt, :update_user, :update_ts, :create_user, :create_ts, :version, :ou_id)";
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->bindParam("grp_alias", $entry[1]);
			$stmt->bindParam("grp_descpt", $entry[2]);
			$stmt->bindParam("update_user", $user);
			$stmt->bindParam("update_ts", $t);
			$stmt->bindParam("create_user", $user);
			$stmt->bindParam("create_ts", $t);
			$stmt->bindParam("version", $a);
			$stmt->bindParam("ou_id", $ou_title_db[$ou_index]["ou_id"]);
			$stmt->execute();
			$count = $stmt->rowCount();
			if($count==1){
				$add_grp_num_successful_rows += $count;
			}
			else{
				array_push($grpnothingadd, $index);
			}
		}

		if(sizeof($grpnothingadd)==0){
			$sql = "SELECT grp_alias, vrm_grp_id FROM vehicle_group WHERE company_id = :company_id";
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$vehgroup_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$sql = "SELECT vrm_mark_code, vrm_id FROM vehicle WHERE company_id = :company_id";
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$licence_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);

			//add vehicle to group
			//* 2, group name, licence plate
			foreach($add_veh as $index => $entry){
				if(!in_array($entry[1], array_column($vehgroup_list_db,"grp_alias"))){
					$exist = false;
					array_push($vehgrp_not_exist_error, ($index+count($add_grp)+1));
					continue;
				}
				else{
					$vehgrp_index = array_search($entry[1],array_column($vehgroup_list_db,"grp_alias"));
				}

				if(!in_array($entry[2], array_column($licence_list_db,"vrm_mark_code"))){
					$exist = false;
					array_push($license_not_exist_error, ($index+count($add_grp)+1));
					continue;
				}
				else{
					$licence_index = array_search($entry[2], array_column($licence_list_db,"vrm_mark_code"));

					//check if the vehicle exist in group or not
					$sql = "SELECT veh.vrm_mark_code AS licence FROM vehicle_group_dtl AS vehgrp_dtl LEFT JOIN vehicle AS veh ON vehgrp_dtl.vrm_id = veh.vrm_id WHERE vehgrp_dtl.vrm_grp_id = ".$vehgroup_list_db[$vehgrp_index]["vrm_grp_id"];
					/*$sql = "SELECT vehicle.vrm_mark_code AS licence FROM vehicle, vehicle_group_dtl WHERE vehicle.vrm_id = vehicle_group_dtl.vrm_id AND vehicle_group_dtl.vrm_grp_id =";
					$sql .= $vehgroup_list_db[$vehgrp_index]["vrm_grp_id"];*/
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->execute();
					$group_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					if(in_array($entry[2], array_column($group_list_db, "licence"))){
						array_push($vehicle_duplicate_error, ($index+count($add_grp)+1));
						continue;
					}
				}

				$t=date("Y-m-d H:i:s");
				$a="0";

				$sql = "INSERT INTO vehicle_group_dtl (vrm_grp_id, vrm_id, create_user, create_ts) VALUES (:vrm_grp_id, :vrm_id, :create_user, :create_ts)";
				$stmt = $db->prepare($sql, $prepOpts);

				$stmt->bindParam("vrm_grp_id", $vehgroup_list_db[$vehgrp_index]["vrm_grp_id"]);
				$stmt->bindParam("vrm_id", $licence_list_db[$licence_index]["vrm_id"]);
				$stmt->bindParam("create_user", $user);
				$stmt->bindParam("create_ts", $t);
				$stmt->execute();
				$count = $stmt->rowCount();
				if($count==1){
					$add_vehicle_num_successful_rows += $count;
				}
				else{
					array_push($vehnothingadd, ($index+count($add_grp)+1));
				}
			}

			if(sizeof($vehnothingadd)==0){
				//throw error
				if(count($vehgrp_not_exist_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] vehicle group not exist. [ErrCode=10719]');
					$returnData = array('message' => 'Fail', 'code' => '10719', 'data' => $vehgrp_not_exist_error);
					return $response->withJson($returnData,400);
				}
				else if(count($license_not_exist_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] vehicle not exist. [ErrCode=10720]');
					$returnData = array('message' => 'Fail', 'code' => '10720', 'data' => $license_not_exist_error);
					return $response->withJson($returnData,400);
				}
				else if(count($vehicle_duplicate_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] vehicle already exist. [ErrCode=10725]');
					$returnData = array('message' => 'Fail', 'code' => '10725', 'data' => $vehicle_duplicate_error);
					return $response->withJson($returnData,400);
				}else if(($add_grp_num_successful_rows==0) && ($add_vehicle_num_successful_rows==0)){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10721]');
					$returnData = array('message' => 'Fail','code'=>'10721');
					return $response->withJson($returnData,400);
				}else{
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','add_group_count' => $add_grp_num_successful_rows, 'add_vehicle_count' => $add_vehicle_num_successful_rows);
					return $response->withJson($returnData);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] some vehicle not added. [ErrCode=10728]');
				$returnData = array('message' => 'Fail','code'=>'10728','data' => $vehnothingadd);
				return $response->withJson($returnData,400);
			}
		}
		else{
			$db->rollback();
			$db = null;
			$container->logger->warning('['.$routename.'] some group not added. [ErrCode=10727]');
			$returnData = array('message' => 'Fail','code'=>'10727','data' => $grpnothingadd);
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
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10722] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10722');
			return $response->withJson($returnData,400);
		}
		else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10723] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10723');
			return $response->withJson($returnData,400);
		}
	}
}

function getVehiclegrpAddL (Request $request, Response $response, array $args){
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

	$sql = "SELECT vrm_id AS id, vrm_mark_code AS licence FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY vrm_mark_code ASC";

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
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10701] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10701');
		return $response->withJson($returnData,400);
	}
};

function getVehiclegrp (Request $request, Response $response, array $args){
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

	$sql = "SELECT vehgrp.version AS version, vehgrpdtl.vrm_id AS id, veh.vrm_mark_code AS licence, vehgrp.vrm_grp_id AS vehiclegrpId, vehgrp.grp_alias AS groupName, vehgrp.grp_descpt AS groupDesc, vehgrp.ou_id AS departmentidtmp, org.title AS departmenttmp, case vehgrp.update_user when 'System' then CONVERT(VARCHAR,ISNULL(vehgrp.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(vehgrp.update_ts,''),120)+' ('+ISNULL(vehgrp.update_user,'')+')' end AS updated_by FROM vehicle_group AS vehgrp LEFT JOIN vehicle_group_dtl AS vehgrpdtl ON vehgrpdtl.vrm_grp_id = vehgrp.vrm_grp_id LEFT JOIN vehicle AS veh ON vehgrpdtl.vrm_id = veh.vrm_id LEFT JOIN org_chart AS org ON vehgrp.ou_id = org.ou_id WHERE vehgrp.company_id = :company_id AND vehgrp.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code";

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
						array_push($vehgrpData,array('vehiclegrpId' => (float)$vehgrpDataTMP[$i]->vehiclegrpId,'groupName'=> $vehgrpDataTMP[$i]->groupName,'groupDesc'=> $vehgrpDataTMP[$i]->groupDesc,'updated_by' => $vehgrpDataTMP[$i]->updated_by,'version' => $vehgrpDataTMP[$i]->version,'vehicleBelong'=>[],'department'=>array('department' => $vehgrpDataTMP[$i]->departmenttmp, 'id' => $vehgrpDataTMP[$i]->departmentidtmp)));
					}else{
						array_push($vehgrpData,array('vehiclegrpId' => (float)$vehgrpDataTMP[$i]->vehiclegrpId,'groupName'=> $vehgrpDataTMP[$i]->groupName,'groupDesc'=> $vehgrpDataTMP[$i]->groupDesc,'updated_by' => $vehgrpDataTMP[$i]->updated_by,'version' => $vehgrpDataTMP[$i]->version,'vehicleBelong'=>[array('id' => $vehgrpDataTMP[$i]->id,'licence'=> $vehgrpDataTMP[$i]->licence)],'department'=>array('department' => $vehgrpDataTMP[$i]->departmenttmp, 'id' => $vehgrpDataTMP[$i]->departmentidtmp)));
					}
				}
			}
			usort($vehgrpData, function($a, $b) {
			    return $a['vehiclegrpId'] <=> $b['vehiclegrpId'];
			});
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $vehgrpData,'departments' => $departments);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'departments' => $departments);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10702] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10702');
		return $response->withJson($returnData,400);
	}
};

function addVehiclegrp (Request $request, Response $response, array $args){
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

	$vehgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $vehgrp);

	$sql = "INSERT INTO vehicle_group (company_id, grp_alias, grp_descpt, update_user, update_ts, create_user, create_ts, version, ou_id) VALUES (:company_id, :grp_alias, :grp_descpt, :update_user, :update_ts, :create_user, :create_ts, :version, :ou_id)";

	try{
		$db = $container->db;
		$t=date("Y-m-d H:i:s");
		$a="0";
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("grp_alias", $vehgrp['grp_alias']);
		$stmt->bindParam("grp_descpt", $vehgrp['grp_descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("create_user", $username);
		$stmt->bindParam("create_ts", $t);
		$stmt->bindParam("version", $a);
		$stmt->bindParam("ou_id", $vehgrp['ou_id']);
		$stmt->execute();
		$vehgrp['vrm_grp_id'] = $db->lastInsertId();
		if($vehgrp['vrm_grp_id']){
			if(count($vehgrp['vehicleBelong'])!==0){
				$query_parts = array();
				foreach( $vehgrp['vehicleBelong'] as $data ) {
				    $query_parts[] = "('" . $vehgrp['vrm_grp_id'] . "', '" . $data['id'] . "', '" .  $username . "', '" . $t . "')";
				}
				$sql2 = "INSERT INTO vehicle_group_dtl (vrm_grp_id, vrm_id, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->execute();
			}
		}
		$db->commit();
		$db = null;
		if($vehgrp['vrm_grp_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10703]');
			$returnData = array('message' => 'Fail','code'=>'10703');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10711] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10711');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10704] '.$e);
			$returnData = array('message' => 'Fail','code'=>'10704');
			return $response->withJson($returnData,400);
    	}
	}
};

function editVehiclegrp (Request $request, Response $response, array $args){
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

	$vehgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $vehgrp);

	$sql = "UPDATE vehicle_group SET grp_alias = :grp_alias, grp_descpt = :grp_descpt, update_ts = :update_ts, update_user = :update_user, version = version+1, ou_id = :ou_id WHERE company_id = :company_id AND vrm_grp_id = :vrm_grp_id AND version = :version AND ou_id IN ('".$oc_list."')";

	$sql2 = "SELECT vrm_id FROM vehicle_group_dtl WHERE vrm_grp_id = :vrm_grp_id";

	try{
		$db = $container->db;
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$a="0";
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("grp_alias", $vehgrp['grp_alias']);
		$stmt->bindParam("vrm_grp_id", $vehgrp['vrm_grp_id']);
		$stmt->bindParam("grp_descpt", $vehgrp['grp_descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $vehgrp['version']);
		$stmt->bindParam("ou_id", $vehgrp['ou_id']);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count==1){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_grp_id", $vehgrp['vrm_grp_id']);
			$stmt->execute();
			$vehicleDTL = $stmt->fetchAll(PDO::FETCH_COLUMN);
			$vehicleDTLPost = array();
			foreach( $vehgrp['vehicleBelong'] as $data ) {
				$vehicleDTLPost[] = $data['id'];
			}
			$insertFunc = array_diff($vehicleDTLPost, $vehicleDTL);
			$deleteFunc = array_diff($vehicleDTL, $vehicleDTLPost);
			if($insertFunc){
				$query_parts = array();
				foreach( $insertFunc as $data ) {
				    $query_parts[] = "('" . $vehgrp['vrm_grp_id'] . "', '" . $data . "', '" . $username . "', '" . $t . "')";
				}
				$sql3 = "INSERT INTO vehicle_group_dtl (vrm_grp_id, vrm_id, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->execute();
			}
			if($deleteFunc){
				$query_parts = implode("','", $deleteFunc);
				$sql4 = "DELETE FROM vehicle_group_dtl WHERE vrm_grp_id = :vrm_grp_id AND vrm_id IN ('".$query_parts."')";
				$stmt = $db->prepare($sql4, $prepOpts);
				$stmt->bindParam("vrm_grp_id", $vehgrp['vrm_grp_id']);
				$stmt->execute();
			}
		}
		$db->commit();
		$db = null;
		if($vehgrp['vrm_grp_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10705]');
			$returnData = array('message' => 'Fail','code'=>'10705');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10712] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10712');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10706] '.$e);
			$returnData = array('message' => 'Fail','code'=>'10706');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteVehiclegrp (Request $request, Response $response, array $args){
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

	$vehgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $vehgrp);

	$sql = "SELECT vrm_grp_id FROM avg_warning_veh_grp WHERE vrm_grp_id = :vrm_grp_id";

	$sql2 = "DELETE FROM vehicle_group_dtl WHERE vrm_grp_id = :vrm_grp_id";

	$sql3 = "DELETE FROM vehicle_group WHERE vrm_grp_id = :vrm_grp_id AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("vrm_grp_id", $licence['vrm_grp_id']);
		$stmt->execute();
		$vehgrpData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if(!$vehgrpData){
			$db = $container->db;
			$db->beginTransaction();
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("vrm_grp_id", $vehgrp['vrm_grp_id']);
			$result = $stmt->execute();
			if($result){
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->bindParam("vrm_grp_id", $vehgrp['vrm_grp_id']);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$count = $stmt->rowCount();
				if($count==1){
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success');
					return $response->withJson($returnData);
				}
				else{
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10707]');
					$returnData = array('message' => 'Fail','code'=>'10707');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] delete dtl fail. [ErrCode=10709]');
				$returnData = array('message' => 'Fail','code'=>'10709');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=10708]');
			$returnData = array('message' => 'Fail','code'=>'10708');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10710] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10710');
		return $response->withJson($returnData,400);
	}
};