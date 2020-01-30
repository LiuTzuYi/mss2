<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-14 18:32:38
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/liveLocation/:map Get Live Location
 * @apiName LIVELOCATION
 * @apiGroup LiveLocation
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of vehicle's live location
 * @apiSuccess {String} data.brand Vehicle brand [brand]
 * @apiSuccess {String} data.model Vehicle model [model]
 * @apiSuccess {String} data.department Vehicle department name [title]
 * @apiSuccess {String} data.driver Vehicle current driver data [name,title]
 * @apiSuccess {String} data.last_loc_update_ts Last GPS update timestamp (last_loc_update_ts)
 * @apiSuccess {String} data.last_loc_update_ts_utc Last GPS update timestamp millionseconds (last_loc_update_ts)
 * @apiSuccess {Number} data.lat Latitude [lat]
 * @apiSuccess {Number} data.lng Longitude [lng]
 * @apiSuccess {String} data.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.runStatus Vehicle running status (GPS) [last_loc_update_ts]
 * @apiSuccess {String} data.sn Vehicle device sn [md_sn]
 * @apiSuccess {String} data.type Vehicle type [veh_type_code]
 * @apiSuccess {Object[]} dataCnt Vehicle running status (GPS) count
 * @apiSuccess {Number} dataCnt.offline Count for offline (1-4 days) [last_loc_update_ts]
 * @apiSuccess {Number} dataCnt.offlinegt Count for offline (>4 days) [last_loc_update_ts]
 * @apiSuccess {Number} dataCnt.online Count for online (<24 hours) [last_loc_update_ts]
 * @apiSuccess {Object[]} deviceCnt Vehicle device status count
 * @apiSuccess {Number} deviceCnt.A Count for active [status]
 * @apiSuccess {Number} deviceCnt.I Count for inactive [status]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "brand": "Honda",
 *              "department": "lv1 u4",
 *              "driver": null,
 *              "last_loc_update_ts": "2019-03-20 09:18:31",
 *              "last_loc_update_ts_utc": 1553044711000,
 *              "lat": 22.26263333333333,
 *              "licence": "GS-Tester-A-0762",
 *              "lng": 114.25042,
 *              "model": "Freed",
 *              "runStatus": "online",
 *              "sn": "1001-1800-0762-d48c",
 *              "status": "A",
 *              "type": "OTHERS_DEFAULT"
 *          }
 *      ],
 *      "dataCnt": {
 *          "offline": 0,
 *          "offlinegt": 483,
 *          "online": 2
 *      },
 *      "deviceCnt": {
 *          "A": 404,
 *          "I": 81
 *      }
 *  }
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [
 *         {
 *              "brand": "Honda",
 *              "department": "lv1 u4",
 *              "driver": null,
 *              "last_loc_update_ts": "2019-03-20 09:18:31",
 *              "last_loc_update_ts_utc": 1553044711000,
 *              "lat": null,
 *              "licence": "GS-Tester-A-0762",
 *              "lng": null,
 *              "model": "Freed",
 *              "runStatus": "online",
 *              "sn": "1001-1800-0762-d48c",
 *              "status": "A",
 *              "type": "OTHERS_DEFAULT"
 *          }
 *      ],
 * 		"dataCnt": {
 *          "offline": 0,
 *          "offlinegt": 483,
 *          "online": 2
 *      },
 *      "deviceCnt": {
 *          "A": 404,
 *          "I": 81
 *      }
 *  }
 * @apiError (400) RequestError_10101 Baidu Call error
 * @apiError (400) InternalError_10102 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/liveLocation/{map}', 'getLiveDevice')->setName('LIVELOCATION');

