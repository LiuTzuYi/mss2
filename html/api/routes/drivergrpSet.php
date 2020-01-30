<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-07 18:25:03
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/drivergrpSet', function() {
/**
 * @api {get} /api/drivergrpSet Get Driver Group Data List
 * @apiName DRIVER - GET DRIVER
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of driver groups
 * @apiSuccess {Number} data.drivergrpId Driver group ID [drv_grp_id]
 * @apiSuccess {Object[]} data.department Department data
 * @apiSuccess {String} data.department.department Department name [title]
 * @apiSuccess {String} data.department.id Department ID [ou_id]
 * @apiSuccess {String} data.groupDesc Driver group description [grp_descpt]
 * @apiSuccess {String} data.groupName Driver group name [grp_alias]
 * @apiSuccess {Object[]} data.driverBelong Driver data belongs to group
 * @apiSuccess {String} data.driverBelong.name Driver name [name]
 * @apiSuccess {String} data.driverBelong.id Driver ID [driver_id]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccess {Object[]} departments List of departments
 * @apiSuccess {String} departments.department Department name [title]
 * @apiSuccess {String} departments.id Department ID [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "drivergrpId": 4,
 *              "department": {
 *                  "department": "Root",
 *                  "id": "5"
 *              },
 *              "groupDesc": "Driver Group B",
 *              "groupName": "DRV_GRP_B",
 *              "driverBelong": [
 *                  {
 *                      "name": "6666",
 *                      "id": "5"
 *                  }
 *              ],
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
 * @apiError (400) InternalError_10402 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getDrivergrp')->setName('DRIVERGRP - GET DRIVER GRP');
/**
 * @api {post} /api/drivergrpSet Add Driver Group
 * @apiName DRIVERGRP - ADD DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Driver group name
 * @apiParam (Request Body) {String} grp_descpt Driver group description
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {Object[]} driverBelong Drivers belong to group
 * @apiParam (Request Body) {String} driverBelong.id Driver id
 * @apiParam (Request Body) {String} driverBelong.name Driver name
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10403 No record affected
 * @apiError (400) InternalError_10404 MySql error
 * @apiError (400) UpdateFailure_10411 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->post('', 'addDrivergrp')->setName('DRIVERGRP - ADD DRIVER GRP');
/**
 * @api {patch} /api/drivergrpSet Edit Driver Group
 * @apiName DRIVERGRP - EDIT DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} drv_grp_id Driver group id
 * @apiParam (Request Body) {String} grp_alias Driver group name
 * @apiParam (Request Body) {String} grp_descpt Driver group description
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {Object[]} driverBelong Drivers belong to group
 * @apiParam (Request Body) {String} driverBelong.id Driver id
 * @apiParam (Request Body) {String} driverBelong.name Driver name
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10405 No record affected
 * @apiError (400) InternalError_10406 MySql error
 * @apiError (400) UpdateFailure_10412 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editDrivergrp')->setName('DRIVERGRP - EDIT DRIVER GRP');
/**
 * @api {delete} /api/drivergrpSet Delete Driver Group
 * @apiName DRIVERGRP - DELETE DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} drv_grp_id Driver group id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10407 No record affected
 * @apiError (400) UpdateFailure_10408 Link records exist
 * @apiError (400) UpdateFailure_10409 MySql error
 * @apiError (400) InternalError_10410 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteDrivergrp')->setName('DRIVERGRP - DELETE DRIVER GRP');
});

/**
 * @api {get} /api/drivergrpAddL Get Driver List (Driver Group Dialog)
 * @apiName DRIVERGRP - GET DRIVER
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of drivers
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.id Driver id [driver_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "name": "666",
 *              "id": "2337"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10401 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/drivergrpAddL', 'getDrivergrpAddL')->setName('DRIVERGRP - GET DRIVER');

/**
 * @api {post} /api/drivergrpImport Import Driver Group
 * @apiName DRIVERGRP - IMPORT DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} add_group_count Group import count
 * @apiSuccess {Number} add_grpdriver_count Group driver import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "add_group_count": 5,
 *      "add_grpdriver_count": 5
 *  }
 *
 * @apiError (400) ImportFailure_10413 Empty CSV file
 * @apiError (400) ImportFailure_10414 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10415 Wrong input pattern
 * @apiError (400) ImportFailure_10416 Department not exist
 * @apiError (400) ImportFailure_10417 Read CSV fail
 * @apiError (400) ImportFailure_10418 Upload file error
 * @apiError (400) ImportFailure_10419 Driver Group not exist
 * @apiError (400) ImportFailure_10420 Driver not exist
 * @apiError (400) ImportFailure_10421 No record affected
 * @apiError (400) ImportFailure_10422 MySql error (duplicate key)
 * @apiError (400) InternalError_10423 MySql error
 * @apiError (400) ImportFailure_10424 Duplicate group name
 * @apiError (400) ImportFailure_10425 Duplicate driver in one group
 * @apiError (400) ImportFailure_10426 File not sorted
 * @apiError (400) ImportFailure_10427 Groups not added
 * @apiError (400) ImportFailure_10428 Vehicles not added
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
$app->post('/drivergrpImport', 'importDrivergrp')->setName('DRIVERGRP - IMPORT DRIVER GRP');

function getDrivergrp (Request $request, Response $response, array $args){
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

	$sql = "SELECT drvgrp.version AS version, drvgrpdtl.driver_id AS id, drv.name AS name, drvgrp.drv_grp_id AS drivergrpId, drvgrp.grp_alias AS groupName, drvgrp.grp_descpt AS groupDesc, drvgrp.ou_id AS departmentidtmp, org.title AS departmenttmp, case drvgrp.update_user when 'System' then CONVERT(VARCHAR,ISNULL(drvgrp.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(drvgrp.update_ts,''),120)+' ('+ISNULL(drvgrp.update_user,'')+')' end AS updated_by FROM driver_group AS drvgrp LEFT JOIN driver_group_dtl AS drvgrpdtl ON drvgrpdtl.drv_grp_id = drvgrp.drv_grp_id LEFT JOIN driver AS drv ON drvgrpdtl.driver_id = drv.driver_id LEFT JOIN org_chart AS org ON drvgrp.ou_id = org.ou_id WHERE drvgrp.company_id = :company_id AND drvgrp.ou_id IN ('".$oc_list."') ORDER BY drv.name";

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
						array_push($drvgrpData,array('drivergrpId' => (float)$drvgrpDataTMP[$i]->drivergrpId,'groupName'=> $drvgrpDataTMP[$i]->groupName,'groupDesc'=> $drvgrpDataTMP[$i]->groupDesc,'updated_by' => $drvgrpDataTMP[$i]->updated_by,'version' => $drvgrpDataTMP[$i]->version,'driverBelong'=>[],'department'=>array('department' => $drvgrpDataTMP[$i]->departmenttmp, 'id' => $drvgrpDataTMP[$i]->departmentidtmp)));
					}
					else{
						array_push($drvgrpData,array('drivergrpId' => (float)$drvgrpDataTMP[$i]->drivergrpId,'groupName'=> $drvgrpDataTMP[$i]->groupName,'groupDesc'=> $drvgrpDataTMP[$i]->groupDesc,'updated_by' => $drvgrpDataTMP[$i]->updated_by,'version' => $drvgrpDataTMP[$i]->version,'driverBelong'=>[array('id' => $drvgrpDataTMP[$i]->id,'name'=> $drvgrpDataTMP[$i]->name)],'department'=>array('department' => $drvgrpDataTMP[$i]->departmenttmp, 'id' => $drvgrpDataTMP[$i]->departmentidtmp)));
					}
				}
			}
			usort($drvgrpData, function($a, $b) {
			    return $a['drivergrpId'] <=> $b['drivergrpId'];
			});
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $drvgrpData,'departments' => $departments);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'departments' => $departments);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10402] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10402');
		return $response->withJson($returnData,400);
	}
};

function addDrivergrp (Request $request, Response $response, array $args){
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

	$drvgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $drvgrp);

	$sql = "INSERT INTO driver_group (company_id, grp_alias, grp_descpt, update_user, update_ts, create_user, create_ts, version, ou_id) VALUES (:company_id, :grp_alias, :grp_descpt, :update_user, :update_ts, :create_user, :create_ts, :version, :ou_id)";

	try{
		$db = $container->db;
		$t=date("Y-m-d H:i:s");
		$a="0";
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("grp_alias", $drvgrp['grp_alias']);
		$stmt->bindParam("grp_descpt", $drvgrp['grp_descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("create_user", $username);
		$stmt->bindParam("create_ts", $t);
		$stmt->bindParam("version", $a);
		$stmt->bindParam("ou_id", $drvgrp['ou_id']);
		$stmt->execute();
		$drvgrp['drv_grp_id'] = $db->lastInsertId();
		if($drvgrp['drv_grp_id']){
			if(count($drvgrp['driverBelong'])!==0){
				$query_parts = array();
				foreach( $drvgrp['driverBelong'] as $data ) {
				    $query_parts[] = "('" . $drvgrp['drv_grp_id'] . "', '" . $data['id'] . "', '" . $username . "', '" . $t . "')";
				}
				$sql2 = "INSERT INTO driver_group_dtl (drv_grp_id, driver_id, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->execute();
				$drvgrp['drv_grp_dtl_id'] = $db->lastInsertId();
			}
		}
		$db->commit();
		$db = null;
		if($drvgrp['drv_grp_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10403]');
			$returnData = array('message' => 'Fail','code'=>'10403');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10411] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10411');
			return $response->withJson($returnData,400);
    	}
    	else{
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10404] '.$e);
			$returnData = array('message' => 'Fail','code'=>'10404');
			return $response->withJson($returnData,400);
    	}
	}
};

function editDrivergrp (Request $request, Response $response, array $args){
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

	$drvgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $drvgrp);

	$sql = "UPDATE driver_group SET grp_alias = :grp_alias, grp_descpt = :grp_descpt, update_ts = :update_ts, update_user = :update_user, version = version+1, ou_id = :ou_id WHERE company_id = :company_id AND drv_grp_id = :drv_grp_id AND version = :version AND ou_id IN ('".$oc_list."')";

	$sql2 = "SELECT driver_id FROM driver_group_dtl WHERE drv_grp_id = :drv_grp_id";

	try{
		$db = $container->db;
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$a="0";
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("grp_alias", $drvgrp['grp_alias']);
		$stmt->bindParam("drv_grp_id", $drvgrp['drv_grp_id']);
		$stmt->bindParam("grp_descpt", $drvgrp['grp_descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("ou_id", $drvgrp['ou_id']);
		$stmt->bindParam("version", $drvgrp['version']);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count==1){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("drv_grp_id", $drvgrp['drv_grp_id']);
			$stmt->execute();
			$driverDTL = $stmt->fetchAll(PDO::FETCH_COLUMN);
			$driverDTLPost = array();
			foreach( $drvgrp['driverBelong'] as $data ) {
				$driverDTLPost[] = $data['id'];
			}
			$insertFunc = array_diff($driverDTLPost, $driverDTL);
			$deleteFunc = array_diff($driverDTL, $driverDTLPost);
			if($insertFunc){
				$query_parts = array();
				foreach( $insertFunc as $data ) {
				    $query_parts[] = "('" . $drvgrp['drv_grp_id'] . "', '" . $data . "', '" . $username . "', '" . $t . "')";
				}
				$sql3 = "INSERT INTO driver_group_dtl (drv_grp_id, driver_id, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->execute();
			}
			if($deleteFunc){
				$query_parts = implode("','", $deleteFunc);
				$sql4 = "DELETE FROM driver_group_dtl WHERE drv_grp_id = :drv_grp_id AND driver_id IN ('".$query_parts."')";
				$stmt = $db->prepare($sql4, $prepOpts);
				$stmt->bindParam("drv_grp_id", $drvgrp['drv_grp_id']);
				$stmt->execute();
			}
		}
		$db->commit();
		$db = null;
		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10405]');
			$returnData = array('message' => 'Fail','code'=>'10405');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10412] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10412');
			return $response->withJson($returnData,400);
    	}
    	else{
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10406] '.$e);
			$returnData = array('message' => 'Fail','code'=>'10406');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteDrivergrp (Request $request, Response $response, array $args){
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

	$drvgrp = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $drvgrp);

	$sql = "SELECT drv_grp_id FROM avg_warning_drv_grp WHERE drv_grp_id = :drv_grp_id";

	$sql2 = "DELETE FROM driver_group_dtl WHERE drv_grp_id = :drv_grp_id";

	$sql3 = "DELETE FROM driver_group WHERE drv_grp_id = :drv_grp_id AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("drv_grp_id", $licence['drv_grp_id']);
		$stmt->execute();
		$drvgrpData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if(!$drvgrpData){
			$db = $container->db;
			$db->beginTransaction();
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("drv_grp_id", $drvgrp['drv_grp_id']);
			$result = $stmt->execute();
			if($result){
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->bindParam("drv_grp_id", $drvgrp['drv_grp_id']);
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
					$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10407]');
					$returnData = array('message' => 'Fail','code'=>'10407');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] delete dtl fail. [ErrCode=10409]');
				$returnData = array('message' => 'Fail','code'=>'10409');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=10408]');
			$returnData = array('message' => 'Fail','code'=>'10408');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10410] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10410');
		return $response->withJson($returnData,400);
	}
};

function getDrivergrpAddL (Request $request, Response $response, array $args){
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

	$sql = "SELECT driver_id AS id, name AS name FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY name ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$driverData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($driverData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $driverData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10401] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10401');
		return $response->withJson($returnData,400);
	}
};

function importDrivergrp(Request $request, Response $response, array $args){
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
					//can read CSV

					$sql = "SELECT ou_id, title FROM org_chart WHERE ou_id IN ('".$oc_list."') AND company_id = ".$company_id;
					$sql2 = "SELECT grp_alias, drv_grp_id FROM driver_group WHERE company_id = :company_id";

					//get department title list (ou title) from db
					$db = $container->db;
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->execute();
					$ou_title_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					//get existing driver group list
					$db = $container->db;
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$driver_group_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;

					$add_grp = array();
					$add_driver = array();
					$add_grp_num_successful_rows = 0;
					$add_driver_num_successful_rows = 0;
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
						//* 4 fields/3 fields
						//* 1, group name, group descpt, department
						//* 2, group name, driver name
						$num = count($data);
						$match = TRUE;
						$exist_dept = TRUE;
						$exist_grp = FALSE;
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
							if(in_array($rowData[1], array_column($driver_group_db,"grp_alias"))){
								$exist_grp = true;
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

							if($match && $exist_dept){
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
							//first number 2
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
							if(!preg_match("/^.{1,45}$/",$rowData[2])){
								$match = false;
							}
							if($match==true){
								array_push($add_driver, $rowData);
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
						if($exist_grp){
							array_push($duplicate_group, $row);
						}
						$row++;
					}
					if($empty==TRUE){
						$container->logger->warning('['.$routename.'] empty file. [ErrCode=10413]');
						$returnData = array('message' => 'Fail', 'code' => '10413');
						return $response->withJson($returnData,400);
					}
					else if($encode==FALSE){
						$container->logger->warning('['.$routename.'] not ansi or utf-8. [ErrCode=10414]');
						$returnData = array('message' => 'Fail', 'code' => '10414');
						return $response->withJson($returnData,400);
					}
					else if($sorted==FALSE){
						$container->logger->warning('['.$routename.'] file not sorted. [ErrCode=10426]');
						$returnData = array('message' => 'Fail', 'code' => '10426');
						return $response->withJson($returnData,400);
					}
					else if(count($error)!=0){
						$container->logger->warning('['.$routename.'] wrong pattern. [ErrCode=10415]');
						$returnData = array('message' => 'Fail', 'code' => '10415', 'data' => $error);
						return $response->withJson($returnData,400);
					}
					else if(count($dep_not_exist_error)!=0){
						$container->logger->warning('['.$routename.'] department not exist. [ErrCode=10416]');
						$dep_not_exist_error = __consecutiveArray($dep_not_exist_error);
						$returnData = array('message' => 'Fail', 'code' => '10416', 'data' => $dep_not_exist_error);
						return $response->withJson($returnData,400);
					}
					else if(count($duplicate_group)!=0){
						$container->logger->warning('['.$routename.'] group name duplicated [ErrCode=10424]');
						$duplicate_group = __consecutiveArray($duplicate_group);
						$returnData = array('message' => 'Fail', 'code' => '10424', 'data'=>$duplicate_group);
						return $response->withJson($returnData,400);
					}
					fclose($handle);
				}
				else{
					$container->logger->warning('['.$routename.'] read csv fail. [ErrCode=10417]');
					$returnData = array('message' => 'Fail', 'code' => '10417');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$container->logger->warning('['.$routename.'] empty file. [ErrCode=10413]');
				$returnData = array('message' => 'Fail', 'code' => '10413');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] upload file error: [ErrCode=10418] '.$uploadedFile->getError());
			$returnData = array('message' => 'Fail', 'code' => '10418');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$db->beginTransaction();

		$drivergrp_not_exist_error = array();
		$driver_not_exist_error = array();
		$driver_duplicate_error = array();
		$grpnothingadd = array();
		$drvnothingadd = array();
		//add group first
		//* 1, group name, group descpt, department
		foreach($add_grp as $index => $entry){
			$ou_id_index=array_search($entry[3], array_column($ou_title_db, "title"));
			$company_id = $_SESSION['user']->company_id;
			$user = $_SESSION['user']->username;
			$t=date("Y-m-d H:i:s");
			$a="0";

			$sql = "INSERT INTO driver_group (company_id, grp_alias, grp_descpt, update_user, update_ts, create_user, create_ts, version, ou_id) VALUES (:company_id, :grp_alias, :grp_descpt, :update_user, :update_ts, :create_user, :create_ts, :version, :ou_id)";

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

		if(count($grpnothingadd)==0){
			$sql = "SELECT grp_alias, drv_grp_id FROM driver_group WHERE company_id = :company_id";
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$drivergroup_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$sql = "SELECT name, driver_id FROM driver WHERE company_id = :company_id";
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$driver_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);

			//add driver to group
			//* 2, group name, driver name
			foreach($add_driver as $index => $entry){
				if(!in_array($entry[1], array_column($drivergroup_list_db,"grp_alias"))){
					array_push($drivergrp_not_exist_error, ($index+count($add_grp)+1));
					continue;
				}
				else{
					$drivergrp_index = array_search($entry[1],array_column($drivergroup_list_db,"grp_alias"));
				}

				if(!in_array($entry[2], array_column($driver_list_db,"name"))){
					array_push($driver_not_exist_error, ($index+count($add_grp)+1));
					continue;
				}
				else{
					$driver_index = array_search($entry[2], array_column($driver_list_db,"name"));

					//check driver exist in group or not
					$sql = "SELECT drv.name AS name FROM driver_group_dtl AS drvgrp_dtl LEFT JOIN driver AS drv ON drvgrp_dtl.driver_id = drv.driver_id WHERE drvgrp_dtl.drv_grp_id = ".$drivergroup_list_db[$drivergrp_index]["drv_grp_id"];
					$stmt = $db->prepare($sql, $prepOpts);
					$stmt->execute();
					$group_list_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
					if(in_array($entry[2], array_column($group_list_db, "name"))){
						array_push($driver_duplicate_error, ($index+count($add_grp)+1));
						continue;
					}
				}

				$t=date("Y-m-d H:i:s");
				$a="0";

				$sql = "INSERT INTO driver_group_dtl (drv_grp_id, driver_id, create_user, create_ts) VALUES (:drv_grp_id, :driver_id, :create_user, :create_ts)";
				$stmt = $db->prepare($sql, $prepOpts);

				$stmt->bindParam("drv_grp_id", $drivergroup_list_db[$drivergrp_index]["drv_grp_id"]);
				$stmt->bindParam("driver_id", $driver_list_db[$driver_index]["driver_id"]);
				$stmt->bindParam("create_user", $user);
				$stmt->bindParam("create_ts", $t);
				$stmt->execute();
				$count = $stmt->rowCount();
				if($count==1){
					$add_driver_num_successful_rows += $count;
				}
				else{
					array_push($drvnothingadd, ($index+count($add_grp)+1));
				}
			}

			if(count($drvnothingadd)==0){
				//throw error
				if(count($drivergrp_not_exist_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] driver group not exist. [ErrCode=10419]');
					$drivergrp_not_exist_error = __consecutiveArray($drivergrp_not_exist_error);
					$returnData = array('message' => 'Fail', 'code' => '10419', 'data' => $drivergrp_not_exist_error);
					return $response->withJson($returnData,400);
				}
				else if(count($driver_not_exist_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] driver not exist. [ErrCode=10420]');
					$driver_not_exist_error = __consecutiveArray($driver_not_exist_error);
					$returnData = array('message' => 'Fail', 'code' => '10420', 'data' => $driver_not_exist_error);
					return $response->withJson($returnData,400);
				}
				else if(count($driver_duplicate_error)!=0){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] driver already exist. [ErrCode=10425]');
					$driver_duplicate_error = __consecutiveArray($driver_duplicate_error);
					$returnData = array('message' => 'Fail', 'code' => '10425', 'data' => $driver_duplicate_error);
					return $response->withJson($returnData,400);
				}
				else if(($add_grp_num_successful_rows==0) && ($add_driver_num_successful_rows==0)){
					$db->rollback();
					$db = null;
					$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10421]');
					$returnData = array('message' => 'Fail','code'=>'10421');
					return $response->withJson($returnData,400);
				}
				else{
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','add_group_count' => $add_grp_num_successful_rows, 'add_grpdriver_count' => $add_driver_num_successful_rows);
					return $response->withJson($returnData);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] nothing added on some driver. [ErrCode=10428]');
				$drvnothingadd = __consecutiveArray($drvnothingadd);
				$returnData = array('message' => 'Fail','code'=>'10428', 'data' => $drvnothingadd);
				return $response->withJson($returnData,400);
			}
		}
		else{
			$db->rollback();
			$db = null;
			$container->logger->warning('['.$routename.'] nothing added on some grp. [ErrCode=10427]');
			$grpnothingadd = __consecutiveArray($grpnothingadd);
			$returnData = array('message' => 'Fail','code'=>'10427', 'data' => $grpnothingadd);
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
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10422] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10422');
			return $response->withJson($returnData,400);
		}
		else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10423] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10423');
			return $response->withJson($returnData,400);
		}
	}
}