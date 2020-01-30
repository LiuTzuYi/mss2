<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-01 14:47:59
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {post} /api/updateLang Update Language
 * @apiName USER - UPDATE LANG
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10006 Fail (no row affected)
 * @apiError (400) InternalError_10007 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

$app->post('/updateLang', 'updateLang')->setName('USER - UPDATE LANG');

/**
 * @api {post} /api/updateMap Update Map
 * @apiName USER - UPDATE MAP
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} map Map
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10008 Fail (no row affected)
 * @apiError (400) InternalError_10009 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

$app->post('/updateMap', 'updateMap')->setName('USER - UPDATE MAP');

/**
 * @api {post} /api/updatepw Update Password
 * @apiName PASSWORD - UPDATE PASSWORD
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} password Old password
 * @apiParam (Request Body) {String} newpassword New password
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10010 Fail (no row affected)
 * @apiError (400) ValidationError_10011 Fail (wrong old password)
 * @apiError (400) InternalError_10012 Fail (no user data)
 * @apiError (400) UpdateFailure_10015 Fail (no row affected and add password history fail)
 * @apiError (400) UpdateFailure_10016 New password found in password history
 * @apiError (400) UpdateFailure_10017 Restrict user to change password to only once per day
 * @apiError (400) UpdateFailure_10030 Fail (no user data)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/updatepw', 'updatepw')->setName('PASSWORD - UPDATE PASSWORD');

/**
 * @api {get} /preresetpwd/{comp}/{token} Get Preset Password Data
 * @apiName PASSWORD - GET RESET DATA
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam {String} comp Company code
 * @apiParam {String} token Token
 *
 * @apiError (400) RequestError_10021 Password already changed
 * @apiError (400) RequestError_10022 Link has expired
 * @apiError (400) RequestError_10023 Fail to decrypt request link
 * @apiError (400) RequestError_10024 SQL error
 * @apiError (400) RequestError_10025 Retrieve params fail
 * @apiError (400) RequestError_10026 Fail (no user data)
 * @apiError (400) RequestError_10027 Company not match
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

$app->get('/preresetpwd/{comp}/{token}', 'preresetpw')->setName('PASSWORD - GET RESET DATA');

/**
 * @api {post} /requestPwdChange Forget Password
 * @apiName PASSWORD - FORGET PASSWORD
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username Username
 * @apiParam {String} comp Company code
 * @apiParam {String} email Email
 * @apiParam {String} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) InternalError_10018 Fail to encrypt request link
 * @apiError (400) InternalError_10019 SQL error
 * @apiError (400) InternalError_10020 Send email fail
 * @apiError (400) InternalError_10032 email not registered
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/requestPwdChange', 'forgetpw')->setName('PASSWORD - FORGET PASSWORD');

function updateLang (Request $request, Response $response, array $args){
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

	$useracset = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $useracset);

	$user_id = $_SESSION['user']->user_id;

	$sql = "UPDATE user_account SET lang = :lang WHERE user_id = :user_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("user_id", $user_id);
		$stmt->bindParam("lang", $useracset['lang']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;
		if($count==1){
			$_SESSION['user']->lang = $useracset['lang'];
			$container->logger->info('['.$routename.'] session variable updated.', array('lang'=>$_SESSION['user']->lang));
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$sql2 = "SELECT lang FROM user_account WHERE user_id = :user_id";
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("user_id", $user_id);
			$stmt->execute();
			$oldlang = $stmt->fetch(PDO::FETCH_COLUMN);
			if($oldlang==$useracset['lang']){
				$_SESSION['user']->lang = $useracset['lang'];
				$container->logger->info('['.$routename.'] session variable updated.', array('lang'=>$_SESSION['user']->lang));
				$container->logger->info('['.$routename.'] already updated.');
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10006]');
				$returnData = array('message' => 'Fail','code' => '10008');
				return $response->withJson($returnData,400);
			}
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10007] '.$e);
		$returnData = array('message' => 'Fail','code' => '10007');
		return $response->withJson($returnData,400);
	}
};

function updateMap (Request $request, Response $response, array $args){
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

	$useracset = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $useracset);

	$user_id = $_SESSION['user']->user_id;

	$sql = "UPDATE user_account SET map = :map WHERE user_id = :user_id";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("user_id", $user_id);
		$stmt->bindParam("map", $useracset['map']);
		$stmt->execute();
		$count = $stmt->rowCount();
		$db = null;
		if($count==1){
			$_SESSION['user']->map = $useracset['map'];
			$container->logger->info('['.$routename.'] session variable updated.', array('map'=>$_SESSION['user']->map));
			$container->logger->info('['.$routename.'] success.');
			$returnData = array('message' => 'Success');
			return $response->withJson($returnData);
		}
		else{
			$sql2 = "SELECT map FROM user_account WHERE user_id = :user_id";
			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("user_id", $user_id);
			$stmt->execute();
			$oldmap = $stmt->fetch(PDO::FETCH_COLUMN);
			if($oldmap==$useracset['map']){
				$_SESSION['user']->map = $useracset['map'];
				$container->logger->info('['.$routename.'] session variable updated.', array('map'=>$_SESSION['user']->map));
				$container->logger->info('['.$routename.'] already updated.');
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success');
				return $response->withJson($returnData);
			}
			else{
				$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10008]');
				$returnData = array('message' => 'Fail','code' => '10008');
				return $response->withJson($returnData,400);
			}
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10009] '.$e);
		$returnData = array('message' => 'Fail','code' => '10009');
		return $response->withJson($returnData,400);
	}
};

function updatepw (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');
	$reset = isset($_SESSION['FLAG'])&&$_SESSION['FLAG']==$setting['resetpwd']['uipath'];

	if(!$reset){
		$username = $_SESSION['user']->username;
		$company_id = $_SESSION['user']->company_id;
		$ou_id = $_SESSION['user']->ou_id;
	}

	$user = $request->getParsedBody();
	$container->logger->info('['.$routename.'] parameters:', $user);

	$user_id = $_SESSION['user']->user_id;
	$valid = true;

	$sql = "SELECT userac.password, userac.pwd_upd_ts, comp.pwd_history, comp.pwd_change_limit FROM user_account AS userac INNER JOIN company AS comp ON userac.company_id = comp.company_id WHERE userac.user_id = :user_id";

	$sql2 = "SELECT password, update_ts AS update_ts, seq_num FROM user_pwd_history WHERE user_id = :user_id";

	$sql3 = "UPDATE user_account SET password = :newpassword, pwd_upd_ts = :pwd_upd_ts, retry_count = 0 WHERE user_id = :user_id";

	$sql4 = "UPDATE user_pwd_history SET password = :newpassword, update_ts = :update_ts WHERE user_id = :user_id AND seq_num = :seq_num";

	$sql5 = "INSERT INTO user_pwd_history (user_id, seq_num, password, update_ts) VALUES (:user_id, :seq_num, :newpassword, :update_ts)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("user_id", $user_id);
		$stmt->execute();
		$userData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;
		if($userData){
			if(!$reset){
				$pwdplain = '#'.$user['password'];
				$salt = sha1($user['password'].$user['password']);
				$pwdencrypt = sha1($salt.$user['password']);
				if($userData->password==$pwdplain||$userData->password==$pwdencrypt){
					unset($userData->password);
				}
				else{
					$valid = false;
					$container->logger->warning('['.$routename.'] wrong old password. [ErrCode=10011]');
					$returnData = array('message' => 'Fail','code' => '10011');
				}
			}
			if($userData->pwd_upd_ts){
				$dttmp = new DateTime($userData->pwd_upd_ts);
				$userData->pwd_upd_ts_utc = $dttmp->format('U');
				if($userData->pwd_change_limit=='N'||($userData->pwd_change_limit=='Y'&&time()-$userData->pwd_upd_ts_utc>86400)){
					unset($userData->pwd_change_limit);
					unset($userData->pwd_upd_ts);
					unset($userData->pwd_upd_ts_utc);
				}
				else{
					$valid = false;
					$container->logger->warning('['.$routename.'] password updated within 24 hrs. [ErrCode=10017]');
					$returnData = array('message' => 'Fail','code' => '10017');
				}
			}
			if($valid){
				$newsalt = sha1($user['newpassword'].$user['newpassword']);
				$newpwdencrypt = sha1($newsalt.$user['newpassword']);
				if($userData->pwd_history!=0){
					$db = $container->db;
					$stmt = $db->prepare($sql2, $prepOpts);
					$stmt->bindParam("user_id", $user_id);
					$stmt->execute();
					$pwdhistory = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
					$match = false;
					if($pwdhistory){
						for($i=0;$i<count($pwdhistory);$i++){
							$dttmp2 = new DateTime($pwdhistory[$i]['update_ts']);
							$pwdhistory[$i]['update_ts_utc'] = $dttmp2->format('U');
						}
						usort($pwdhistory, function($a, $b) {
						    return $b['update_ts_utc'] <=> $a['update_ts_utc'];
						});
						$matchpwdlength = count($pwdhistory);
						if(count($pwdhistory)>$userData->pwd_history){
							$matchpwdlength = $userData->pwd_history;
						}
						for($i=0;$i<$matchpwdlength;$i++){
							$container->logger->warning('['.$routename.']'.$newpwdencrypt);
							$container->logger->warning('['.$routename.']'.$pwdhistory[$i]['password']);
							if($newpwdencrypt==$pwdhistory[$i]['password']){
								$container->logger->warning('['.$routename.']');
								$match = true;
							}
						}
					}
					if($match){
						$container->logger->warning('['.$routename.'] password match in history. [ErrCode=10016]');
						$returnData = array('message' => 'Fail','code' => '10016');
						return $response->withJson($returnData,400);
					}
					else{
						$db = $container->db;
						$db->beginTransaction();
						$t=date("Y-m-d H:i:s");
						$stmt = $db->prepare($sql3, $prepOpts);
						$stmt->bindParam("user_id", $user_id);
						$stmt->bindParam("newpassword", $newpwdencrypt);
						$stmt->bindParam("pwd_upd_ts", $t);
						$stmt->execute();
						$count = $stmt->rowCount();
						if($count==1){
							if($pwdhistory&&count($pwdhistory)>0){
								if(count($pwdhistory)<$userData->pwd_history){
									$seq_num = count($pwdhistory)+1;
									$stmt = $db->prepare($sql5, $prepOpts);
								}
								else{
									usort($pwdhistory, function($a, $b) {
									    return $a['update_ts_utc'] <=> $b['update_ts_utc'];
									});
									$seq_num = $pwdhistory[0]['seq_num'];
									$stmt = $db->prepare($sql4, $prepOpts);
								}
								$stmt->bindParam("newpassword", $newpwdencrypt);
								$stmt->bindParam("update_ts", $t);
								$stmt->bindParam("seq_num", $seq_num);
								$stmt->bindParam("user_id", $user_id);
								$stmt->execute();
								$pwdhistcount = $stmt->rowCount();
							}
							else{
								$seq_num = 1;
								$stmt = $db->prepare($sql5, $prepOpts);
								$stmt->bindParam("newpassword", $newpwdencrypt);
								$stmt->bindParam("update_ts", $t);
								$stmt->bindParam("seq_num", $seq_num);
								$stmt->bindParam("user_id", $user_id);
								$stmt->execute();
								$pwdhistcount = $stmt->rowCount();
							}
							if($pwdhistcount==1){
								$db->commit();
								$db = null;
								if(isset($_SESSION['FLAG'])){
									$_SESSION['FLAGDONE'] = true;
								}
								$container->logger->info('['.$routename.'] success.');
								$returnData = array('message' => 'Success');
								return $response->withJson($returnData);
							}
							else{
								$db->rollback();
								$db = null;
								$container->logger->warning('['.$routename.'] update password history fail. [ErrCode=10015]');
								$returnData = array('message' => 'Fail', 'code' => '10015');
								return $response->withJson($returnData,400);
							}
						}
						else{
							$db->rollback();
							$db = null;
							$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10010]');
							$returnData = array('message' => 'Fail','code' => '10010');
							return $response->withJson($returnData,400);
						}
					}
				}
				else{
					$db = $container->db;
					$t=date("Y-m-d H:i:s");
					$stmt = $db->prepare($sql3, $prepOpts);
					$stmt->bindParam("user_id", $user_id);
					$stmt->bindParam("newpassword", $newpwdencrypt);
					$stmt->bindParam("pwd_upd_ts", $t);
					$stmt->execute();
					$count = $stmt->rowCount();
					$db = null;
					if($count==1){
						$container->logger->info('['.$routename.'] success.');
						if(isset($_SESSION['FLAG'])){
							$_SESSION['FLAGDONE'] = true;
						}
						$returnData = array('message' => 'Success');
						return $response->withJson($returnData);
					}
					else{
						$container->logger->warning('['.$routename.'] nothing updated. [ErrCode=10010]');
						$returnData = array('message' => 'Fail','code' => '10010');
						return $response->withJson($returnData,400);
					}
				}
			}
			else{
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] no record. [ErrCode=10030]');
			$returnData = array('message' => 'Fail','code' => '10030');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$flag = $db->inTransaction();
		if($flag){
			$db->rollback();
			$db = null;
		}
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=10012] '.$e);
		$returnData = array('message' => 'Fail','code' => '10012');
		return $response->withJson($returnData,400);
	}
};

function preresetpw (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

    $company = $args['comp'];
    $url_safe_base64 = urldecode($args['token']);
	$container->logger->info('['.$routename.'] parameters:', array('comp'=>$company,'token'=>$args['token']));

	session_unset();

	$token = strtr($url_safe_base64, "._", "+/");
	$cipher = $setting['encrypt']['cipher'];
	$key = $setting['encrypt']['key'];
	$iv = $setting['encrypt']['iv'];
	$time = time();
	$urlparams = openssl_decrypt($token,$cipher,$key,0,$iv);
	$data = array('company_code'=>$company);

	$sql = "SELECT userac.pwd_upd_ts, userac.user_id, userac.company_id, comp.pwd_length, comp.pwd_rule FROM user_account AS userac INNER JOIN company AS comp ON userac.company_id = comp.company_id WHERE userac.username = :username COLLATE Latin1_General_Bin and comp.company_code = :company_code COLLATE Latin1_General_Bin";

	if($urlparams==FALSE){
		$data += array('username'=>null,'error'=>'10023');
		$container->logger->warning('['.$routename.'] decrypt fail. [ErrCode=10023]');
	}
	else{
		parse_str($urlparams, $output);
		if(isset($output['comp'])&&isset($output['u'])&&isset($output['lang'])&&isset($output['t'])){
			$data += array('lang'=>$output['lang'],'user'=>$output['u'],'timestamp'=>$output['t'],'username'=>$output['u']);
			if($output['comp']==$company){
				if($time - $output['t'] >= 86400){
					$data += array('error'=>'10022');
					$container->logger->warning('['.$routename.'] link expired. [ErrCode=10022]');
				}
				else{
					try{
						$db = $container->db;
						$stmt = $db->prepare($sql, $prepOpts);
						$stmt->bindParam("username", $output['u']);
						$stmt->bindParam("company_code", $company);
						$stmt->execute();
						$userData = $stmt->fetch(PDO::FETCH_OBJ);
						$db = null;
						if($userData){
							$dttmp = new DateTime($userData->pwd_upd_ts);
							$userData->pwd_upd_ts_utc = $dttmp->format('U');
							if($output['t']>$userData->pwd_upd_ts_utc){
								$userData->pwdSetting = (object)array('char'=>$userData->pwd_length,'type'=>$userData->pwd_rule);
								$data += array('user_id'=>$userData->user_id,'company_id'=>$userData->company_id,'pwdSetting'=>(array)$userData->pwdSetting);
								$container->logger->info('['.$routename.'] success.');
							}
							else{
								$data += array('error'=>'10021');
								$container->logger->warning('['.$routename.'] password updated. [ErrCode=10021]');
							}
							unset($userData->pwd_upd_ts_utc);
						}
						else{
							$data += array('error'=>'10026');
							$container->logger->warning('['.$routename.'] no record. [ErrCode=10026]');
						}
					}
					catch(PDOException $e) {
						$data += array('error'=>'10024');
						$container->logger->error('['.$routename.'] SQL error: [ErrCode=10024] '.$e);
					}
				}
			}
			else{
				$data += array('error'=>'10027');
				$container->logger->warning('['.$routename.'] company not match. [ErrCode=10027]');
			}
		}
		else{
			$data += array('error'=>'10025');
			$container->logger->warning('['.$routename.'] retrieve params fail. [ErrCode=10025]');
		}
	}

	$_SESSION['user'] = (object)$data;
	$_SESSION['LAST_ACTIVITY'] = time();
	$_SESSION['FLAG'] = $setting['resetpwd']['uipath'];
	$container->logger->info('['.$routename.'] session variable updated.', array('user'=>(array)$_SESSION['user'],'LAST_ACTIVITY'=>$_SESSION['LAST_ACTIVITY'],'FLAG'=>$_SESSION['FLAG']));
	return $response->withRedirect($setting['data']['webserver'].'/'.$company.'/'.$setting['resetpwd']['uipath']);
};

function forgetpw (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$data = $request->getParsedBody();
	$data['time'] = time();
	$container->logger->info('['.$routename.'] parameters:', $data);

	$sql = "SELECT userac.fullname, comp.company_id, userac.email FROM user_account AS userac INNER JOIN company AS comp ON userac.company_id = comp.company_id WHERE userac.username = :username COLLATE Latin1_General_Bin and comp.company_code = :company_code COLLATE Latin1_General_Bin";

	$mail = $container->mailer;
	if($mail!==FALSE){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("username", $data['username']);
			$stmt->bindParam("company_code", $data['comp']);
			$stmt->execute();
			$userData = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			if($userData){
				if($userData->email==$data['email']){
					$cipher = $setting['encrypt']['cipher'];
					$key = $setting['encrypt']['key'];
					$iv = $setting['encrypt']['iv'];
					$urlparams = 'comp='.$data['comp'].'&u='.$data['username'].'&lang='.$data['lang'].'&t='.$data['time'];
					$token = openssl_encrypt($urlparams,$cipher,$key,0,$iv);
					if($token==FALSE){
						$container->logger->warning('['.$routename.'] encrypt fail. [ErrCode=10018]');
						$returnData = array('message' => 'Fail','code' => '10018');
						return $response->withJson($returnData,400);
					}
					else{
						$url_safe_base64 = strtr($token, "+/", "._" );
						$urltoken = urlencode($url_safe_base64);
						$link = $setting['data']['webserver'].'/'.$setting['resetpwd']['linkpath'].'/'.$data['comp'].'/'.$urltoken;
						$fullname = $userData->fullname;
						$username = $data['username'];
						$logo = $setting['data']['mail_logo'];
						$logo_tag = 'logo';
						$mail->addAddress($userData->email);
						$mail->isHTML(true);
						$mail->Subject = $setting['data']['mail_subject_'.$data['lang']];
						$messageHTML = file_get_contents($setting['data']['mail_html_'.$data['lang']]);
						$messageTEXT = file_get_contents($setting['data']['mail_text_'.$data['lang']]);
						$mail->AddEmbeddedImage($logo, $logo_tag);
						$messageHTML = str_replace('%logo%', 'cid:'.$logo_tag, $messageHTML);
						$messageTEXT = str_replace('%logo%', 'cid:'.$logo_tag, $messageTEXT);
						$messageHTML = str_replace('%fullname%', $fullname, $messageHTML);
						$messageTEXT = str_replace('%fullname%', $fullname, $messageTEXT);
			    		$messageHTML = str_replace('%username%', $username, $messageHTML);
			    		$messageTEXT = str_replace('%username%', $username, $messageTEXT);
			    		$messageHTML = str_replace('%link%', $link, $messageHTML);
			    		$messageTEXT = str_replace('%link%', $link, $messageTEXT);
					    $mail->Body    = $messageHTML;
					    $mail->AltBody = $messageTEXT;
					    $mail->send();
					    $container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success');
						return $response->withJson($returnData);
					}
				}
				else{
					$container->logger->warning('['.$routename.'] email verify fail. [ErrCode=10032]');
					$returnData = array('message' => 'Fail','code' => '10032');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$container->logger->warning('['.$routename.'] no record. [ErrCode=10032]');
				$returnData = array('message' => 'Fail','code' => '10032');
				return $response->withJson($returnData,400);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=10019] '.$e);
			$returnData = array('message' => 'Fail','code' => '10019');
			return $response->withJson($returnData,400);
		}
		catch (Exception $e) {
			$container->logger->error('['.$routename.'] Mailer error: [ErrCode=10020] '.$e);
			$returnData = array('message' => 'Fail','code' => '10020');
			return $response->withJson($returnData,400);
		}
	}
	else{
		$container->logger->error('['.$routename.'] Mailer error: [ErrCode=10020] '.$e);
		$returnData = array('message' => 'Fail','code' => '10020');
		return $response->withJson($returnData,400);
	}
};