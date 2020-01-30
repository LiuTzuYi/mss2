<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-05-21 10:16:42
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-27 17:28:03
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/adminpanel', function() {
	$this->post('/login', 'adminpanellogin')->setName('ADMINPANEL - LOGIN');
	$this->get('/complistselect', 'apcomplistselect')->setName('ADMINPANEL - COMPANY LIST FOR SELECT');
	$this->group('/company', function(){
		$this->get('', 'apcompanylist')->setName('ADMINPANEL - COMPANY LIST');
		$this->post('', 'apcompanyadd')->setName('ADMINPANEL - ADD COMPANY DATA');
		$this->post('/edit', 'apcompanyedit')->setName('ADMINPANEL - EDIT COMPANY DATA');
	});
	$this->group('/device', function(){
		$this->get('', 'apdevicelist')->setName('ADMINPANEL - DEVICE LIST');
		$this->post('', 'apdeviceadd')->setName('ADMINPANEL - ADD DEVICE DATA');
		$this->patch('', 'apdeviceedit')->setName('ADMINPANEL - EDIT DEVICE DATA');
	});
	$this->group('/mailnotify', function(){
		$this->get('', 'apmailnotifylist')->setName('ADMINPANEL - MAIL NOTIFICATION LIST');
		$this->post('', 'apmailnotifyadd')->setName('ADMINPANEL - ADD MAIL NOTIFICATION DATA');
		$this->patch('', 'apmailnotifyedit')->setName('ADMINPANEL - EDIT MAIL NOTIFICATION DATA');
	});
	$this->group('/drvcard', function(){
		$this->get('/log', 'apdrvcardlog')->setName('ADMINPANEL - DRIVER CARD IMPORT LOG');
		$this->post('/add/{compId}', 'apdrvcardadd')->setName('ADMINPANEL - ADD DRIVER CARD');
	});
})->add(function (Request $request, Response $response, callable $next) {
	global $app;
    $container = $app->getContainer();
    $route = $request->getAttribute('route');
    $setting = $container->get('settings');
    $valid = false;

    $name = $route->getName();
    //$routeParams = $request->getAttribute('routeInfo')[2];
    //

    if(($name != 'ADMINPANEL - LOGIN')){
		$auth_token = $request->getHeader('Authorization');
		$container->logger->debug('[ADMINPANEL - CHECK SESSION] START');
		if($auth_token[0]==$setting['adminpanel']['token']){
			$valid = true;
		}
		else{
			$container->logger->info('[ADMINPANEL - CHECK SESSION] invalid. [ErrCode=00000]');
		}
    }
    else{
    	$valid = true;
    }

    if(!$valid){
        $returnData = array('message' => 'Invalid Session', 'code' => '000000', 'detail' => 'Your session is invalid or expired. Please log in again.');
        return $response->withJson($returnData, 401);
    }

	$response = $next($request, $response);
	return $response;
});

function adminpanellogin (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$login = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $login);
	$setting = $container->get('settings');

	$salt = sha1($login['username'].$login['password']);
	$pwdencrypt = sha1($salt.$login['password']);

	if($pwdencrypt==$setting['adminpanel']['token']){
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success', 'token' => $pwdencrypt);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] authentication failed. [ErrCode=00000]');
		$returnData = array('message' => 'Login Failed','code' => '00000', 'detail' => 'Incorrect username or password.');
		return $response->withJson($returnData,400);
	}
};

