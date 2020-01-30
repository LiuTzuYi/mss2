<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:32
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/userroleSet', function() {
/**
 * @api {get} /userroleSet Get User Role
 * @apiName USERROLE - GET USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Data of user role
 * @apiSuccess {String[]} compFunc Function
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 * 		"message":"Success",
 * 		"data":
 * 		[
 * 			{
 * 				"roleId":4,
 * 				"roleName":"Chun Wo User",
 * 				"updated_by":"2018-10-03 18:28:27 (zilvia)",
 * 				"version":"5",
 * 				"userFunc":["WARNING_MAP","USER_MAINT"]
 * 			},
 * 		],
 * 		"compFunc":
 * 		[
 * 			"COMPANY_PROFILE",
 * 			"DEVICE_MAINT",
 * 			"DRIVER_GRP_MAINT",
 * 			"DRIVER_GRP_PROFILE",
 * 			"DRIVER_MAINT",
 * 			"DRIVER_PROFILE",
 * 			"LIVE_LOCATION",
 * 			"MAIL_NOTIFY_MAINT",
 * 			"ORG_CHART_MAINT",
 * 			"ROSTER_MAINT",
 * 			"TRIP_DRV_IMPORT",
 * 			"USER_MAINT",
 * 			"USER_ROLE_MAINT",
 * 			"VEHICLE_GRP_MAINT",
 * 			"VEHICLE_GRP_PROFILE",
 * 			"VEHICLE_MAINT",
 * 			"VEHICLE_PROFILE",
 * 			"VEHICLE_TRIP_MAINT",
 * 			"VIDEO_BATCH_DOWNLOAD",
 * 			"VRM_MAINT",
 * 			"WARNING_EXPORT",
 * 			"WARNING_MAP"
 * 		]
 * 	}
 *
 * @apiError (400) InternalError_11001 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getUserrole')->setName('USERROLE - GET USERROLE');
/**
 * @api {post} /userroleSet Add User Role
 * @apiName USERROLE - GET USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_name Group name
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} userFunc Editing function
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11002 Fail (no insert ID)
 * @apiError (400) InternalError_11003 SQL error
 * @apiError (400) UpdateFailure_11010 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->post('', 'addUserrole')->setName('USERROLE - ADD USERROLE');

/**
 * @api {patch} /userroleSet Edit User Role
 * @apiName USERROLE - EDIT USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_name Group name
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} version Role version
 * @apiParam (Request Body) {String} userFunc Editing function
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11004 Fail (no row affected)
 * @apiError (400) InternalError_11005 SQL error
 * @apiError (400) UpdateFailure_11011 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->patch('', 'editUserrole')->setName('USERROLE - EDIT USERROLE');
/**
 * @api {delete} /userroleSet Delete User Role
 * @apiName USERROLE - DELETE USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_id Group ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11006 Fail (no row affected)
 * @apiError (400) UpdateFailure_11007 Fail (has linked record)
 * @apiError (400) UpdateFailure_11008 Fail (SQL execute return false)
 * @apiError (400) InternalError_11009 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteUserrole')->setName('USERROLE - DELETE USERROLE');
});

function getUserrole (Request $request, Response $response, array $args){
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

	$function = $_SESSION['user']->compFunc;
	$query_parts = implode("','", $function);

	$sql = "SELECT grp.group_id AS roleId, grp.group_name AS roleName, func.func_code AS userFunc, grp.version AS version, case grp.update_user when 'System' then CONVERT(VARCHAR,ISNULL(grp.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(grp.update_ts,''),120)+' ('+ISNULL(grp.update_user,'')+')' end AS updated_by FROM user_group AS grp LEFT JOIN user_group_func AS func ON grp.group_id = func.group_id WHERE grp.company_id = :company_id AND func.func_code IN ('".$query_parts."') ORDER BY grp.group_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$userroleDataTMP = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($userroleDataTMP){
			$grpList = [];
			$userroleData = [];
			for($i=0;$i<count($userroleDataTMP);$i++){
				$index = array_search($userroleDataTMP[$i]->roleId,$grpList);
				if($index!==false){
					if($userroleDataTMP[$i]->userFunc!==null){
						array_push($userroleData[$index]['userFunc'], $userroleDataTMP[$i]->userFunc);
					}
				}
				else{
					array_push($grpList,$userroleDataTMP[$i]->roleId);
					if($userroleDataTMP[$i]->userFunc!==null){
						array_push($userroleData,array('roleId' => (float)$userroleDataTMP[$i]->roleId,'roleName'=> $userroleDataTMP[$i]->roleName,'updated_by' => $userroleDataTMP[$i]->updated_by,'version'=> $userroleDataTMP[$i]->version,'userFunc'=>[$userroleDataTMP[$i]->userFunc]));
					}
					else{
						array_push($userroleData,array('roleId' => (float)$userroleDataTMP[$i]->roleId,'roleName'=> $userroleDataTMP[$i]->roleName,'updated_by' => $userroleDataTMP[$i]->updated_by,'version'=> $userroleDataTMP[$i]->version,'userFunc'=>[]));
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $userroleData,'compFunc' => $function);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'compFunc' => $function);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11001] '.$e);
		$returnData = array('message' => 'Fail','code' => '11001');
		return $response->withJson($returnData,400);
	}

};

function addUserrole (Request $request, Response $response, array $args){
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

	$userrole = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $userrole);

	$sql = "INSERT INTO user_group (company_id, group_name, update_user, update_ts, create_user, create_ts, version) VALUES (:company_id, :group_name, :update_user, :update_ts, :create_user, :create_ts, :version)";

	try{
		$db = $container->db;
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$a="0";
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("group_name", $userrole['group_name']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("create_user", $username);
		$stmt->bindParam("create_ts", $t);
		$stmt->bindParam("version", $a);
		$stmt->execute();
		$userrole['group_id'] = $db->lastInsertId();
		if($userrole['group_id']){
			if(count($userrole['userFunc'])!==0){
				$query_parts = array();
				foreach( $userrole['userFunc'] as $data ) {
				    $query_parts[] = "('" . $userrole['group_id'] . "', '" . $data . "', '" . $username . "', '" . $t . "')";
				}
				$sql2 = "INSERT INTO user_group_func (group_id, func_code, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->execute();
				$userrole['group_func_id'] = $db->lastInsertId();
			}
		}
		$db->commit();
		$db = null;
		if($userrole['group_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing added. [ErrCode=11002]');
			$returnData = array('message' => 'Fail', 'code' => '11002');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11010] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11010');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11003] '.$e);
			$returnData = array('message' => 'Fail','code' => '11003');
			return $response->withJson($returnData,400);
    	}
	}
};

function editUserrole (Request $request, Response $response, array $args){
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

	$userrole = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $userrole);

	$sql = "UPDATE user_group SET group_name = :group_name, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE company_id = :company_id AND group_id = :group_id AND version = :version";

	$sql2 = "SELECT func_code FROM user_group_func WHERE group_id = :group_id";

	try{
		$db = $container->db;
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("group_name", $userrole['group_name']);
		$stmt->bindParam("group_id", $userrole['group_id']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $userrole['version']);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count==1){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("group_id", $userrole['group_id']);
			$stmt->execute();
			$userFunc = $stmt->fetchAll(PDO::FETCH_COLUMN);
			$insertFunc = array_diff($userrole['userFunc'], $userFunc);
			$deleteFunc = array_diff($userFunc, $userrole['userFunc']);
			if($insertFunc){
				$query_parts = array();
				foreach( $insertFunc as $data ) {
				    $query_parts[] = "('" . $userrole['group_id'] . "', '" . $data . "', '" . $username . "', '" . $t . "')";
				}
				$sql3 = "INSERT INTO user_group_func (group_id, func_code, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->execute();
			}
			if($deleteFunc){
				$query_parts = implode("','", $deleteFunc);
				$sql4 = "DELETE FROM user_group_func WHERE group_id = :group_id AND func_code IN ('".$query_parts."')";
				$stmt = $db->prepare($sql4, $prepOpts);
				$stmt->bindParam("group_id", $userrole['group_id']);
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
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11004]');
			$returnData = array('message' => 'Fail','code'=>'11004');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11011] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11011');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11005] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11005');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteUserrole (Request $request, Response $response, array $args){
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

	$userrole = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $userrole);

	$sql = "SELECT group_id FROM user_account WHERE group_id = :group_id";

	$sql2 = "DELETE FROM user_group_func WHERE group_id = :group_id";

	$sql3 = "DELETE FROM user_group WHERE group_id = :group_id AND company_id = :company_id";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("group_id", $licence['group_id']);
		$stmt->execute();
		$userroleData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if(!$userroleData){
			$db = $container->db;
			$db->beginTransaction();
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("group_id", $userrole['group_id']);
			$result = $stmt->execute();
			if($result){
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->bindParam("group_id", $userrole['group_id']);
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
					$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=11006]');
					$returnData = array('message' => 'Fail', 'code' => '11006');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] delete func fail. [ErrCode=11008]');
				$returnData = array('message' => 'Fail','code'=>'11008');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11007]');
			$returnData = array('message' => 'Fail', 'code' => '11007');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11009] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '11009');
		return $response->withJson($returnData,400);
	}
};