<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-17 17:57:59
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /filterListData Get Filter List Data
 * @apiName EXPORT WARNING DATA - GET FILTER LIST DATA
 * @apiGroup WarnDataExport
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object} data List of filter list
 * @apiSuccess {Object[]} data.brandList List of vehicle brand
 * @apiSuccess {String} data.brandList.brand Vehicle brand
 * @apiSuccess {Object[]} data.deptList List of department
 * @apiSuccess {String} data.deptList.id ID of the department
 * @apiSuccess {String} data.deptList.name Name of the department
 * @apiSuccess {String} data.deptList.parent Parent of the department
 * @apiSuccess {Object[]} data.deptList.children Children of the department
 * @apiSuccess {String} data.deptList.children.id Children ID
 * @apiSuccess {String} data.deptList.children.name Children name
 * @apiSuccess {String} data.deptList.children.parent Parent ID
 * @apiSuccess {Object[]} data.drvGrp List of driver group
 * @apiSuccess {String} data.drvGrp.id ID of the driver group
 * @apiSuccess {String} data.drvGrp.name Name of the driver group
 * @apiSuccess {Object[]} data.drvList List of driver
 * @apiSuccess {String} data.drvList.grp_id Driver group ID the driver belongs
 * @apiSuccess {String} data.drvList.id ID of of the driver group
 * @apiSuccess {String} data.drvList.name Name of the driver group
 * @apiSuccess {String} data.drvList.ou_id Department ID the driver belongs
 * @apiSuccess {Object[]} data.modelList List of vehicle model
 * @apiSuccess {String} data.modelList.model Vehicle model
 * @apiSuccess {Object[]} data.vehGrp List of vehicle group
 * @apiSuccess {String} data.vehGrp.id ID of the vehicle group
 * @apiSuccess {String} data.vehGrp.name Name of the vehicle group
 * @apiSuccess {Object[]} data.vehList List of vehicle
 * @apiSuccess {String} data.vehList.brand Brand of the vehicle
 * @apiSuccess {String} data.vehList.grp_id Vehicle group ID the vehicle belongs
 * @apiSuccess {String} data.vehList.id ID of the vehicle
 * @apiSuccess {String} data.vehList.model Model of the vehicle
 * @apiSuccess {String} data.vehList.name Name of the vehicle
 * @apiSuccess {String} data.vehList.ou_id Department ID the vehicle belongs
 * @apiSuccess {String} data.vehList.type_id Vehicle type
 * @apiSuccess {Object[]} data.vehtypeList List of vehicle type
 * @apiSuccess {String} data.vehtypeList.id ID of the vehicle type
 * @apiSuccess {String} data.vehtypeList.name Name of the vehicle type
 * @apiSuccess {Object[]} data.wtList List of warning type
 * @apiSuccess {String} data.wtList.id ID of warning type
 * @apiSuccess {String} data.wtList.name Name of warning type
 * @apiSuccess {String} data.wtList.parent Parent of warning type
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": {
 *          "brandList": {
 *              "brand": "123"
 *          },
 *          "deptList": [
 *               {
 *                  "id":"5",
 *                  "name":"Root",
 *                  "parent":null,
 *                  "children": [
 *                     {
 *                          "id":"7",
 *                          "name":"lv1 u1",
 *                          "parent":"5",
 *                          "children": [
 *                              {
 *                                  "id":"449",
 *                                  "name":"ant",
 *                                  "parent":"7"
 *                              }
 *                          ]
 *                      }
 *                  ]
 *              }
 *          ],
 *          "drvGrp": [
 *              {
 *                  "id":"197",
 *                  "name":"CSV Testing"
 *              }
 *          ],
 *          "drvList": [
 *              {
 *                  "id":"11753",
 *                  "name":"2223 [Root]",
 *                  "ou_id":"5",
 *                  "grp_id":null
 *              }
 *          ],
 *          "modelList": [
 *              {
 *                  "model":"132"
 *              }
 *          ],
 *          "vehGrp": [
 *              {
 *                  "id": "123",
 *                  "name": "123"
 *              }
 *          ],
 *          "vehList": [
 *              {
 *                  "id":"2337",
 *                  "name":"1001-1800-1138-cfac [Root]",
 *                  "ou_id":"5",
 *                  "brand":"Test",
 *                  "model":"Car",
 *                  "type_id":"1",
 *                  "grp_id":null
 *              }
 *          ],
 *          "vehtypeList": [
 *              {
 *                  "id":"2",
 *                  "name":"CAR"
 *              }
 *          ],
 *          "wtList": [
 *              {
 *                  "id":"2",
 *                  "name":"PCW",
 *                  "parent":null
 *              }
 *          ]
 *      }
 *  }
 *
 * @apiError (400) InternalError_12101 SQL error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

