<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-11 11:20:39
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/loginbanner/:comp/:lang Pre-Login Prompt
 * @apiName PRELOGIN - BANNER
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam {String} comp Company code
 * @apiParam {String="en","zh-cn","zh-tw"} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} data Prompt message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": "The computing resources that you are going to access..."
 *  }
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) InternalError_10003 MySql error
 * @apiUse ErrorResponse
 */
$app->get('/loginbanner/{comp}/{lang}', 'prelogin')->setName('PRELOGIN - BANNER');

/**
 * @api {post} /api/login Login
 * @apiName LOGIN
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} appVersion Application version
 * @apiParam (Request Body) {String} company_code Company code
 * @apiParam (Request Body) {String} username Username
 * @apiParam (Request Body) {String} password Password
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) LoginFailed_10001 Login failed
 * @apiError (400) ApplicationError_10002 Wrong app version
 * @apiError (400) InternalError_10003 MySql error
 * @apiError (400) InternalError_10013 Updata time failed
 * @apiError (400) LoginFailed_10014 Account locked
 * @apiError (400) LoginFailed_10028 Password expired
 * @apiError (400) LoginFailed_10029 First time login
 * @apiError (400) LoginFailed_10031 Inactive account

 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": "userA"
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/login', 'login')->setName('LOGIN');

/**
 * @api {get} /api/logout Logout
 * @apiName LOGOUT
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 */
$app->get('/logout', 'logout')->setName('LOGOUT');

function prelogin (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$comp = $args['comp'];
	$lang = $args['lang'];
	$container->logger->info('['.$routename.'] parameters:', array('comp'=>$comp,'lang'=>$lang));

	$sql = "SELECT banner.banner_default AS 'default', banner.banner_en AS 'en', banner.banner_zhtw AS 'zh-tw', banner.banner_zhcn AS 'zh-cn' FROM company_banner AS banner LEFT JOIN company AS comp ON banner.company_id = comp.company_id WHERE comp.banner = 'Y' AND comp.company_code = :company_code COLLATE Latin1_General_Bin";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_code", $comp);
		$stmt->execute();
		$bannerData = $stmt->fetch(PDO::FETCH_ASSOC);
		$db = null;
		if($bannerData){
			if(isset($bannerData[$lang])){
				$file = $bannerData[$lang];
			}
			else{
				$file = $bannerData['default'];
			}
			$data = @file_get_contents($file);
			if($data===FALSE){
				$container->logger->info('['.$routename.'] success.');
	 			$returnData = array('message' => 'Success');
	 			return $response->withJson($returnData);
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success', 'data' => $data);
				return $response->withJson($returnData);
			}
		}
		else{
			$container->logger->info('['.$routename.'] success.');
	 		$returnData = array('message' => 'Success');
	 		return $response->withJson($returnData);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10003] '.$e);
		$returnData = array('message' => 'Fail','code' => '10003');
		return $response->withJson($returnData,400);
	}
}

