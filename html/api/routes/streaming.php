<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-19 11:47:15
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/getWarnVideo/:licence/:video_id Streaming Video
 * @apiName WARNING - GET VIDEO
 * @apiGroup Streaming
 * @apiVersion 1.0.0
 *
 * @apiParam {String} licence Licence Plate
 * @apiParam {String} video_id Video id
 *
 * @apiSuccess {File} - File stream
 *
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "message": "Fail"
 *  }
 * @apiUse UnauthorizedError
 */
$app->get('/getWarnVideo/{licence}/{video_id}', 'getWarnVideo')->setName('WARNING - GET VIDEO');

function getWarnVideo (Request $request, Response $response, array $args){
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

    $licence = $args['licence'];
	$video_id = $args['video_id'];
	$container->logger->info('['.$routename.'] parameters:', array('licence_plate'=>$licence, 'video_id'=>$video_id));

	$sql = "SELECT media.path FROM log_data_media AS media LEFT JOIN vehicle AS veh ON media.vrm_id = veh.vrm_id WHERE media.media_full_id = :video_id AND veh.company_id = :company_id";

	$sql2 = "INSERT INTO media_access_log (media_full_id,username) values (:video_id,:user)";

	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("video_id", $video_id);
		$stmt->bindParam("company_id", $company_id);
		$stmt->execute();
		$videoData = $stmt->fetch(PDO::FETCH_OBJ);
		$db = null;

		if($videoData){

			$db = $container->db;
			$stmt = $db->prepare($sql2, $prepOpts);
			$stmt->bindParam("video_id", $video_id);
			$stmt->bindParam("user", $username);
			$stmt->execute();
			$accesslogId = $db->lastInsertId();
			$db = null;

			$path = $videoData->path;

			$ftpURL = "ftp://".$setting['ftp']['username'].":".$setting['ftp']['password']."@".$setting['ftp']['host'].":".$setting['ftp']['port']."/".$path;
			$file = file_get_contents($ftpURL);
			if($file){
				if ($request->hasHeader('Range')) {
					$container->logger->info('['.$routename.'] :'.$request->getHeader('Range')[0]);
					$range = request_get_range($request->getHeader('Range')[0]);
					$stream = request_partial_response($file,$range);
					if(strlen($stream)!==strlen($file)){
						$container->logger->info('['.$routename.'] success with partial response.');
						$response->write($stream);
						return $response
						->withStatus(206)
						->withHeader('Content-Type', 'video/mp4')
						->withHeader('Content-Encoding', 'identity')
						->withHeader('Content-Range', 'bytes '.$range[0].'-'.$range[1].'/'.strlen($file))
						->withHeader('Accept-Ranges', 'bytes');
					}
					else{
						$container->logger->info('['.$routename.'] success.');
						$response->write($file);
						return $response
						->withHeader('Content-Type', 'video/mp4')
						->withHeader('Content-Range', 'bytes */'.strlen($file))
						->withHeader('Content-Disposition','filename="'.$licence.'_'.$video_id.'.mp4"');
					}
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$response->write($file);
					return $response
					->withHeader('Content-Type', 'video/mp4')
					->withHeader('Content-Range', 'bytes */'.strlen($file))
					->withHeader('Content-Disposition','filename="'.$licence.'_'.$video_id.'.mp4"');
				}
			}
			else{
				$error = error_get_last();
				$container->logger->error('['.$routename.'] call server error: [ErrCode=11101] GET_FILE_FTP_PATH='.$path);
				$container->logger->error('['.$routename.'] call server error: [ErrCode=11101] '.$error['message']);
				$returnData = array('message' => 'Fail');
				return $response->withJson($returnData,400);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] video not exist.');
			$returnData = array('message' => 'Fail');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: '.$e);
		$returnData = array('message' => 'Fail');
		return $response->withJson($returnData,400);
	}
}