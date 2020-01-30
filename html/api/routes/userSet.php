<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:35
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/userSet', function() {
/**
 * @api {get} /userSet Get User
 * @apiName USER - GET USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of user
 * @apiSuccess {Object} data.department Department Object
 * @apiSuccess {String} data.department.department Name of department
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.email User email
 * @apiSuccess {String} data.fullName User name
 * @apiSuccess {Object} data.groupname Group information object
 * @apiSuccess {String} data.groupname.group_id Group ID
 * @apiSuccess {String} data.groupname.groupname Group Name
 * @apiSuccess {String} data.lang Language
 * @apiSuccess {String} data.lastLogin Last login timestamp
 * @apiSuccess {String} data.map Map
 * @apiSuccess {Number} data.retryLogin Number of login retry
 * @apiSuccess {String} data.status Account status
 * @apiSuccess {String} data.updated_by Update timestamp
 * @apiSuccess {Number} data.userId User ID
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List Objects
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "version":"0",
 *              "userId":1,
 *              "username":"antonio",
 *              "fullName":"Antonio Wong",
 *              "lang":"en",
 *              "map":"googleMap",
 *              "lastLogin":"2018-12-12 14:00:52",
 *              "retryLogin":0,
 *              "status":"A",
 *              "email":null,
 *              "updated_by":"2019-01-14 13:17:05 (SYSTEM)",
 *              "groupname":
 *                  {
 *                      "groupname":"test permission",
 *                      "group_id":"139"
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
 *              "department":"lv2 u6",
 *              "id":"49"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10902 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getUser')->setName('USER - GET USER');
/**
 * @api {post} /userSet Add user
 * @apiName USER - ADD USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} username Username
 * @apiParam (Request Body) {String} password Password
 * @apiParam (Request Body) {String} fullname Fullname
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} map Map
 * @apiParam (Request Body) {String} status Status
 * @apiParam (Request Body) {String} email Email
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10903 Fail (no row affected)
 * @apiError (400) InternalError_10904 SQL error
 * @apiError (400) UpdateFailure_10909 Username already exist
 * @apiError (400) UpdateFailure_10910 Add password history fail
 * @apiError (400) UpdateFailure_10911 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->post('', 'addUser')->setName('USER - ADD USER');
/**
 * @api {patch} /userSet Edit user
 * @apiName USER - EDIT USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} user_id User ID
 * @apiParam (Request Body) {String} fullname Fullname
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} map Map
 * @apiParam (Request Body) {String} status Status
 * @apiParam (Request Body) {String} email Email
 * @apiParam (Request Body) {String} version Version
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10905 Fail (no row affected)
 * @apiError (400) InternalError_10906 SQL error
 * @apiError (400) UpdateFailure_10912 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editUser')->setName('USER - EDIT USER');
/**
 * @api {delete} /userSet Delete user
 * @apiName USER - DELETE USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} user_id User ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10907 Fail (no row affected)
 * @apiError (400) InternalError_10908 SQL errors
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->delete('', 'deleteUser')->setName('USER - DELETE USER');
});
/**
 * @api {get} /userAddL Get User Groups and Departments
 * @apiName USER - GET USER GRPS & DEPARTMENTS
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} group_id Status message
 * @apiSuccess {Object[]} data Group data
 * @apiSuccess {String} data.groupname Group name
 * @apiSuccess {String} data.group_id Group ID
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupname":"ADVANCED USER",
 *              "group_id":"138"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10901 SQL errors
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/userAddL', 'getUserAddL')->setName('USER - GET USER GRPS & DEPARTMENTS');

function getUserAddL (Request $request, Response $response, array $args){
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

	$sql = "SELECT group_name AS groupname, group_id AS group_id FROM user_group WHERE company_id = :company_id ORDER BY groupname ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$usergrpData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($usergrpData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $usergrpData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10901] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10901');
		return $response->withJson($returnData,400);
	}

};

function getUser (Request $request, Response $response, array $args){
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

	$sql = "SELECT users.version AS version, users.user_id AS userId, users.username AS username, users.fullname AS fullName, users.group_id AS groupidtmp, grp.group_name AS groupnametmp, users.lang AS lang, users.map AS map, users.last_login_ts AS lastLogin, users.retry_count AS retryLogin, users.status AS status, users.email AS email, users.ou_id AS departmentidtmp, org.title AS departmenttmp, case users.update_user when 'System' then CONVERT(VARCHAR,ISNULL(users.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(users.update_ts,''),120)+' ('+ISNULL(users.update_user,'')+')' end AS updated_by FROM user_account AS users LEFT JOIN user_group AS grp ON users.group_id = grp.group_id LEFT JOIN org_chart AS org ON users.ou_id = org.ou_id WHERE users.company_id = :company_id AND users.ou_id IN ('".$oc_list."') ORDER BY users.user_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$userData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($userData){
			for($i=0;$i<count($userData);$i++){
				$userData[$i]['groupname'] = array('groupname' => $userData[$i]['groupnametmp'], 'group_id' => $userData[$i]['groupidtmp']);
				$userData[$i]['department'] = array('department' => $userData[$i]['departmenttmp'], 'id' => $userData[$i]['departmentidtmp']);
				if($userData[$i]['retryLogin']!==null){
					$userData[$i]['retryLogin'] = (float)$userData[$i]['retryLogin'];
				}
				$userData[$i]['userId'] = (float)$userData[$i]['userId'];
				unset($userData[$i]['groupnametmp']);
				unset($userData[$i]['groupidtmp']);
				unset($userData[$i]['departmentidtmp']);
				unset($userData[$i]['departmenttmp']);
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $userData,'departments' => $departments);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'departments' => $departments);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10902] '.$e);
		$returnData = array('message' => 'Fail','code' => '10902');
		return $response->withJson($returnData,400);
	}
};

function addUser (Request $request, Response $response, array $args){
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

	$user = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $user);

	$sql = "SELECT user_id FROM user_account WHERE username = :username COLLATE Latin1_General_Bin AND company_id = :company_id COLLATE Latin1_General_Bin";

	$sql2 = "INSERT INTO user_account (username, password, fullname, company_id, group_id, ou_id, lang, map, status, email, create_ts, create_user, update_ts, update_user, version) VALUES (:username, :password, :fullname, :company_id, :group_id, :ou_id, :lang, :map, :status, :email, :create_ts, :create_user, :update_ts, :update_user, :version)";

	$sql3 = "SELECT pwd_history FROM company WHERE company_id = :company_id";

	$sql4 = "INSERT INTO user_pwd_history (user_id, seq_num, password, update_ts) VALUES (:user_id, :seq_num, :password, :update_ts)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("username", $user['username']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$userExist = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		if($userExist){
			$container->logger->warning('['.$routename.'] username already exist. [ErrCode=10909]');
			$returnData = array('message' => 'Fail', 'code' => '10909');
			return $response->withJson($returnData,400);
		}
		else{
			$db = $container->db;
			$t=date("Y-m-d H:i:s");
			$a="0";
			$salt = sha1($user['password'].$user['password']);
			$pwdencrypt = sha1($salt.$user['password']);
			$db->beginTransaction();
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("username", $user['username']);
			$stmt->bindParam("password", $pwdencrypt);
			$stmt->bindParam("fullname", $user['fullname']);
			$stmt->bindParam("company_id", $company_id);
			$stmt->bindParam("group_id", $user['group_id']);
			$stmt->bindParam("ou_id", $user['ou_id']);
			$stmt->bindParam("lang", $user['lang']);
			$stmt->bindParam("map", $user['map']);
			$stmt->bindParam("status", $user['status']);
			$stmt->bindParam("email", $user['email']);
			$stmt->bindParam("create_ts", $t);
			$stmt->bindParam("create_user", $username);
			$stmt->bindParam("update_ts", $t);
			$stmt->bindParam("update_user", $username);
			$stmt->bindParam("version", $a);
			$stmt->execute();
			$user['user_id'] = $db->lastInsertId();
			if($user['user_id']){
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$hashistory = $stmt->fetch(PDO::FETCH_COLUMN);
				if($hashistory!=0){
					$stmt = $db->prepare($sql4, $prepOpts);
					$seq_num = 1;
					$stmt->bindParam("password", $pwdencrypt);
					$stmt->bindParam("update_ts", $t);
					$stmt->bindParam("user_id", $user['user_id']);
					$stmt->bindParam("seq_num", $seq_num);
					$stmt->execute();
					$pwdhistory = $stmt->rowCount();
					if($pwdhistory==1){
						$db->commit();
						$db = null;
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success');
						return $response->withJson($returnData);
					}
					else{
						$db->rollback();
						$db = null;
						$container->logger->warning('['.$routename.'] add password history fail. [ErrCode=10910]');
						$returnData = array('message' => 'Fail', 'code' => '10910');
						return $response->withJson($returnData,400);
					}
				}
				else{
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success');
					return $response->withJson($returnData);
				}
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] nothing added. [ErrCode=10903]');
				$returnData = array('message' => 'Fail', 'code' => '10903');
				return $response->withJson($returnData,400);
			}
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10911] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10911');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10904] '.$e);
			$returnData = array('message' => 'Fail','code' => '10904');
			return $response->withJson($returnData,400);
    	}
	}
};

function editUser (Request $request, Response $response, array $args){
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

	$user = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $user);

	$sql = "UPDATE user_account SET group_id = :group_id, ou_id = :ou_id, fullname = :fullname, lang = :lang, map = :map, status = :status, email = :email, version = version+1, update_ts = :update_ts, update_user = :update_user WHERE user_id = :user_id AND version = :version AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("user_id", $user['user_id']);
		$stmt->bindParam("fullname", $user['fullname']);
		$stmt->bindParam("group_id", $user['group_id']);
		$stmt->bindParam("ou_id", $user['ou_id']);
		$stmt->bindParam("lang", $user['lang']);
		$stmt->bindParam("map", $user['map']);
		$stmt->bindParam("status", $user['status']);
		$stmt->bindParam("email", $user['email']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("version", $user['version']);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("update_user", $username);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;
		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10905]');
			$returnData = array('message' => 'Fail','code'=>'10905');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10912] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10912');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10906] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '10906');
			return $response->withJson($returnData,400);
    	}
	}
};

function deleteUser (Request $request, Response $response, array $args){
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

	$user = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $user);

	$sql = "DELETE FROM user_account WHERE user_id = :user_id AND company_id = :company_id AND ou_id IN ('".$oc_list."')";

	try {
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("user_id", $user['user_id']);
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
			$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=10907]');
			$returnData = array('message' => 'Fail', 'code' => '10907');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10908] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '10908');
		return $response->withJson($returnData,400);
	}
};