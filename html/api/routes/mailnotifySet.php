<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:49
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/mailNotifySet', function() {
/**
 * @api {get} /api/mailNotifySet Get Email Notification List
 * @apiName MAILNOTIFY - GET MAILNOTIFY
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of notification item
 * @apiSuccess {String} data.notifyItem Notification item [notify_item]
 * @apiSuccess {String} data.notifyItemId Notification item id [mail_notify_id]
 * @apiSuccess {Array[]} data.notifyEmail Notification receiver [notify_email]
 * @apiSuccess {String} data.status Notification status [status]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "notifyEmail": ["aa@testing.com", "bb@testing.com", "cc@testing.com"],
 *              "notifyItem": "veh_offline_report",
 *              "notifyItemId": 1,
 *              "status": "OFF",
 *              "updated_by": "2019-01-18 15:10:38 (zilvia)",
 *              "version": "2"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11901 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->get('', 'getMailNotify')->setName('MAILNOTIFY - GET MAILNOTIFY');
/**
 * @api {patch} /api/mailNotifySet Edit Email Notification
 * @apiName MAILNOTIFY - EDIT MAILNOTIFY
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} mail_notify_id Notification item id
 * @apiParam (Request Body) {Array} notifyEmail Notification receiver
 * @apiParam (Request Body) {String="A","I"} status Notification status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11902 No record affected
 * @apiError (400) UpdateFailure_11903 MySql error (duplicate key)
 * @apiError (400) InternalError_11904 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
    $this->patch('', 'editMailNotify')->setName('MAILNOTIFY - EDIT MAILNOTIFY');
});

/**
 * @api {patch} /api/mailNotifyStatus Set Email Notification Status
 * @apiName MAILNOTIFY - SET MAILNOTIFY STATUS
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} mail_notify_id Notification item id
 * @apiParam (Request Body) {String="A","I"} status Notification status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11905 No record affected
 * @apiError (400) UpdateFailure_11906 MySql error (duplicate key)
 * @apiError (400) InternalError_11907 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->patch('/mailNotifyStatus', 'setMailNotifyStatus')->setName('MAILNOTIFY - SET MAILNOTIFY STATUS');

function getMailNotify (Request $request, Response $response, array $args){
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

	$sql = "SELECT item.mail_notify_id AS notifyItemId, item.notify_item AS notifyItem, mail.notify_email AS notifyEmail, item.status AS status, item.version AS version, case item.update_user when 'System' then CONVERT(VARCHAR,ISNULL(item.update_ts,''),120)+' (SYSTEM)' else CONVERT(VARCHAR,ISNULL(item.update_ts,''),120)+' ('+ISNULL(item.update_user,'')+')' end AS updated_by FROM mail_notify AS item LEFT JOIN mail_notify_email AS mail ON item.mail_notify_id = mail.mail_notify_id WHERE item.company_id = :company_id ORDER BY item.mail_notify_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$mailnotifyDataTMP = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		if($mailnotifyDataTMP){
			$itemList = [];
			$mailnotifyData = [];
			for($i=0;$i<count($mailnotifyDataTMP);$i++){
				$index = array_search($mailnotifyDataTMP[$i]->notifyItemId,$itemList);
				if($index!==false){
					if($mailnotifyDataTMP[$i]->notifyEmail!==null){
						array_push($mailnotifyData[$index]['notifyEmail'], $mailnotifyDataTMP[$i]->notifyEmail);
					}
				}
				else{
					array_push($itemList,$mailnotifyDataTMP[$i]->notifyItemId);
					if($mailnotifyDataTMP[$i]->notifyEmail!==null){
						array_push($mailnotifyData,array('notifyItemId' => (float)$mailnotifyDataTMP[$i]->notifyItemId,'notifyItem'=> $mailnotifyDataTMP[$i]->notifyItem,'updated_by' => $mailnotifyDataTMP[$i]->updated_by,'version'=> $mailnotifyDataTMP[$i]->version,'status'=> $mailnotifyDataTMP[$i]->status,'notifyEmail'=>[$mailnotifyDataTMP[$i]->notifyEmail]));
					}
					else{
						array_push($mailnotifyData,array('notifyItemId' => (float)$mailnotifyDataTMP[$i]->notifyItemId,'notifyItem'=> $mailnotifyDataTMP[$i]->notifyItem,'updated_by' => $mailnotifyDataTMP[$i]->updated_by,'version'=> $mailnotifyDataTMP[$i]->version,'status'=> $mailnotifyDataTMP[$i]->status,'notifyEmail'=>[]));
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $mailnotifyData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11901] '.$e);
		$returnData = array('message' => 'Fail','code' => '11901');
		return $response->withJson($returnData,400);
	}

};

function editMailNotify (Request $request, Response $response, array $args){
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

	$mailnotify = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $mailnotify);

	$sql = "UPDATE mail_notify SET status = :status, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE company_id = :company_id AND mail_notify_id = :mail_notify_id AND version = :version";

	$sql2 = "SELECT notify_email FROM mail_notify_email WHERE mail_notify_id = :mail_notify_id";

	try{
		$db = $container->db;
		$db->beginTransaction();
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("status", $mailnotify['status']);
		$stmt->bindParam("mail_notify_id", $mailnotify['mail_notify_id']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $mailnotify['version']);
		$stmt->execute();
		$count = $stmt->rowCount();
		if($count==1){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("mail_notify_id", $mailnotify['mail_notify_id']);
			$stmt->execute();
			$notifyEmail = $stmt->fetchAll(PDO::FETCH_COLUMN);
			$insertEmail = array_diff($mailnotify['notifyEmail'], $notifyEmail);
			$deleteEmail = array_diff($notifyEmail, $mailnotify['notifyEmail']);
			if($insertEmail){
				$query_parts = array();
				foreach( $insertEmail as $data ) {
				    $query_parts[] = "('" . $mailnotify['mail_notify_id'] . "', '" . $data . "', '" . $username . "', '" . $t . "')";
				}
				$sql3 = "INSERT INTO mail_notify_email (mail_notify_id, notify_email, create_user, create_ts) VALUES ".implode(',', $query_parts);
				$stmt = $db->prepare($sql3, $prepOpts);
				$stmt->execute();
			}
			if($deleteEmail){
				$query_parts = implode("','", $deleteEmail);
				$sql4 = "DELETE FROM mail_notify_email WHERE mail_notify_id = :mail_notify_id AND notify_email IN ('".$query_parts."')";
				$stmt = $db->prepare($sql4, $prepOpts);
				$stmt->bindParam("mail_notify_id", $mailnotify['mail_notify_id']);
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
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11902]');
			$returnData = array('message' => 'Fail','code'=>'11902');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$db->rollback();
		$db = null;
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11903] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11903');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11904] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11904');
			return $response->withJson($returnData,400);
    	}
	}
};

function setMailNotifyStatus (Request $request, Response $response, array $args){
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

	$mailnotify = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $mailnotify);

	$sql = "UPDATE mail_notify SET status = :status, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE company_id = :company_id AND mail_notify_id = :mail_notify_id AND version = :version";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$t=date("Y-m-d H:i:s");
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("status", $mailnotify['status']);
		$stmt->bindParam("mail_notify_id", $mailnotify['mail_notify_id']);
		$stmt->bindParam("update_user", $username);
		$stmt->bindParam("update_ts", $t);
		$stmt->bindParam("version", $mailnotify['version']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;
		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=11905]');
			$returnData = array('message' => 'Fail','code'=>'11905');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		if($e->getCode() == '23000'){
    		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11906] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11906');
			return $response->withJson($returnData,400);
    	}
    	else{
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11907] '.$e);
			$returnData = array('message' => 'Fail', 'code' => '11907');
			return $response->withJson($returnData,400);
    	}
	}
};