function login (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$login = $request->getParsedBody();
	$loginparam = $login;
	unset($loginparam['password']);
	$container->logger->info('['.$routename.'] parameters:', $loginparam);

	session_unset();

	$function = $setting['data']['userFunc'];
	$query_parts = implode("','", $function);

	$sql = "SELECT comp.status FROM company AS comp WHERE comp.company_code = :company_code COLLATE Latin1_General_Bin";

	$sql1 = "SELECT userac.user_id, userac.username, userac.password, userac.fullname, userac.lang, userac.map, userac.company_id, userac.pwd_upd_ts AS pwd_upd_ts, comp.company_code, comp.company_name, userac.group_id, userac.retry_count, comp.pwd_length, comp.pwd_rule, comp.pwd_lockout_cnt, comp.pwd_renewal_day, comp.timezone, userac.ou_id, userac.status, ou.title AS department FROM user_account AS userac LEFT JOIN company AS comp ON userac.company_id = comp.company_id LEFT JOIN org_chart AS ou ON ou.ou_id = userac.ou_id WHERE userac.username = :username COLLATE Latin1_General_Bin and comp.company_code = :company_code COLLATE Latin1_General_Bin";

	$sql2 = "SELECT func_code FROM company_func WHERE company_id = :company_id AND func_code IN ('".$query_parts."')";

	$sql3 = "SELECT func_code FROM user_group_func WHERE group_id = :group_id AND func_code IN ('";

	$sql4 = "UPDATE user_account SET last_login_ts = :last_login_ts, retry_count = :retry_count WHERE user_id = :user_id";

	$sql5 = "UPDATE user_account SET retry_count = :retry_count+1 WHERE user_id = :user_id";

	try{
		$verset = $setting['version']['path'];
		$str = file_get_contents($verset);
		if($str!==false){
    		$json = json_decode($str,true);
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_code", $login['company_code']);
			$stmt->execute();
			$compData = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			if($compData){
				if($compData->status=='A'){
					if(isset($login['api'])||$json['version']==$login['appVersion']){
						$db = $container->db;
						$stmt = $db->prepare($sql1, $prepOpts);
						$stmt->bindParam("username", $login['username']);
						$stmt->bindParam("company_code", $login['company_code']);
						$stmt->execute();
						$userData = $stmt->fetch(PDO::FETCH_OBJ);
						$db = null;
						if($userData){
							unset($userData->compstatus);
							$pwdplain = '#'.$login['password'];
							$salt = sha1($login['password'].$login['password']);
							$pwdencrypt = sha1($salt.$login['password']);;
							if($userData->password==$pwdplain||$userData->password==$pwdencrypt){
								unset($userData->password);
								if($userData->status=='A'){
									unset($userData->status);
									if($userData->retry_count<$userData->pwd_lockout_cnt){
										unset($userData->pwd_lockout_cnt);
										$db = $container->db;
										$stmt = $db->prepare($sql4, $prepOpts);
										$t=date("Y-m-d H:i:s");
										$r=0;
										$stmt->bindParam("last_login_ts", $t);
										$stmt->bindParam("retry_count", $r);
										$stmt->bindParam("user_id", $userData->user_id);
										$stmt->execute();
										$count = $stmt->rowCount();
										$db = null;
										if(!$userData->lang){
											$userData->lang = 'en';
										}
										if(!$userData->map){
											$userData->map = 'googleMap';
										}
										$userData->pwdSetting = array('char'=>$userData->pwd_length,'type'=>$userData->pwd_rule);
										unset($userData->pwd_length);
										unset($userData->pwd_rule);
										if($userData->pwd_upd_ts){
											$dttmp = new DateTime($userData->pwd_upd_ts);
											$userData->pwd_upd_ts_utc = $dttmp->format('U');
											if(!isset($userData->pwd_renewal_day)||(isset($userData->pwd_renewal_day)&&time()-$userData->pwd_upd_ts_utc<($userData->pwd_renewal_day+1)*24*60*60)){
												unset($userData->pwd_renewal_day);
												unset($userData->retry_count);
												unset($userData->pwd_upd_ts);
												unset($userData->pwd_upd_ts_utc);
												$db = $container->db;
												$stmt = $db->prepare($sql2, $prepOpts);
												$stmt->bindParam("company_id", $userData->company_id);
												$stmt->execute();
												$compFunc = $stmt->fetchAll(PDO::FETCH_COLUMN);
												$db = null;
												$userData->compFunc = $compFunc;
												$sql3 = $sql3 . implode("','", $compFunc) . "')";
												$db = $container->db;
												$stmt = $db->prepare($sql3, $prepOpts);
												$stmt->bindParam("group_id", $userData->group_id);
												$stmt->execute();
												$userFunc = $stmt->fetchAll(PDO::FETCH_COLUMN);
												$db = null;
												$userData->func_code = $userFunc;
												$prepList = array();
												$prepList += [$userData->ou_id];
												$arrtmp = $prepList;
												$donePrep = false;
												while (!$donePrep) {
													$query_parts = implode("','", $arrtmp);
													$sql6 = "SELECT ou_id FROM org_chart WHERE company_id = :company_id AND parent_id IN ('".$query_parts."')";
													$db = $container->db;
													$stmt = $db->prepare($sql6, $prepOpts);
													$stmt->bindParam("company_id", $userData->company_id);
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
												$userData->oc_list = $prepList;
												$query_parts = implode("','", $userData->oc_list);
												$sql7 = "SELECT title AS department, ou_id AS id FROM org_chart WHERE company_id = :company_id AND ou_id IN ('".$query_parts."') ORDER BY title ASC";
												$db = $container->db;
												$stmt = $db->prepare($sql7, $prepOpts);
												$stmt->bindParam("company_id", $userData->company_id);
												$stmt->execute();
												$departmentData = $stmt->fetchAll(PDO::FETCH_ASSOC);
												$db = null;
												$userData->departments = $departmentData;
												$_SESSION['user'] = $userData;
												$_SESSION['LAST_ACTIVITY'] = time();
												$container->logger->info('['.$routename.'] session variable updated.', array('user'=>(array)$_SESSION['user'],'LAST_ACTIVITY'=>$_SESSION['LAST_ACTIVITY']));
												if($count==1){
													$container->logger->info('['.$routename.'] success.');
													$returnData = array('message' => 'Success');
													return $response->withJson($returnData);
												}
												else{
													$container->logger->warning('['.$routename.'] success but update timestamp fail. [ErrCode=10013]');
													$returnData = array('message' => 'Success','code' => '10013');
													return $response->withJson($returnData);
												}
											}
											else{
												unset($userData->pwd_renewal_day);
												unset($userData->retry_count);
												unset($userData->pwd_upd_ts);
												unset($userData->pwd_upd_ts_utc);
												$userData->user = $userData->username;
												$userData->type = 'expired';
												$_SESSION['user'] = $userData;
												$_SESSION['LAST_ACTIVITY'] = time();
												$_SESSION['FLAG'] = $setting['updatepwd']['uipath'];
												$container->logger->info('['.$routename.'] session variable updated.', array('user'=>(array)$_SESSION['user'],'LAST_ACTIVITY'=>$_SESSION['LAST_ACTIVITY'],'FLAG'=>$_SESSION['FLAG']));
												$container->logger->warning('['.$routename.'] password expired. [ErrCode=10028]');
												$returnData = array('message' => 'Fail','code' => '10028', 'data'=>$login['username']);
												return $response->withJson($returnData,400);
											}
										}
										else{
											unset($userData->pwd_renewal_day);
											unset($userData->retry_count);
											unset($userData->pwd_upd_ts);
											$userData->user = $userData->username;
											$userData->type = 'first-log';
											$_SESSION['user'] = $userData;
											$_SESSION['LAST_ACTIVITY'] = time();
											$_SESSION['FLAG'] = $setting['updatepwd']['uipath'];
											$container->logger->info('['.$routename.'] session variable updated.', array('user'=>(array)$_SESSION['user'],'LAST_ACTIVITY'=>$_SESSION['LAST_ACTIVITY'],'FLAG'=>$_SESSION['FLAG']));
											$container->logger->warning('['.$routename.'] first login required password change. [ErrCode=10029]');
											$returnData = array('message' => 'Fail','code' => '10029', 'data'=>$login['username']);
											return $response->withJson($returnData,400);
										}
									}
									else{
										$container->logger->warning('['.$routename.'] Account lock. [ErrCode=10014]');
										$returnData = array('message' => 'Fail','code' => '10014');
										return $response->withJson($returnData,400);
									}
								}
								else{
									$container->logger->warning('['.$routename.'] Account inactive. [ErrCode=10031]');
									$returnData = array('message' => 'Fail','code' => '10031');
									return $response->withJson($returnData,400);
								}
							}
							else{
								$db = $container->db;
								$stmt = $db->prepare($sql5, $prepOpts);
								$stmt->bindParam("retry_count", $userData->retry_count);
								$stmt->bindParam("user_id", $userData->user_id);
								$stmt->execute();
								$count = $stmt->rowCount();
								$db = null;
								if($count==1){
									$container->logger->warning('['.$routename.'] wrong password. [ErrCode=10001]');
									$returnData = array('message' => 'Fail','code' => '10001');
									return $response->withJson($returnData,400);
								}
								else{
									$container->logger->warning('['.$routename.'] wrong password & update retry count fail. [ErrCode=10001]');
									$returnData = array('message' => 'Fail','code' => '10001');
									return $response->withJson($returnData,400);
								}
							}
						}
						else{
							$container->logger->warning('['.$routename.'] User record not found. [ErrCode=10001]');
							$returnData = array('message' => 'Fail','code' => '10001');
							return $response->withJson($returnData,400);
						}
					}
					else{
						$container->logger->warning('['.$routename.'] App version mismatch. [ErrCode=10002]');
						$returnData = array('message' => 'Fail','code' => '10002');
						return $response->withJson($returnData,400);
					}
				}
				else{
					$returnData = array('message' => 'Redirect','link' => $setting['data']['webserver'].'/503/E');
					return $response->withJson($returnData,301);
				}
			}
			else{
				$container->logger->warning('['.$routename.'] wrong company code. [ErrCode=10001]');
				$returnData = array('message' => 'Fail','code' => '10001');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->error('['.$routename.'] PHP error: fail to read version. [ErrCode=90002_02]');
			$returnData = array('message' => 'Fail','code' => '90002_02');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10003] '.$e);
		$returnData = array('message' => 'Fail','code' => '10003');
		return $response->withJson($returnData,400);
	}
};

function logout (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	session_unset();

	$container->logger->info('['.$routename.'] success.');
   	$returnData = array('message' => 'Success');
    return $response->withJson($returnData);
}