$app->get('/filterListData', 'getFilterListData')->setName('EXPORT WARNING DATA - GET FILTER LIST DATA');

/**
 * @api {post} /api/warningRawData Get Warning Data
 * @apiName EXPORT WARNING DATA - GET RAW WARNING DATA
 * @apiGroup WarnDataExport
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} startDate Start date
 * @apiParam (Request Body) {String} endDate End date
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} dataFilename Warning data filename
 * @apiParam (Request Body) {String} [wt]
 * @apiParam (Request Body) {String} [driverTag]
 * @apiParam (Request Body) {String} [driver]
 * @apiParam (Request Body) {String} [vehicle]
 * @apiParam (Request Body) {String} [duration]
 * @apiParam (Request Body) {String} [startSpd]
 * @apiParam (Request Body) {String} [endSpd]
 * @apiParam (Request Body) {String} [topSpd]
 * @apiParam (Request Body) {String} [hw]
 * @apiParam (Request Body) {String} [nearHW]
 * @apiParam (Request Body) {String} [state]
 * @apiParam (Request Body) {String} [stateFlag]
 * @apiParam (Request Body) {String} [video]
 * @apiParam (Request Body) {String} [runDistance]
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} url URL for download file
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "url": "http://dgdsweb04/api/download/V2FybmluZ0RhdGFfMjAxOTAzMjE%3D/csv/L3RtcC9kYXRhYjJVbjlG"
 *  }
 *
 * @apiError (400) InternalError_12102 Cannot create file
 * @apiError (400) InternalError_12103 SQL error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/warningRawData', 'getRawWarningData')->setName('EXPORT WARNING DATA - GET RAW WARNING DATA');

function getFilterListData (Request $request, Response $response, array $args){
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

	$ou_id = $_SESSION['user']->ou_id;
	$wt = implode("','", $setting['data']['wt']);

	$sql = "SELECT veh.vrm_id AS id, ISNULL(veh.vrm_mark_code,'')+' ['+ISNULL(ou.title,'')+']' AS name, veh.ou_id AS ou_id, veh.brand AS brand, veh.model AS model, veh.type AS type_id, vehgrpdtl.vrm_grp_id AS grp_id FROM vehicle AS veh LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id LEFT JOIN vehicle_group_dtl AS vehgrpdtl ON veh.vrm_id = vehgrpdtl.vrm_id WHERE veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code ASC";

	$sql1 = "SELECT drv.driver_id AS id, ISNULL(drv.name,'')+' ['+ISNULL(ou.title,'')+']' AS name, drv.ou_id AS ou_id, drvgrpdtl.drv_grp_id AS grp_id FROM driver AS drv LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id LEFT JOIN driver_group_dtl AS drvgrpdtl ON drv.driver_id = drvgrpdtl.driver_id WHERE drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') ORDER BY drv.name ASC";

	$sql2 = "SELECT ou_id, parent_id FROM org_chart WHERE company_id = :company_id AND ou_id = :ou_id";

	$sql3 = "SELECT ou_id AS id, title AS name, parent_id AS parent FROM org_chart WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY parent_id ASC";

	$sql4 = "SELECT vrm_grp_id AS id, grp_alias AS name FROM vehicle_group WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY grp_alias ASC";

	$sql5 = "SELECT drv_grp_id AS id, grp_alias AS name FROM driver_group WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY grp_alias ASC";

	$sql6 = "SELECT DISTINCT brand FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY brand ASC";

	$sql7 = "SELECT DISTINCT model FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."') ORDER BY model ASC";

	//put 'Others' type in the bottom
	$sql8 = "SELECT veh_type_id AS id, veh_type_code AS name FROM vehicle_type ORDER BY veh_type_id";

	$sql9 = "SELECT a.id, a.name, CASE WHEN b.warn_type_code IN ('".$wt."') THEN b.warn_type_code ELSE NULL END AS parent FROM (SELECT warn_type_id AS id, warn_type_code AS name, CASE WHEN LEN(warn_type_id) = 7 THEN CASE WHEN warn_type_id > 2000000 THEN warn_type_id-2000000 ELSE warn_type_id-1000000 END ELSE NULL END AS parent FROM warning_type) a LEFT JOIN warning_type b ON a.parent = b.warn_type_id WHERE a.name IN ('".$wt."') ORDER BY a.name ASC";

	function getNestedChildren($arr, $parent) {
	    $out = [];
	    foreach($arr as $i => $item) {
	        if($arr[$i]['parent'] == $parent) {
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
		$stmt->execute();
		$dataListVehTemp = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql1, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListDrvTemp = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql2, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("ou_id", $ou_id);
		$stmt->execute();
		$topDept = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql3, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListDept = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql4, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListVehGrp = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql5, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListDrvGrp = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql6, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListBrand = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql7, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$dataListModel = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql8, $prepOpts);
		$stmt->execute();
		$dataListVehType = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sql9, $prepOpts);
		$stmt->execute();
		$dataListWtTemp = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$dataList = array();
		if($dataListVehTemp){
			$vehList = array();
			$dataListVeh = array();
			foreach ($dataListVehTemp as $key => $value) {
				$index = array_search($value['id'],$vehList);
				if($index!==false){
					if($dataListVeh[$index]['grp_id']){
						array_push($dataListVeh[$index]['grp_id'],$value['grp_id']);
					}
					else{
						if($value['grp_id']){
							$dataListVeh[$index]['grp_id'] = array();
							array_push($dataListVeh[$index]['grp_id'],$value['grp_id']);
						}
					}
				}
				else{
					array_push($vehList,$value['id']);
					array_push($dataListVeh,$value);
					$last = count($dataListVeh)-1;
					if($value['grp_id']){
						$dataListVeh[$last]['grp_id'] = array();
						array_push($dataListVeh[$last]['grp_id'],$value['grp_id']);
					}
				}
			}
			$dataList['vehList'] = $dataListVeh;
		}
		else{
			$dataList['vehList'] = array();
		}
		if($dataListDrvTemp){
			$drvList = array();
			$dataListDrv = array();
			foreach ($dataListDrvTemp as $key => $value) {
				$index = array_search($value['id'],$drvList);
				if($index!==false){
					if($dataListDrv[$index]['grp_id']){
						array_push($dataListDrv[$index]['grp_id'],$value['grp_id']);
					}
					else{
						if($value['grp_id']){
							$dataListDrv[$index]['grp_id'] = array();
							array_push($dataListDrv[$index]['grp_id'],$value['grp_id']);
						}
					}
				}
				else{
					array_push($drvList,$value['id']);
					array_push($dataListDrv,$value);
					$last = count($dataListDrv)-1;
					if($value['grp_id']){
						$dataListDrv[$last]['grp_id'] = array();
						array_push($dataListDrv[$last]['grp_id'],$value['grp_id']);
					}
				}
			}
			$dataList['drvList'] = $dataListDrv;
		}
		else{
			$dataList['drvList'] = array();
		}
		if($dataListDept){
			$dataList['deptList'] = getNestedChildren($dataListDept,$topDept->parent_id);
		}
		else{
			$dataList['deptList'] = array();
		}
		if($dataListVehGrp){
			$dataList['vehGrp'] = $dataListVehGrp;
		}
		else{
			$dataList['vehGrp'] = array();
		}
		if($dataListDrvGrp){
			$dataList['drvGrp'] = $dataListDrvGrp;
		}
		else{
			$dataList['drvGrp'] = array();
		}
		if($dataListBrand){
			$dataList['brandList'] = $dataListBrand;
		}
		else{
			$dataList['brandList'] = array();
		}
		if($dataListModel){
			$dataList['modelList'] = $dataListModel;
		}
		else{
			$dataList['modelList'] = array();
		}
		if($dataListVehType){
			$dataList['vehtypeList'] = $dataListVehType;
		}
		else{
			$dataList['vehtypeList'] = array();
		}
		if($dataListWtTemp){
			$dataListWT = $dataListWtTemp;
			$sort = $setting['data']['fullWarningField'];
			usort($dataListWT, function($a, $b) use ($sort) {
			    return array_search($a->name, $sort) - array_search($b->name, $sort);
			});
			$dataList['wtList'] = $dataListWT;
		}
		else{
			$dataList['wtList'] = array();
		}
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => $dataList);
		return $response->withJson($returnData);
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=12101] '.$e);
		$returnData = array('message' => 'Fail','code'=>'12101');
		return $response->withJson($returnData,400);
	}
}

function getRawWarningData (Request $request, Response $response, array $args){
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

    $query = $request->getParsedBody();
	$container->logger->info($routename.': parameters.', $query);

	$wt = implode("','", $setting['data']['wt']);

	/*$filter = "((warn.wt = 101 AND warn.top_spd >= 10 AND ((warn.duration > 1000 AND (warn.start_spd - warn.end_spd)/warn.duration >= 0.006) OR (warn.duration >= 1600 AND (warn.start_spd - warn.end_spd)/warn.duration >= 0.003))) OR (((warn.wt = 1 AND warn.duration >= 800 AND (warn.start_spd - warn.end_spd)/warn.duration > 0) OR (warn.wt = 2 AND warn.duration >= 500  AND (warn.start_spd - warn.end_spd)/warn.duration > 0.006))))";*/
	$filter = $setting['data']['dangerVideoFilter'];

	$sql = "SELECT tmp.start_time AS start_time, tmp.end_time AS end_time, tmp.warn_type_code AS warningType, tmp.lat AS lat, tmp.lng AS lng, ROUND(CAST(tmp.duration/1000.0 AS FLOAT),2) AS duration, tmp.start_spd AS start_spd, tmp.end_spd AS end_spd, tmp.top_spd AS top_spd, ROUND(CAST((tmp.start_spd-tmp.end_spd)/NULLIF(tmp.duration/1000.0,0) AS FLOAT),1) AS roc, ROUND(CAST(tmp.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(tmp.near_hw/10.0 AS FLOAT),1) AS near_hw, tmp.vehicle_status AS vehStatus, tmp.mediaReady AS videoReady, tmp.mediaId AS video, tmp.dangerousVdo, veh.vrm_mark_code AS vehicle, ouveh.title AS vehDepart, tmp.vehgrp AS vehGrp, veh.brand AS brand, veh.model AS model, vehtype.veh_type_code AS type, ROUND(CAST(rd.rangedistance/100000.0 AS FLOAT),1) AS rangeRunDistance, ROUND(CAST((veh.run_distance_his+veh.run_distance)/100000.0 AS FLOAT),1) AS runDistance, drv.name AS driver, oudrv.title AS drvDepart, tmp.drvgrp AS drvGrp FROM ( SELECT warn.*, warntype.*, vehgrp.vehgrp, drvgrp.drvgrp, media.status AS mediaReady, media.media_full_id AS mediaId, CASE WHEN ".$filter." = 'Y' AND media.media_full_id IS NOT NULL AND media.status = 'Y' THEN 'Y' ELSE 'N' END AS dangerousVdo FROM log_data AS warn LEFT JOIN warning_type AS warntype ON warn.wt = warntype.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN ( SELECT vrm_id, STUFF((SELECT DISTINCT ',' + tmp.grp_alias FROM (SELECT a.vrm_id,b.grp_alias FROM vehicle_group_dtl a LEFT JOIN vehicle_group b ON a.vrm_grp_id=b.vrm_grp_id WHERE b.company_id = :company_id) tmp WHERE tmp.vrm_id = t.vrm_id FOR XML PATH ('')), 1, 1, '' ) AS vehgrp FROM vehicle_group_dtl t GROUP BY vrm_id ) AS vehgrp ON vehgrp.vrm_id = warn.vrm_id LEFT JOIN ( SELECT driver_id, STUFF((SELECT DISTINCT ',' + tmp.grp_alias FROM (SELECT a.driver_id,b.grp_alias FROM driver_group_dtl a LEFT JOIN driver_group b ON a.drv_grp_id=b.drv_grp_id WHERE b.company_id = :company_id) tmp WHERE tmp.driver_id = t.driver_id FOR XML PATH ('')), 1, 1, '' ) AS drvgrp FROM driver_group_dtl t GROUP BY driver_id ) AS drvgrp ON drvgrp.driver_id = warn.driver_id WHERE warn.acc_date >= :start_time AND warn.acc_date <= :end_time AND veh.company_id = :company_id AND veh.ou_id IN ('" . $oc_list . "') AND warntype.warn_type_code IN ('".$wt."') ) AS tmp LEFT JOIN driver AS drv ON tmp.driver_id = drv.driver_id LEFT JOIN vehicle AS veh ON tmp.vrm_id = veh.vrm_id LEFT JOIN org_chart AS oudrv ON drv.ou_id = oudrv.ou_id LEFT JOIN org_chart AS ouveh ON veh.ou_id = ouveh.ou_id LEFT JOIN vehicle_type AS vehtype ON veh.type = vehtype.veh_type_id LEFT JOIN ( SELECT a.vrm_id, sum(a.drv_distance) as rangedistance FROM veh_trip a left join vehicle b on a.vrm_id = b.vrm_id where b.company_id = :company_id and a.acc_date>=:start_time and a.acc_date<=:end_time group by a.vrm_id ) AS rd ON tmp.vrm_id = rd.vrm_id";

	if(isset($query['wt'])||isset($query['driverTag'])||isset($query['driver'])||isset($query['vehicle'])){
		$andFlag = false;
	}

	if(isset($query['wt'])){
		if($andFlag){
			$sql .= " AND";
		}
		else{
			$sql .= " WHERE";
		}
		$wtlist = implode("','", $query['wt']);
		$sql .= " tmp.warn_type_id IN ('" . $wtlist . "')";
		$andFlag = true;
	}

	if(isset($query['driverTag'])){
		if($andFlag){
			$sql .= " AND";
		}
		else{
			$sql .= " WHERE";
		}
		$sql .= " tmp.driver_id IS NULL";
		$andFlag = true;
	}

	if(isset($query['driver'])){
		if($query['driver']!=='X'){
			$drvlist = implode("','", $query['driver']);
			if(isset($query['driverTag'])){
				$sql .= " OR";
			}
			else{
				if($andFlag){
					$sql .= " AND";
				}
				else{
					$sql .= " WHERE";
				}
			}
			$sql .= " tmp.driver_id IN ('" . $drvlist . "') AND drv.company_id = :company_id AND drv.ou_id IN ('" . $oc_list . "')";
		}
		else{
			if(!isset($query['driverTag'])){
				$emptyData = true;
			}
		}
		$andFlag = true;
	}

	if(isset($query['vehicle'])){
		if($query['vehicle']!=='X'){
			if($andFlag){
				$sql .= " AND";
			}
			else{
				$sql .= " WHERE";
			}
			$vehlist = implode("','", $query['vehicle']);
			$sql .= " tmp.vrm_id IN ('" . $vehlist . "') AND veh.company_id = :company_id AND veh.ou_id IN ('" . $oc_list . "')";
		}
		else{
			$emptyData = true;
		}
		$andFlag = true;
	}

	$sql .= " ORDER BY tmp.start_time";

	try{
		if(isset($query['lang'])){
			$lang = $query['lang'];
		}
		else{
			$lang = 'en';
		}
		$data = tempnam(sys_get_temp_dir(), "data");
		$warnData = fopen($data.'.csv', "a");
		if($lang!=='en'){
			fwrite($warnData,"\xEF\xBB\xBF");
		}
		$warnDataHeader = $container->get('settings')['data']['exportWarnHeader'][$lang];
		$vehTypeTranslate = json_decode($container->get('settings')['data']['vehType'], true);
		$warningTypeTranslate = json_decode($container->get('settings')['data']['warningType'], true);

		fputcsv($warnData, $warnDataHeader);
		if(!isset($emptyData)){
			$db = $container->db;
			$prepOpts = $setting['db']['prepOpts'];
			$prepOpts[PDO::ATTR_CURSOR] = PDO::CURSOR_SCROLL;
			$prepOpts[PDO::SQLSRV_ATTR_CURSOR_SCROLL_TYPE] = PDO::SQLSRV_CURSOR_DYNAMIC;
			/*$db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);*/
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("start_time", $query['startDate']);
			$stmt->bindParam("end_time", $query['endDate']);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
				//row
				//start_time, end_time, warningType, lat, lng, duration, start_spd, end_spd, top_spd, roc, hw, near_hw, vehStatus, videoReady, video, dangerousVdo, vehicle, vehDepart, vehGrp, brand, model, type, rangeRunDistance, runDistance, driver, drvDepart, drvGrp
				$filter = true;
				$writecsv = $row;
				//$writecsv[9] = ((float)$row[6]-(float)$row[7])/(float)$row[5];

				$driverAction = "";
				if(((float)$row[12]&pow(2,1))!==1&&((float)$row[12]&pow(2,2))!==2&&((float)$row[12]&pow(2,4))!==4){
					$driverAction = null;
				}
				else{
					if(((float)$row[12]&pow(2,1))==1){
						$driverAction .= 'L';
					}
					if(((float)$row[12]&pow(2,2))==2){
						$driverAction .= 'R';
					}
					if(((float)$row[12]&pow(2,4))==4){
						$driverAction .= 'B';
					}
				}
				$writecsv[12] = $driverAction;

				if($row[14]){
					$videoStatus = null;
					$videoId = null;
					if($row[13]==='Y'){
						$videoStatus = "Ready";
						$videoId = $row[14];
					}
					else if($row[13]==='N'){
						$videoStatus = "Pending";
					}
					$writecsv[13] = $videoStatus;
					$writecsv[14] = $videoId;
				}

				if(isset($row[2]) && $row[2] !== ''){
					$writecsv[2] = $warningTypeTranslate[$row[2]];
				}

				if(isset($row[21]) && $row[21] !== ''){
					$writecsv[21] = $vehTypeTranslate[$row[21]];
				}

				if(isset($query['duration'])){
					if((float)$row[5]<=$query['duration']){
						$filter = false;
					}
				}

				if(isset($query['startSpd'])){
					if((float)$row[6]<=$query['startSpd']){
						$filter = false;
					}
				}

				if(isset($query['endSpd'])){
					if((float)$row[7]<=$query['endSpd']){
						$filter = false;
					}
				}

				if(isset($query['topSpd'])){
					if((float)$row[8]<=$query['topSpd']){
						$filter = false;
					}
				}

				if(isset($query['hw'])){
					if((float)$row[10]<=$query['hw']){
						$filter = false;
					}
				}
				else{
					if($row[10]===NULL){
						$writecsv[10] = 'N/A';
					}
				}

				if(isset($query['nearHW'])){
					if((float)$row[11]<=$query['nearHW']){
						$filter = false;
					}
				}
				else{
					if($row[11]===NULL){
						$writecsv[11] = 'N/A';
					}
				}

				if(isset($query['vehStatus'])){
					if(strpos($query['vehStatus'], 'N')!==false&&strpos($query['vehStatus'], 'B')===false&&strpos($query['vehStatus'], 'L')===false&&strpos($query['vehStatus'], 'R')===false){
						if(((float)$row[12]&pow(2,1))==1||((float)$row[12]&pow(2,2))==2||((float)$row[12]&pow(2,4))==4){
							$filter = false;
						}
					}
					else{
						if($query['vehStatusFlag']){
							if($filter){
								$containState = true;
								if(strpos($query['vehStatus'], 'L')!==false){
									if(((float)$row[12]&pow(2,1))!==1){
										$containState = false;
									}
								}
								if(strpos($query['vehStatus'], 'R')!==false){
									if(((float)$row[12]&pow(2,2))!==2){
										$containState = false;
									}
								}
								if(strpos($query['vehStatus'], 'B')!==false){
									if(((float)$row[12]&pow(2,4))!==4){
										$containState = false;
									}
								}
								if(strpos($query['vehStatus'], 'N')!==false){
									if(((float)$row[12]&pow(2,1))!==1&&((float)$row[12]&pow(2,2))!==2&&((float)$row[12]&pow(2,4))!==4){
										$containState = true;
									}
								}
								$filter = $containState;
							}
						}
						else{
							if($filter){
								$containState = false;
								if(strpos($query['vehStatus'], 'L')!==false){
									if(((float)$row[12]&pow(2,1))==1){
										$containState = true;
									}
								}
								if(strpos($query['vehStatus'], 'R')!==false){
									if(((float)$row[12]&pow(2,2))==2){
										$containState = true;
									}
								}
								if(strpos($query['vehStatus'], 'B')!==false){
									if(((float)$row[12]&pow(2,4))==4){
										$containState = true;
									}
								}
								if(strpos($query['vehStatus'], 'N')!==false){
									if(((float)$row[12]&pow(2,1))!==1&&((float)$row[12]&pow(2,2))!==2&&((float)$row[12]&pow(2,4))!==4){
										$containState = true;
									}
								}
								$filter = $containState;
							}
						}
					}
				}

				if(isset($query['video'])){
					if(!$row[14]){
						if(strpos($query['video'], 'N')===false){
							$filter = false;
						}
					}
					else{
						if(strpos($query['video'], 'N')!==false||strpos($query['video'], 'A')!==false||strpos($query['video'], 'R')!==false||strpos($query['video'], 'P')!==false){
							if($row[13]==='X'){
								if(strpos($query['video'], 'N')===false){
									$filter = false;
								}
							}
							else if($row[13]==='Y'){
								if(strpos($query['video'], 'A')===false&&strpos($query['video'], 'R')===false){
									$filter = false;
								}
							}
							else if($row[13]==='N'){
								if(strpos($query['video'], 'A')===false&&strpos($query['video'], 'P')===false){
									$filter = false;
								}
							}
							else{
								$filter = false;
							}
						}
					}
					if(strpos($query['video'], 'D')!==false){
						if($row[15]!=='Y'){
							$filter = false;
						}
					}
				}

				if(isset($query['runDistanceRange'])){
					if((float)$row[22]<=$query['runDistanceRange']){
						$filter = false;
					}
				}

				if(isset($query['runDistance'])){
					if((float)$row[23]<=$query['runDistance']){
						$filter = false;
					}
				}

				if($filter){
					fputcsv($warnData, $writecsv);
				}
		    }
		    $db = null;
		}
		fclose($warnData);
		if(file_exists($data.'.csv')){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success', 'url' => $setting['data']['webserver'].'/api/download/'.urlencode(base64_encode($query['dataFilename'])).'/csv/'.urlencode(base64_encode($data)));
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] cannot create csv file. [ErrCode=12102]');
			$returnData = array('message' => 'Fail', 'code' => '12102');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=12103] '.$e);
		$returnData = array('message' => 'Fail','code'=>'12103');
		return $response->withJson($returnData,400);
	}
};