function getLiveDevice (Request $request, Response $response, array $args){
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

	$map = $args['map'];
	$container->logger->info('['.$routename.'] parameters:', array('map'=>$map));

	$timezone = $_SESSION['user']->timezone;

	$sql = "SELECT DISTINCT dev.lat AS lat, dev.lng AS lng, dev.status AS status, dev.yuwei_sn AS sn, dev.last_loc_update_ts, veh.vrm_mark_code AS licence, veh.brand AS brand, veh.model AS model, vt.veh_type_code AS type, drv.name+' ['+oudrv.title+']' AS driver, ou.title AS department FROM mob_device AS dev LEFT JOIN vehicle AS veh ON dev.vrm_id = veh.vrm_id LEFT JOIN vehicle_type AS vt ON veh.type = vt.veh_type_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id LEFT JOIN veh_trip AS trip ON ( veh.vrm_id = trip.vrm_id AND (dev.last_loc_update_ts BETWEEN trip.start_time AND trip.end_time) ) LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON drv.ou_id = oudrv.ou_id WHERE dev.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY dev.last_loc_update_ts DESC";
/*	$sql = "SELECT DISTINCT dev.lat AS lat, dev.lng AS lng, dev.status AS status, dev.md_sn AS sn, dev.last_loc_update_ts, veh.vrm_mark_code AS licence, vehdtl.brand AS brand, vehdtl.model AS model, vt.veh_type_code AS type, CONCAT(drv.name, ' [', oudrv.title, ']') AS driver, ou.title AS department FROM mob_device AS dev LEFT JOIN veh_reg_mark AS veh ON dev.vrm_id = veh.vrm_id LEFT JOIN vehicle AS vehdtl ON veh.vehicle_id = vehdtl.vehicle_id LEFT JOIN vehicle_type AS vt ON vehdtl.type = vt.veh_type_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id LEFT JOIN veh_trip AS trip ON ( veh.vrm_id = trip.vrm_id AND (dev.last_loc_update_ts BETWEEN trip.start_time AND trip.end_time) ) LEFT JOIN driver AS drv ON trip.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON drv.ou_id = oudrv.ou_id WHERE dev.company_id = :company_id AND veh.ou_id IN ('".$query_parts."') ORDER BY dev.last_loc_update_ts DESC";*/

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$dttmpnow = new DateTime('now',new DateTimeZone($timezone));
		$t = $dttmpnow->format('U');
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$liveData = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		$statusCnt = array('online' => 0, 'offline' => 0, 'offlinegt' => 0);
		$deviceCnt = array('A' => 0, 'I' => 0);
		if($liveData){
			for($i=0;$i<count($liveData);$i++){
				if($liveData[$i]['lat']!==null&&$liveData[$i]['lng']!==null){
					$liveData[$i]['lat'] = (float)$liveData[$i]['lat'];
					$liveData[$i]['lng'] = (float)$liveData[$i]['lng'];
				}
				if($liveData[$i]['last_loc_update_ts']!==null){
					$dttmp = new DateTime($liveData[$i]['last_loc_update_ts'],new DateTimeZone($timezone));
					$liveData[$i]['last_loc_update_ts_utc'] = $dttmp->format('U');
					if(($t-$liveData[$i]['last_loc_update_ts_utc'])>86400){
						if (($t-$liveData[$i]['last_loc_update_ts_utc'])>345600) {
							$liveData[$i]['runStatus'] = 'offlinegt';
							$statusCnt['offlinegt'] += 1;
						}
						else{
							$liveData[$i]['runStatus'] = 'offline';
							$statusCnt['offline'] += 1;
						}
					}
					else{
						$liveData[$i]['runStatus'] = 'online';
						$statusCnt['online'] += 1;
					}
					$liveData[$i]['last_loc_update_ts_utc'] = (float)$liveData[$i]['last_loc_update_ts_utc']*1000;
				}
				else{
					$liveData[$i]['last_loc_update_ts_utc'] = $liveData[$i]['last_loc_update_ts'];
					$liveData[$i]['runStatus'] = 'offlinegt';
					$statusCnt['offlinegt'] += 1;
				}

				if($liveData[$i]['status']=='A'){
					$deviceCnt['A'] += 1;
				}
				else if($liveData[$i]['status']=='I'){
					$deviceCnt['I'] += 1;
				}
			}
			if($map == 'googleMap'){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => $liveData,'dataCnt' => $statusCnt, 'deviceCnt' => $deviceCnt);
				return $response->withJson($returnData);
			}
			else{
				$tmplivedata = array_values(array_filter($liveData,function($var) {return (($var['lat'] != null && $var['lng'] != null)||($var['lat'] != 0 && $var['lng'] != 0));}));
				$tmplivedata2 = array_values(array_filter($liveData,function($var) {return ( $var['lat'] == null || $var['lng'] == null || ($var['lat'] == 0 && $var['lng'] == 0));}));
				$ptarr = [];
				for($i=0;$i<count($tmplivedata);$i++){
					$pt = $tmplivedata[$i]['lng'] . ',' . $tmplivedata[$i]['lat'];
					array_push($ptarr, $pt);
				}
				$tripchunk = array_chunk($ptarr, 100);
				for ($i=0; $i < count($tripchunk); $i++) {
					$tripchunk[$i] = join(';', $tripchunk[$i]);
				}
				$APIkey = $container->get('settings')['api']['baiduKey'];
				$path = $container->get('settings')['api']['baidupath']['geoconv'];
				foreach ( $tripchunk as $key=>$data ) {
					$postData = array(
					    'coords'=>$data,
					    'from'=>1,
					    'to'=>5,
					    'ak'=>$APIkey
					);
					$postData = http_build_query($postData);
					if(($key+1)%50==0){
						sleep(1);
					}
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
						$json = json_decode($result,true);
						if($json['status'] == 0){
						 	$pointpath = $json['result'];
					 		foreach ($pointpath as $key2 => $point) {
						 		$tmplivedata[$key*100+$key2]['lat'] = $point['y'];
						 		$tmplivedata[$key*100+$key2]['lng'] = $point['x'];
						 	}
						}
						else{
							$errorcurl = true;
							if(isset($json['message'])&&isset($json['status'])){
								$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
							}
							else{
								$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
							}
							break;
						}
					}else{
						$errorcurl = true;
    					$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
    					break;
					}
					curl_close($ch);
				}
				if(!isset($errorcurl)){
					$liveData = array_merge($tmplivedata,$tmplivedata2);
					usort($liveData, function($a, $b) {
					    return $b['last_loc_update_ts_utc'] <=> $a['last_loc_update_ts_utc'];
					});
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $liveData,'dataCnt' => $statusCnt, 'deviceCnt' => $deviceCnt);
					return $response->withJson($returnData);
				}
				else{
					foreach ($liveData as $key => $value) {
						$liveData[$key]['lat'] = null;
						$liveData[$key]['lng'] = null;
					}
					$container->logger->error('['.$routename.'] call baidu error: [ErrCode=10101] '.$error_msg);
					$returnData = array('message' => 'Success','code' => '10101','data' => $liveData,'dataCnt' => $statusCnt, 'deviceCnt' => $deviceCnt);
					return $response->withJson($returnData);
				}
			}
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => [],'dataCnt' => $statusCnt, 'deviceCnt' => $deviceCnt);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10102] '.$e);
		$returnData = array('message' => 'Fail','code'=>'10102');
		return $response->withJson($returnData,400);
	}
};