function apcomplistselect (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$sql = "SELECT company_id, company_code FROM company WHERE company_id <> 0 ORDER BY company_code";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$compData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if($compData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $compData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
};

function apcompanylist (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$sql = "SELECT comp.company_id, comp.company_code, comp.company_name, comp.timezone, comp.pwd_length, comp.pwd_rule, comp.pwd_history, comp.pwd_lockout_cnt, CASE WHEN comp.pwd_change_limit = 'Y' THEN 'Yes' ELSE 'No' END AS pwd_change_limit, comp.pwd_renewal_day, comp.banner, CASE WHEN comp.status = 'A' THEN 'Active' ELSE 'Inactive' END AS status, func.func_code, banner.banner_default, banner.banner_en, banner.banner_zhtw, banner.banner_zhcn FROM company AS comp LEFT JOIN company_func AS func ON comp.company_id = func.company_id LEFT JOIN company_banner AS banner ON comp.company_id = banner.company_id WHERE comp.company_id <> 0 ORDER BY comp.company_code";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$compDataTMP = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if($compDataTMP){
			$compList = [];
			$compData = [];
			for($i=0;$i<count($compDataTMP);$i++){
				$index = array_search($compDataTMP[$i]->company_id,$compList);
				if($index!==false){
					if($compDataTMP[$i]->func_code!==null){
						array_push($compData[$index]['func'], $compDataTMP[$i]->func_code);
					}
				}
				else{
					array_push($compList,$compDataTMP[$i]->company_id);
					if($compDataTMP[$i]->banner_default!==null){
						basename($compDataTMP[$i]->banner_default);
					}
					if($compDataTMP[$i]->banner_en!==null){
						basename($compDataTMP[$i]->banner_en);
					}
					if($compDataTMP[$i]->banner_zhtw!==null){
						basename($compDataTMP[$i]->banner_zhtw);
					}
					if($compDataTMP[$i]->banner_zhcn!==null){
						basename($compDataTMP[$i]->banner_zhcn);
					}
					if($compDataTMP[$i]->func_code==null){
						array_push($compData,array('company_id' => $compDataTMP[$i]->company_id,'company_code' => $compDataTMP[$i]->company_code,'company_name' => $compDataTMP[$i]->company_name,'timezone' => $compDataTMP[$i]->timezone,'pwd_length' => $compDataTMP[$i]->pwd_length,'pwd_rule' => $compDataTMP[$i]->pwd_rule,'pwd_history' => $compDataTMP[$i]->pwd_history,'pwd_lockout_cnt' => $compDataTMP[$i]->pwd_lockout_cnt,'pwd_change_limit' => $compDataTMP[$i]->pwd_change_limit,'pwd_renewal_day' => $compDataTMP[$i]->pwd_renewal_day,'banner' => $compDataTMP[$i]->banner,'status' => $compDataTMP[$i]->status,'func'=>[], 'banner_default' => $compDataTMP[$i]->banner_default, 'banner_en' => $compDataTMP[$i]->banner_en, 'banner_zhtw' => $compDataTMP[$i]->banner_zhtw, 'banner_zhcn' => $compDataTMP[$i]->banner_zhcn));
					}
					else{
						array_push($compData,array('company_id' => $compDataTMP[$i]->company_id,'company_code' => $compDataTMP[$i]->company_code,'company_name' => $compDataTMP[$i]->company_name,'timezone' => $compDataTMP[$i]->timezone,'pwd_length' => $compDataTMP[$i]->pwd_length,'pwd_rule' => $compDataTMP[$i]->pwd_rule,'pwd_history' => $compDataTMP[$i]->pwd_history,'pwd_lockout_cnt' => $compDataTMP[$i]->pwd_lockout_cnt,'pwd_change_limit' => $compDataTMP[$i]->pwd_change_limit,'pwd_renewal_day' => $compDataTMP[$i]->pwd_renewal_day,'banner' => $compDataTMP[$i]->banner,'status' => $compDataTMP[$i]->status,'func'=>[$compDataTMP[$i]->func_code], 'banner_default' => $compDataTMP[$i]->banner_default, 'banner_en' => $compDataTMP[$i]->banner_en, 'banner_zhtw' => $compDataTMP[$i]->banner_zhtw, 'banner_zhcn' => $compDataTMP[$i]->banner_zhcn));
					}
				}
			}
			usort($compData, function($a, $b) {
			    return $a['company_code'] <=> $b['company_code'];
			});
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $compData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apcompanyadd (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$company = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $company);

	$sql = "SELECT company_id FROM company WHERE company_code = :company_code";

	$sql1 = "EXEC spr_create_company_process :company_code,:company_name";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_code", $company['company_code']);
		$stmt->execute();
		$compData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$compData){
			$db = $container->db;
			$stmt = $db->prepare($sql1, $prepOpts);
			$stmt->bindParam("company_code", $company['company_code']);
			$stmt->bindParam("company_name", $company['company_name']);
			$stmt->execute();
			$sprData = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			if(isset($sprData->compId) && !is_null($sprData->compId)){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing added. [ErrCode=000000]');
				$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] company already exist. [ErrCode=000000]');
			$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Company already exists.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apcompanyedit (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$company = $request->getParsedBody();
	if(strpos($request->getHeader('Content-Type')[0], 'json') === false){
		foreach ($company as $key => $value) {
			if(strpos($key, "file_") === false){
				$company[$key] = json_decode($value,true);
			}
		}
		$container->logger->info('['.$routename.'] parameters:', $company);
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', $company);
	}

	$uploadedFiles = $request->getUploadedFiles();

	$directory = $setting['adminpanel']['company']['disclaimerdir'];

	$sql = "SELECT func_code FROM company_func WHERE company_id = :company_id";

	if(isset($company['setting'])){
		$sql1 = "UPDATE company SET ";
		$commaFlag = false;
		if(isset($company['setting']['timezone'])){
			$sql1 .= "timezone = '".$company['setting']['timezone']."'";
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_lockout_cnt'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "pwd_lockout_cnt = ".$company['setting']['pwd_lockout_cnt'];
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_length'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "pwd_length = ".$company['setting']['pwd_length'];
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_rule'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "pwd_rule = ".$company['setting']['pwd_rule'];
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_change_limit'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "pwd_change_limit = '".$company['setting']['pwd_change_limit']."'";
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_history'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "pwd_history = ".$company['setting']['pwd_history'];
			$commaFlag = true;
		}

		if(isset($company['setting']['pwd_renewal_day'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			if($company['setting']['pwd_renewal_day']=='NULL'){
				$sql1 .= "pwd_renewal_day = NULL";
			}
			else{
				$sql1 .= "pwd_renewal_day = ".$company['setting']['pwd_renewal_day'];
			}
			$commaFlag = true;
		}

		if(isset($company['setting']['status'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "status = '".$company['setting']['status']."'";
			$commaFlag = true;
		}

		if(isset($company['setting']['banner'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "banner = '".$company['setting']['banner']."'";
			$commaFlag = true;
		}

		$sql1 .= " WHERE company_id = :company_id";
	}

	$sql2 = "SELECT * FROM company_banner WHERE company_id = :company_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company['company_id']);
		$stmt->execute();
		$compFunc = $stmt->fetchAll(PDO::FETCH_COLUMN);
		$db = null;
		$a=0;

		if(isset($sql1)||isset($company['func'])||isset($uploadedFiles)){
			$db = $container->db;
			$db->beginTransaction();
			$error = false;

			if(isset($sql1)){
				$stmt = $db->prepare($sql1, $prepOpts);
				$stmt->bindParam("company_id", $company['company_id']);
				$stmt->execute();
				$count1 = $stmt->rowCount();
				if($count1!==1){
					$error = true;
				}
			}

			if(isset($company['func'])){
				$insertFunc = array_diff($company['func'], $compFunc);
				$deleteFunc = array_diff($compFunc, $company['func']);
				if($insertFunc){
					$query_parts = array();
					foreach( $insertFunc as $data ) {
					    $query_parts[] = "('" . $company['company_id'] . "', '" . $data . "')";
					}
					$sql2 = "INSERT INTO company_func (company_id, func_code) VALUES ".implode(',', $query_parts);
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->execute();
				}
				if($deleteFunc){
					$query_parts = implode("','", $deleteFunc);
					$sql3 = "DELETE FROM company_func WHERE company_id = :company_id AND func_code IN ('".$query_parts."')";
					$stmt = $db->prepare($sql3, $prepOpts);
					$stmt->bindParam("company_id", $company['company_id']);
					$stmt->execute();
				}
			}

			if(isset($uploadedFiles)){
				$sql3 = "INSERT INTO company_banner (company_id, ";
				$sql4 = "UPDATE company_banner SET ";
				foreach ($uploadedFiles as $key => $value) {
					if(strpos($key, "file_") !== false){
						$type = explode("file_", $key)[1];
						${"uploadedFile_$type"} = $uploadedFiles[$key];
						if (${"uploadedFile_$type"}->getError() === UPLOAD_ERR_OK) {
							$container->logger->info('['.$routename.'] uploaded: '.${"uploadedFile_$type"}->getClientFilename());
							$filesize = filesize($_FILES["file_".$type]["tmp_name"]);
							if($filesize > 0) {
								$uploadedPath = array();
								$filename = moveUploadedFile($directory, ${"uploadedFile_$type"}, $company['company_id']."-".$type);
								array_push($uploadedPath, realpath($directory."/".$filename));
								$typeArr = array();
								array_push($typeArr, $type);
								${"fullpath_$type"} = realpath($directory."/".$filename);
							}
							else{
								$container->logger->warning('['.$routename.'] empty file. [ErrCode=000000]');
								$returnData = array('message' => 'Upload Failure','code'=>'000000','detail'=>'File `'.${"uploadedFile_$type"}->getClientFilename().'` is empty.');
								return $response->withJson($returnData,400);
							}
						}
						else{
							$container->logger->warning('['.$routename.'] upload file error: [ErrCode=000000] '.${"uploadedFile_$type"}->getError());
							$returnData = array('message' => 'Upload Failure','code'=>'000000','detail'=>'An error occurred while uploading data. Please try again.');
							return $response->withJson($returnData,400);
						}
					}
				}
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company['company_id']);
				$stmt->execute();
				$compData = $stmt->fetch(PDO::FETCH_ASSOC);
				if(!$compData){
					foreach ($typeArr as $key => $value) {
						$sql3 .= "banner_".$value;
						if($key!==count($typeArr)-1){
							$sql3 .= ", ";
						}
					}
					$sql3 .= ") VALUES (:company_id, '";
					$sql3 .= implode("', '", $uploadedPath);
					$sql3 .= "')";
					$container->logger->warning('['.$routename.'] '.$sql3);
					$stmt = $db->prepare($sql3, $prepOpts);
					$stmt->bindParam("company_id", $company['company_id']);
					$stmt->execute();
					$count3 = $stmt->rowCount();
					if($count3!==1){
						$error = true;
					}
				}
				else{
					foreach ($typeArr as $key => $value) {
						if($compData['banner_'.$value]!==null){
							unlink($compData['banner_'.$value]);
						}
					}
					foreach ($typeArr as $key => $value) {
						$sql4 .= "banner_".$value."='".$uploadedPath[$key]."'";
						if($key!==count($typeArr)-1){
							$sql4 .= ", ";
						}
						else{
							$sql4 .= ", update_ts = getDate() WHERE company_id = :company_id";
						}
					}
					$stmt = $db->prepare($sql4, $prepOpts);
					$stmt->bindParam("company_id", $company['company_id']);
					$stmt->execute();
					$count4 = $stmt->rowCount();
					if($count4!==1){
						$error = true;
					}
				}
			}

			if($error===false){
				$db->commit();
				$db = null;
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$db->rollback();
				$db = null;
				if(count($uploadedPath)>0){
					foreach ($uploadedPath as $key => $value) {
						unlink($value);
					}
				}
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=000000]');
				$returnData = array('message' => 'Update Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=000000]');
			$returnData = array('message' => 'Update Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		if(count($uploadedPath)>0){
			foreach ($uploadedPath as $key => $value) {
				unlink($value);
			}
		}
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apdevicelist (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$camList = implode(", a.", $setting['data']['camList']);

	$sql = "SELECT a.yuwei_sn AS sn, a.".$camList.", CASE WHEN c.func IS NOT NULL THEN CASE WHEN c.func = 0 THEN 'Basic Terminal' WHEN c.func = 1 THEN 'Video Terminal' WHEN c.func = 16 THEN '1076 Video Terminal' ELSE 'Initiative Defense Terminal' END ELSE NULL END AS device_type, c.photo_param AS photocam_no, c.video_param AS videocam_no, CASE WHEN c.watch_video_by_flameout IS NOT NULL THEN CASE WHEN c.watch_video_by_flameout = 1 THEN 'Yes' ELSE 'No' END ELSE NULL END AS flameout_mode, CASE WHEN a.company_id <> 0 THEN 'Yes' ELSE 'NO' END AS binding FROM mob_device AS a LEFT JOIN vehicle AS b ON a.vrm_id = b.vrm_id LEFT JOIN mainserver.dbo.VehicleInfo AS c ON b.yuwei_vehicle_id = c.id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$deviceData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if($deviceData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $deviceData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apdeviceadd (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$device = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $device);

	$sql = "SELECT md_id FROM mob_device WHERE yuwei_sn = :sn";

	$sql1 = "INSERT INTO mob_device (yuwei_sn, company_id) values (:sn, 0)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("sn", $device['sn']);
		$stmt->execute();
		$deviceData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$deviceData){
			$db = $container->db;
			$stmt = $db->prepare($sql1, $prepOpts);
			$stmt->bindParam("sn", $device['sn']);
			$stmt->execute();
			$count = $stmt->rowCount();
			$db = null;
			if($count==1){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing added. [ErrCode=000000]');
				$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] device already exist. [ErrCode=000000]');
			$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Device already exists.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apdeviceedit (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$device = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $device);

	$sql = "SELECT b.yuwei_vehicle_id FROM mob_device AS a LEFT JOIN vehicle AS b ON a.vrm_id = b.vrm_id WHERE a.yuwei_sn = :sn";

	if(isset($device['setting1'])){
		$sql1 = "UPDATE mainserver.dbo.VehicleInfo SET ";
		$commaFlag = false;
		if(isset($device['setting1']['device_type'])){
			$sql1 .= "func = ".$device['setting1']['device_type'].", icon_type = ".$device['setting1']['device_icon'];
			$commaFlag = true;
		}

		if(isset($device['setting1']['photocam_no'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "photo_param = ".$device['setting1']['photocam_no'];
			$commaFlag = true;
		}

		if(isset($device['setting1']['videocam_no'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$video_ch_name = "{";
			$video_relation_ch = "";
			for ($i=1; $i <= $device['setting1']['videocam_no']; $i++) {
				$video_ch_name .= '"CH'.$i.'":"CH'.$i.'"';
				$video_relation_ch .= $i;
				if($i!==$device['setting1']['videocam_no']){
					$video_ch_name .= ',';
					$video_relation_ch .= ",";
				}
			}
			$video_ch_name .= "}";
			$sql1 .= "video_param = ".$device['setting1']['videocam_no'].", video_ch_name = '".$video_ch_name."', video_relation_ch = '".$video_relation_ch."'";
			$commaFlag = true;
		}

		if(isset($device['setting1']['flameout_mode'])){
			if($commaFlag){
				$sql1 .= ", ";
			}
			$sql1 .= "watch_video_by_flameout = ".$device['setting1']['flameout_mode'];
			$commaFlag = true;
		}

		$sql1 .= " WHERE id = :yuwei_vehicle_id";
	}

	if(isset($device['setting2'])){
		$sql2 = "UPDATE mob_device SET ";
		$commaFlag = false;
		if(isset($device['setting2']['BSD_CAM1'])){
			$sql2 .= "BSD_CAM1 = '".$device['setting2']['BSD_CAM1']."'";
			$commaFlag = true;
		}
		if(isset($device['setting2']['DMS_CAM2'])){
			if($commaFlag){
				$sql2 .= ", ";
			}
			$sql2 .= "DMS_CAM2 = '".$device['setting2']['DMS_CAM2']."'";
			$commaFlag = true;
		}
		if(isset($device['setting2']['ADAS_CAM3'])){
			if($commaFlag){
				$sql2 .= ", ";
			}
			$sql2 .= "ADAS_CAM3 = '".$device['setting2']['ADAS_CAM3']."'";
			$commaFlag = true;
		}

		$sql2 .= " WHERE yuwei_sn = :sn";
	}

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("sn", $device['sn']);
		$stmt->execute();
		$deviceData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;
		$yuwei_vehicle_id = $deviceData->yuwei_vehicle_id;

		$db = $container->db;
		$db->beginTransaction();
		$error = false;

		if(isset($sql1)){
			$stmt = $db->prepare($sql1, $prepOpts);
			$stmt->bindParam("yuwei_vehicle_id", $yuwei_vehicle_id);
			$stmt->execute();
			$count1 = $stmt->rowCount();
			if($count1!==1){
				$error = true;
			}
		}
		if(isset($sql2)){
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("sn", $device['sn']);
			$stmt->execute();
			$count2 = $stmt->rowCount();
			if($count2!==1){
				$error = true;
			}
		}

		$flag = $db->inTransaction();
		if($flag){
			if($error===false){
				$db->commit();
				$db = null;
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$db->rollback();
				$db = null;
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=000000]');
				$returnData = array('message' => 'Update Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=000000]');
			$returnData = array('message' => 'Update Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apmailnotifylist (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$sql = "SELECT mail.mail_notify_id AS notify_id, comp.company_code, mail.notify_item, mail.status FROM mail_notify AS mail LEFT JOIN company AS comp ON mail.company_id = comp.company_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$notifyData = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if($notifyData){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $notifyData);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apmailnotifyadd (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$notify = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $notify);

	$sql = "SELECT * FROM mail_notify WHERE company_id = :company_id AND notify_item = :notify_item";

	$sql1 = "INSERT INTO mail_notify (company_id, notify_item, status) values (:company_id, :notify_item, :status)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $notify['company_id']);
		$stmt->bindParam("notify_item", $notify['notify_item']);
		$stmt->execute();
		$notifyData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if(!$notifyData){
			$db = $container->db;
			$stmt = $db->prepare($sql1, $prepOpts);
			$stmt->bindParam("company_id", $notify['company_id']);
			$stmt->bindParam("notify_item", $notify['notify_item']);
			$stmt->bindParam("status", $notify['status']);
			$stmt->execute();
			$count = $stmt->rowCount();
			$db = null;
			if($count==1){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing added. [ErrCode=000000]');
				$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] mail notification already exist. [ErrCode=000000]');
			$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Notification already exists.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apmailnotifyedit (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$notify = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $notify);

	$sql = "UPDATE mail_notify SET status = :status, update_ts = getDate() WHERE mail_notify_id = :notify_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("status", $notify['status']);
		$stmt->bindParam("notify_id", $notify['notify_id']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;
		if($count==1){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=000000]');
			$returnData = array('message' => 'Update Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apdrvcardlog (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$sql = "SELECT comp.company_code, log.filepath, log.totalCnt, log.insertedCnt, log.updatedCnt, log.create_ts FROM driver_card_import_log AS log LEFT JOIN company AS comp ON log.company_id = comp.company_id ORDER BY log.create_ts DESC";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->execute();
		$importLog = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if($importLog){
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => $importLog);
			return $response->withJson($returnData);
		}
		else{
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success','data' => []);
			return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}

function apdrvcardadd (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$company_id = $args['compId'];
	$container->logger->info('['.$routename.'] parameters:', array('company_id'=>$company_id));

	$uploadedFiles = $request->getUploadedFiles();
	$uploadedFile = $uploadedFiles['file'];

	$ts=date("YmdHis");

	$sql = "SELECT driver_code FROM driver WHERE company_id = :company_id";
	$sql1 = "EXEC spr_import_driver_card :filepath,:company_id";

	try{
		if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
			$container->logger->info('['.$routename.'] uploaded: '.$uploadedFile->getClientFilename());
			$filesize = filesize($_FILES["file"]["tmp_name"]);
			if($filesize > 0) {
				if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
					$db = $container->db;
					$stmt = $db->prepare($sql);
					$stmt->bindParam("company_id", $company_id);
					$stmt->execute();
					$driver_list_db = $stmt->fetchAll(PDO::FETCH_COLUMN);
					$db = null;

					$error = array();
					$driver_not_exist_error = array();
					$driver_dup_error = array();
					$driver_list_import = array();
					$driver_dup_list = array();
					$row = 1;

					while (($data = __fgetcsv($handle)) !== FALSE) {
						/**
						 * 2 fields
						* Driver Code, Card ID
						*/
						if($row==1){
							$empty = FALSE;
							$encode = TRUE;
							$format = TRUE;
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
							if(count($data)!==2||$data[0]!=='Driver Code'||$data[1]!=='Card ID'){
								$format = FALSE;
								break;
							}
						}
						else{
							$num = count($data);
							$match = true;
							$exist_driver = true;
							$dup_driver = false;
							if($num!=2){
								$match = false;
							}
							else{
								$rowData = $data;
								foreach ($rowData as $key => $value) {
									if(empty($rowData[$key])){
										$rowData[$key] = NULL;
									}
									else{
										$rowData[$key] = trim($rowData[$key]);
									}
								}
								if($rowData[0]===NULL){
									$match = false;
								}
								if(!in_array($rowData[0], $driver_list_db)){
									$exist_driver = false;
								}
								if(in_array($rowData[0], $driver_list_import)){
									$dup_driver = true;
								}
							}
							if($match && $exist_driver){
								$driver_list_import[$row] = $rowData[0];
							}
							else{
								if(!$exist_driver){
									array_push($driver_not_exist_error, $row);
								}
								if(!$match){
									array_push($error, $row);
								}
							}
							if($dup_driver){
								if(!in_array($rowData[0], $driver_dup_list)){
									array_push($driver_dup_list,$rowData[0]);
								}
							}
						}
						$row++;
					}
					if($empty==TRUE){
						$container->logger->warning('['.$routename.'] empty file. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'The file is empty.');
						return $response->withJson($returnData,400);
					}
					else if($encode==FALSE){
						$container->logger->warning('['.$routename.'] not ansi or utf-8. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'The file is not in ASCII or UTF-8 format.');
						return $response->withJson($returnData,400);
					}
					else if($format==FALSE){
						$container->logger->warning('['.$routename.'] column not match. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'Invalid data columns.');
						return $response->withJson($returnData,400);
					}
					else if($row==1){
						$container->logger->warning('['.$routename.'] empty data. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'The file contains headers only.');
						return $response->withJson($returnData,400);
					}
					else if(count($error)!=0){
						$error = __consecutiveArray($error);
						$container->logger->warning('['.$routename.'] wrong pattern. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'Invalid data format in row(s) #','data' => $error);
						return $response->withJson($returnData,400);
					}
					else if(count($driver_not_exist_error)!=0){
						$driver_not_exist_error = __consecutiveArray($driver_not_exist_error);
						$container->logger->warning('['.$routename.'] driver not exist. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'Driver(s) not existed. Invalid Row(s) #','data' => $driver_not_exist_error);
						return $response->withJson($returnData,400);
					}
					else if(count($driver_dup_list)!=0){
						foreach ($driver_dup_list as $drv) {
							array_push($driver_dup_error, $drv.": [".implode(",",array_keys($driver_list_import, $drv))."]");
						}
						$container->logger->warning('['.$routename.'] import record duplicate. [ErrCode=000000]');
						$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'The file contains duplicate records. Duplicate Row(s)','dup_data' => $driver_dup_error);
						return $response->withJson($returnData,400);
					}
					else{
						$filename = $company_id."-".$ts.'-'.bin2hex(random_bytes(8)).".csv";
						$ftpURL = "ftp://".$setting['adminpanel']['drvcard_import']['username'].":".$setting['adminpanel']['drvcard_import']['password']."@".$setting['adminpanel']['drvcard_import']['host'].":".$setting['adminpanel']['drvcard_import']['port']."/".$setting['adminpanel']['drvcard_import']['ftpdir']."/".$filename;
						$contents = file_get_contents($_FILES["file"]["tmp_name"]);
						$result = file_put_contents($ftpURL,$contents);
						if($result===FALSE){
							$container->logger->warning('['.$routename.'] ftp error: [ErrCode=000000]');
							$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'An error occurred while uploading data. Please try again.');
							return $response->withJson($returnData,400);
						}
						else{
							$filePath = $setting['adminpanel']['drvcard_import']['fulldir']."/".$filename;
							$db = $container->db;
							$stmt = $db->prepare($sql1, $prepOpts);
							$stmt->bindParam("filepath", $filePath);
							$stmt->bindParam("company_id", $company_id);
							$stmt->execute();
							$sprData = $stmt->fetch(PDO::FETCH_OBJ);
							$db = null;
							if($sprData){
								$container->logger->info('['.$routename.'] success.');
								$returnData = array('message' => 'Success','data' => $sprData);
								return $response->withJson($returnData);
							}
							else{
								$container->logger->warning('['.$routename.'] nothing added. [ErrCode=000000]');
								$returnData = array('message' => 'Add Failure','code'=>'000000','detail'=>'Please contact customer support for further instructions.');
								return $response->withJson($returnData,400);
							}
						}
					}
					fclose($handle);
				}
				else{
					$container->logger->warning('['.$routename.'] read csv fail. [ErrCode=000000]');
					$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'An error occurred while uploading data. Please try again.');
					return $response->withJson($returnData,400);
				}
			}else{
				$container->logger->warning('['.$routename.'] empty file. [ErrCode=000000]');
				$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'The file is empty.');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] upload file error: [ErrCode=000000] '.$uploadedFile->getError());
			$returnData = array('message' => 'Import Failure','code'=>'000000','detail'=>'An error occurred while uploading data. Please try again.');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
    	$container->logger->error('['.$routename.'] SQL error: [ErrCode=000000] '.$e);
		$returnData = array('message' => 'Internal Error','code'=>'000000','detail'=>'An error occurred while connecting to server. Please try again. If the problem still exists, please contact customer support for further instructions.');
		return $response->withJson($returnData,400);
	}
}