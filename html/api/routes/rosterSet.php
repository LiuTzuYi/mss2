<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:06
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {post} /api/roster Import roster
 * @apiName ROSTER
 * @apiGroup RosterSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {Boolean=true,false} checkDriver Check if driver exists
 * @apiParam (Request Body) {Boolean=true,false} checkLicPlate Check if licence plate exists
 * @apiParam (Request Body) {String} roster Roster
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Response message from external call
 * @apiSuccess {Number} data.totalRead Total number of import records
 * @apiSuccess {String} data.status Import status
 * @apiSuccess {Object[]} data.result List of update messages
 * @apiSuccess {Object[]} data.result.x Update message for line x
 * @apiSuccess {Number} data.result.x.tripCnt Number of trip updated for line x
 * @apiSuccess {Number} data.result.x.warnCnt Number of warning updated for line x
 * @apiSuccess {String} data.result.x.reason Error message for line x
 * @apiSuccess {String} data.result.x.errCode Error code for line x
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "totalRead": 1,
 *              "status": "fail",
 *              "result": {
 *                  "1": {
 *                      "tripCnt": 0,
 *                      "warnCnt": 0
 *                  }
 *              }
 *          }
 *      ]
 *  }
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "totalRead": 1,
 *              "status": "success",
 *              "result": {
 *                  "1": {
 *                      "reason": "Invalid driver name or driver code.",
 *                      "errCode": "ERR_0003"
 *                  }
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11101 Call server error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/roster', 'postRoster')->setName('ROSTER');

function postRoster (Request $request, Response $response, array $args){
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

	$sql = "SELECT vrm_id, vrm_mark_code FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY vrm_id ASC";

	$sql1 = "SELECT driver_id, driver_code FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY driver_id ASC";

	$sql2 = "UPDATE veh_trip SET driver_id = :drv_id, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE vrm_id = :vrm_id AND start_time >= :start_time AND end_time <= :end_time";

	$sql3 = "UPDATE log_data SET driver_id = :drv_id, update_ts = :update_ts, update_user = :update_user, version = version+1 WHERE vrm_id = :vrm_id AND start_time >= :start_time AND end_time <= :end_time";

	try{
		$errorValid = true;
		$error = array();
		$importArr = array();
		$t=date("Y-m-d H:i:s");
		$totalRead = 0;
		$result = array();

		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$vehInComp = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		$db = $container->db;
		$stmt = $db->prepare($sql1, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$drvInComp = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;

		if($vehInComp&&$drvInComp){
			foreach( $import['roster'] as $key => $data ) {
				$matchVeh = true;
				$matchDrv = true;

				$row = str_getcsv($data);

				if(($idxVeh = array_search($row[0], array_column($vehInComp, 'vrm_mark_code')))=== FALSE){
					$matchVeh = false;
					$errorValid = false;
					$result[$key+1] = array('errCode' => 'ERR_0001');
				}
				else if(($idxDrv = array_search($row[1], array_column($drvInComp, 'driver_code')))=== FALSE){
					$matchDrv = false;
					$errorValid = false;
					$result[$key+1] = array('errCode' => 'ERR_0002');
				}

				if($matchVeh&&$matchDrv){
					$date = new DateTime($row[2]);
					$starttime = $date->format('Y-m-d H:i:s');
					$date->setTime(23,59,59);
					$endtime = $date->format('Y-m-d H:i:s');
					array_push($importArr,array($vehInComp[$idxVeh]['vrm_id'],$drvInComp[$idxDrv]['driver_id'],$starttime,$endtime));
				}

				$totalRead++;
			}

			if($errorValid){
				$db = $container->db;
				$db->beginTransaction();
				$totalUpdated = 0;
				foreach( $importArr as $key => $data ) {
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->bindParam("vrm_id", $data[0]);
					$stmt->bindParam("drv_id", $data[1]);
					$stmt->bindParam("start_time", $data[2]);
					$stmt->bindParam("end_time", $data[3]);
					$stmt->bindParam("update_user", $_SESSION['user']->username);
					$stmt->bindParam("update_ts", $t);
					$exec = $stmt->execute();
					if($exec){
						$count = $stmt->rowCount();
						$stmt = $db->prepare($sql3, $prepOpts);
						$stmt->bindParam("vrm_id", $data[0]);
						$stmt->bindParam("drv_id", $data[1]);
						$stmt->bindParam("start_time", $data[2]);
						$stmt->bindParam("end_time", $data[3]);
						$stmt->bindParam("update_user", $_SESSION['user']->username);
						$stmt->bindParam("update_ts", $t);
						$exec2 = $stmt->execute();
						if($exec2){
							$count2 = $stmt->rowCount();
							$result[$key+1] = array('tripCnt' => $count, 'warnCnt' => $count2);
							$totalUpdated++;
						}
						else{
							array_push($error, $key+1);
						}
					}
					else{
						array_push($error, $key+1);
					}
				}

				if(count($error)===0){
					$db->commit();
					$db = null;
					$container->logger->info('['.$routename.'] Success.');
					$resultData = array('status' => 'success', 'totalRead' => $totalUpdated, 'result' => $result);
					$returnData = array('message' => 'Success','data' => $resultData);
					return $response->withJson($returnData);
				}
				else{
					$db->rollback();
					$db = null;
					$error = __consecutiveArray($error);
					$container->logger->info('['.$routename.'] some record not updated. [ErrCode=11806]');
					$returnData = array('message' => 'Fail','code'=>'11806','data'=>$error);
					return $response->withJson($returnData,400);
				}
			}
			else{
				$container->logger->info('['.$routename.'] some vehicle/driver not exist in company or department. [ErrCode=11807]');
				$resultData = array('status' => 'fail', 'totalRead' => $totalRead, 'result' => $result);
				$returnData = array('message' => 'Fail','data' => $resultData);
				return $response->withJson($returnData);
			}
		}
		else if($vehInComp){
			$container->logger->info('['.$routename.'] no vehicle exist in company or department. [ErrCode=11808');
			$returnData = array('message' => 'Fail','code'=>'11808');
			return $response->withJson($returnData,400);
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