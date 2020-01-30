<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:53
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/orgchartSet', function() {
/**
 * @api {get} /api/orgchartSet Get Department List
 * @apiName ORGCHART - GET ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of departments
 * @apiSuccess {String} data.department Department name [title]
 * @apiSuccess {String} data.descpt Department description [descpt]
 * @apiSuccess {String} data.id Department id [ou_id]
 * @apiSuccess {Object[]} data.parentData Parent Department data
 * @apiSuccess {String} data.parentData.parent_id Parent Department id [ou_id]
 * @apiSuccess {String} data.parentData.parent_descpt Parent Department title [title]
 * @apiSuccess {Boolean} data.showFunc Display function
 * @apiSuccess {Object[]} data.children List of children departments data
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "department": "Root"
 *              "descpt": "root"
 *              "id": "5"
 *              "parentData": {
 *                  "parent_id": null,
 *                  "parent_descpt": null
 *              },
 *              "showFunc": false,
 *              "children": [],
 *              "updated_by": "2018-09-24 13:11:32 (admin)",
 *              "version": "1"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11702 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getOrgchart')->setName('ORGCHART - GET ORGCHART');
/**
 * @api {post} /api/orgchartSet Add Department
 * @apiName ORGCHART - ADD ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} department Department name
 * @apiParam (Request Body) {String} descpt Department description
 * @apiParam (Request Body) {String} parent_id Parent department id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11703 No record affected
 * @apiError (400) UpdateFailure_11704 MySql error (duplicate key)
 * @apiError (400) InternalError_11705 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->post('', 'addOrgchart')->setName('ORGCHART - ADD ORGCHART');
/**
 * @api {patch} /api/orgchartSet Edit Department
 * @apiName ORGCHART - EDIT ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} id Department id
 * @apiParam (Request Body) {String} department Department name
 * @apiParam (Request Body) {String} descpt Department description
 * @apiParam (Request Body) {String} parent_id Parent department id
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11706 No record affected
 * @apiError (400) UpdateFailure_11707 MySql error (duplicate key)
 * @apiError (400) InternalError_11708 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editOrgchart')->setName('ORGCHART - EDIT ORGCHART');
/**
 * @api {delete} /api/orgchartSet Delete Department
 * @apiName ORGCHART - DELETE ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} id Department id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11709 No record affected
 * @apiError (400) UpdateFailure_11710 Link records exist
 * @apiError (400) InternalError_11711 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->delete('', 'deleteOrgchart')->setName('ORGCHART - DELETE ORGCHART');
});

/**
 * @api {get} /api/orgchartAddLL Get Department List (Organization Chart Dialog)
 * @apiName ORGCHART - GET DEPARTMENTS
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of departments
 * @apiSuccess {String} data.parent_descpt Department name [title]
 * @apiSuccess {String} data.parent_id Department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "parent_descpt": "8",
 *              "parent_id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11701 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/orgchartAddL/{id}', 'getOrgchartAddL')->setName('ORGCHART - GET DEPARTMENTS');

function getOrgchart (Request $request, Response $response, array $args){
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

	$sql = "SELECT ou_id, parent_id FROM org_chart WHERE company_id = :company_id AND ou_id = :ou_id";
	$sql2 = "SELECT ori.ou_id AS id, ori.title AS department, ori.descpt, ori.parent_id, parent.title AS parent_descpt, ori.version, case ori.update_user when 'System' then CONVERT(VARCHAR,ISNULL(ori.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(ori.update_ts,''),120)+' ('+ISNULL(ori.update_user,'')+')' end AS updated_by FROM org_chart AS ori LEFT JOIN org_chart AS parent ON ori.parent_id = parent.ou_id WHERE ori.company_id = :company_id AND ori.ou_id IN ('".$oc_list."') ORDER BY ori.descpt ASC";

	function getNestedChildren($arr, $parent) {
	    $out = [];
	    foreach($arr as $i => $item) {
	        if($arr[$i]['parentData']['parent_id'] == $parent) {
	            $children = getNestedChildren($arr, $arr[$i]['id']);

	            if(count($children)) {
	                $arr[$i]['children'] = $children;
	            }
	            array_push($out,$arr[$i]);
	        }
	    }
	    return $out;
	}

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("ou_id", $ou_id);
		$stmt->execute();
		$startParent = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;
		if($startParent){
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$prepData = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($prepData){
				foreach ($prepData as $key => $value) {
					$prepData[$key]['parentData'] = array('parent_id'=>$prepData[$key]['parent_id'],'parent_descpt'=>$prepData[$key]['parent_descpt']);
					unset($prepData[$key]['parent_id']);
					unset($prepData[$key]['parent_descpt']);
					$prepData[$key]['showFunc'] = false;
				}
				$result = getNestedChildren($prepData,$startParent->parent_id);
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => $result);
				return $response->withJson($returnData);
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11702] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '11702');
		return $response->withJson($returnData,400);
	}
};

function addOrgchart (Request $request, Response $response, array $args){
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

	$ou = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $ou);

	$sql = "INSERT INTO org_chart (company_id, parent_id, title, descpt, update_user, update_ts, create_user, create_ts, version) VALUES (:company_id, :parent_id, :department, :descpt, :update_user, :update_ts, :create_user, :create_ts, :version)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$a="0";
		$stmt->bindParam("parent_id", $ou['parent_id']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("department", $ou['department']);
		$stmt->bindParam("descpt", $ou['descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("create_user", $username);
		$stmt->bindParam("create_ts", $t);
		$stmt->bindParam("version", $a);
		$stmt->execute();
		$ou['ou_id'] = $db->lastInsertId();
		$db = null;
		if($ou['ou_id']){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			array_push($_SESSION['user']->oc_list, (string)$ou['ou_id']);
			$departmentlist = array_merge(array(), $_SESSION['user']->departments);
			array_push($departmentlist, array('id'=>(string)$ou['ou_id'],'department'=>$ou['department']));
			$departmentlist = array_values($departmentlist);
			usort($departmentlist, function($a, $b) {
  				return $a['department'] <=> $b['department'];
 			});
 			$_SESSION['user']->departments = $departmentlist;
			$container->logger->info('['.$routename.'] session variable updated.', array('oc_list'=>$_SESSION['user']->oc_list,'departments'=>$_SESSION['user']->departments));
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing added. [ErrCode=11703]');
			$returnData = array('message' => 'Fail', 'code' => '11703');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11704] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11704');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11705] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11705');
			return $response->withJson($returnData,400);
		}
	}
};

function editOrgchart (Request $request, Response $response, array $args){
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

	$ou = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $ou);

	$sql = "UPDATE org_chart SET parent_id = :parent_id, title = :department, descpt = :descpt, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE ou_id = :id AND version = :version AND company_id = :company_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("parent_id", $ou['parent_id']);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("department", $ou['department']);
		$stmt->bindParam("descpt", $ou['descpt']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $ou['version']);
		$stmt->bindParam("id", $ou['id']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;

		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			$departmentlist = array_merge(array(), $_SESSION['user']->departments);
			if(($idx= array_search($ou['id'], array_column($departmentlist, 'id')))!== FALSE){
				unset($departmentlist[$idx]);
			};
			array_push($departmentlist, array('id'=>(string)$ou['id'],'department'=>$ou['department']));
			$departmentlist = array_values($departmentlist);
			usort($departmentlist, function($a, $b) {
  				return $a['department'] <=> $b['department'];
 			});
 			$_SESSION['user']->departments = $departmentlist;
 			$container->logger->info('['.$routename.'] session variable updated.', array('departments'=>$_SESSION['user']->departments));
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11706]');
			$returnData = array('message' => 'Fail','code'=>'11706');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11707] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11707');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11708] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11708');
			return $response->withJson($returnData,400);
		}
	}
};

function deleteOrgchart (Request $request, Response $response, array $args){
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

	$ou = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $ou);

	try {
		$prepList = array();
		$prepList += [$ou['id']];
		$arrtmp = $prepList;
		$donePrep = false;
		while (!$donePrep) {
			$query_parts = implode("','", $arrtmp);
			$sql = "SELECT ou_id FROM org_chart WHERE company_id = :company_id AND parent_id IN ('".$query_parts."')";
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
			$db = null;
			if($ids){
				$arrtmp = $ids;
				$prepList = array_unique(array_merge($prepList,$ids));
				unset($ids);
			}
			else{
				$donePrep = true;
			}
		}
		$query_parts2 = implode("','", $prepList);
		$sql2 = "SELECT user_id FROM user_account WHERE company_id = :company_id AND ou_id IN ('".$query_parts2."')";
		$sql3 = "SELECT driver_id FROM driver WHERE company_id = :company_id AND ou_id IN ('".$query_parts2."')";
		$sql4 = "SELECT drv_grp_id FROM driver_group WHERE company_id = :company_id AND ou_id IN ('".$query_parts2."')";
		$sql5 = "SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$query_parts2."')";
		$sql6 = "SELECT vrm_grp_id FROM vehicle_group WHERE company_id = :company_id AND ou_id IN ('".$query_parts2."')";

		$db = $container->db;
		$stmt = $db->prepare($sql2, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$userData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;

		if($userData){
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$stmt = $db->prepare($sql3, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$drvData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;

		if($drvData){
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$stmt = $db->prepare($sql4, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$drvgrpData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;

		if($drvgrpData){
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$stmt = $db->prepare($sql5, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$vehData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;

		if($vehData){
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}

		$db = $container->db;
		$stmt = $db->prepare($sql6, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$vehgrpData = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;

		if($vehgrpData){
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}

		if(!$userData&&!$drvData&&!$drvgrpData&&!$vehData&&!$vehgrpData){
			$query_parts3 = implode("','", $prepList);
			$sql8 = "DELETE FROM org_chart WHERE company_id = :company_id AND ou_id IN ('".$query_parts3."')";
			$db = $container->db;
			$stmt = $db->prepare($sql8, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$count = $stmt->rowCount();
			$db = null;
			if($count>0){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				$oc_list = array_values(array_diff($_SESSION['user']->oc_list, $prepList));
				$_SESSION['user']->oc_list = $oc_list;
				$departmentlist = array_merge(array(), $_SESSION['user']->departments);
				$rmdepartments = array();
				foreach ($departmentlist as $key => $value) {
					if(($idx= array_search($departmentlist[$key]['id'], $prepList))!== FALSE){
						array_push($rmdepartments, $key);
					}
				}
				foreach ($rmdepartments as $key => $value) {
					unset($departmentlist[$value]);
				}
				$departmentlist = array_values($departmentlist);
				usort($departmentlist, function($a, $b) {
	  				return $a['department'] <=> $b['department'];
	 			});
				$_SESSION['user']->departments = $departmentlist;
				$container->logger->info('['.$routename.'] session variable updated.', array('oc_list'=>$_SESSION['user']->oc_list,'departments'=>$_SESSION['user']->departments));
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing deleted. [ErrCode=11709]');
				$returnData = array('message' => 'Fail', 'code' => '11709');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] link records exist. [ErrCode=11710]');
			$returnData = array('message' => 'Fail', 'code' => '11710');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11711] '.$e);
		$returnData = array('message' => 'Fail', 'code' => '11711');
		return $response->withJson($returnData,400);
	}
};

function getOrgchartAddL (Request $request, Response $response, array $args){
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

	$edit_ou = $args['id'];

	$sql = "SELECT title AS parent_descpt, ou_id AS parent_id FROM org_chart WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') AND ou_id <> :ou_id ORDER BY title ASC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("ou_id", $edit_ou);
		$stmt->execute();
		$departmentData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($departmentData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $departmentData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11701] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11701');
		return $response->withJson($returnData,400);
	}
};