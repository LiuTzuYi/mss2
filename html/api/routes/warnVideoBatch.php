<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-21 16:07:13
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {post} /api/getVideoArchive Get Warning Video Archive
 * @apiName VIDEO DOWNLOAD - GET VIDEO ARCHIVE
 * @apiGroup WarnVideoBatch
 * @apiVersion 1.0.0
 *
 * @apiParam {String} archiveFilename Archive filename
 * @apiParam {String} videoPrefix Video filename prefix
 * @apiParam {Array[]} videoArray List of video id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} url URL for download file
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "url": "http://dgdsweb04/api/download/eXl5/zip/L3RtcC92aWRlb0FyY2hpdmVLRWZsY3U%3D"
 *  }
 *
 * @apiError (400) InternalError_12001 Cannot create zip file
 * @apiError (400) RequestError_12002 Incorrect video ID
 * @apiError (400) InternalError_12003 MongoDB error
 * @apiError (400) RequestError_12004 Empty result or out of range
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->post('/getVideoArchive', 'getVideoArchive')->setName('VIDEO DOWNLOAD - GET VIDEO ARCHIVE');

function getVideoArchive (Request $request, Response $response, array $args){
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

	$tmpname = tempnam(sys_get_temp_dir(), "videoArchive");

	$vdolist = $query['videoArray'];
	$query_parts = implode("','", $vdolist);

	$sql = "SELECT media.media_full_id, media.path FROM log_data_media AS media LEFT JOIN vehicle AS veh ON media.vrm_id = veh.vrm_id WHERE media.media_full_id IN ('".$query_parts."') AND veh.company_id = :company_id";

	if(count($vdolist)==0){
		$container->logger->warning('['.$routename.'] empty or out of range. [ErrCode=12004]');
		$returnData = array('message' => 'Fail','code'=>'12004');
		return $response->withJson($returnData,400);
	}
	else{
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$videoData = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;

			if($videoData){
				$zip = new ZipArchive();
				$tmpname = tempnam(sys_get_temp_dir(), "videoArchive");
				$res = $zip->open($tmpname.'.zip', ZipArchive::CREATE);
				$errorcnt = 0;
				$tmpvideo = array();
				if ($res === TRUE) {
					$errorlist = tempnam(sys_get_temp_dir(), "error");
					for ($i=0; $i < count($vdolist); $i++) {
						if(!in_array($vdolist[$i], array_column($videoData, "media_full_id"))){
							$error = fopen($errorlist.'.txt', "a");
							fwrite($error, $vdolist[$i]."\r\n");
							fclose($error);
							$errorcnt += 1;
						}
						else{
							$idx = array_search($vdolist[$i], array_column($videoData, "media_full_id"));
							$path = $videoData[$idx]['path'];
							$ftpURL = "ftp://".$setting['ftp']['username'].":".$setting['ftp']['password']."@".$setting['ftp']['host'].":".$setting['ftp']['port']."/".$path;
							$file = file_get_contents($ftpURL);
							if($file){
								array_push($tmpvideo, tempnam(sys_get_temp_dir(), "video"));
								$result = fopen(end($tmpvideo).'.mp4', "a");
								fwrite($result,$file);
								fclose($result);
								if(isset($query['videoPrefix'])){
									$zip->addFile(end($tmpvideo).'.mp4',$query['videoPrefix'].'_'.$vdolist[$i].'.mp4');
								}
								else{
									$zip->addFile(end($tmpvideo).'.mp4',$vdolist[$i].'.mp4');
								}
							}
							else{
								$error = error_get_last();
								$container->logger->error('['.$routename.'] call server error: [ErrCode=11101] GET_FILE_FTP_PATH='.$path);
								$container->logger->error('['.$routename.'] call server error: [ErrCode=11101] '.$error['message']);
								$error = fopen($errorlist.'.txt', "a");
								fwrite($error, $vdolist[$i]."\r\n");
								fclose($error);
								$errorcnt += 1;
							}
						}
					}
					if($errorcnt>0){
						$zip->addFile($errorlist.'.txt','ERROR_ID.txt');
					}
					$zip->close();
					//$container->logger->warning('['.$routename.'] zip file is created');

					if(file_exists($errorlist.'.txt')){
						unlink($errorlist.'.txt');
					}
					unlink($errorlist);
					if($errorcnt!==count($vdolist)){
						reset($tmpvideo);
						foreach ($tmpvideo as $key => $value) {
							unlink($value.'.mp4');
							unlink($value);
						}
						if(file_exists($tmpname.'.zip')){
							$container->logger->info('['.$routename.'] success.');
							//$returnData = array('message' => 'Success', 'url' => $setting['data']['webserver'].'/api/download/'.urlencode(base64_encode($query['archiveFilename'])).'/zip/'.urlencode(base64_encode($tmpname)));
							$returnData = array('message' => 'Success', 'url' => '/api/download/'.urlencode(base64_encode($query['archiveFilename'])).'/zip/'.urlencode(base64_encode($tmpname)));
							//$container->logger->info('['.$routename.'] '.$returnData['url']);
							return $response->withJson($returnData);
						}
						else{
							$container->logger->warning('['.$routename.'] cannot create zip file. [ErrCode=12001]');
							$returnData = array('message' => 'Fail', 'code' => '12001');
							return $response->withJson($returnData,400);
						}
					}
					else{
						reset($tmpvideo);
						foreach ($tmpvideo as $key => $value) {
							unlink($value.'.mp4');
							unlink($value);
						}
						unlink($tmpname.'.zip');
						unlink($tmpname);
						$container->logger->warning('['.$routename.'] invalid video id. [ErrCode=12002]');
						$returnData = array('message' => 'Fail', 'code' => '12002');
						return $response->withJson($returnData,400);
					}
				}
				else{
					$container->logger->warning('['.$routename.'] cannot create zip file. [ErrCode=12001]');
					$returnData = array('message' => 'Fail', 'code' => '12001');
					return $response->withJson($returnData,400);
				}
			}
			else{
				$container->logger->warning('['.$routename.'] invalid video id. [ErrCode=12002]');
				$returnData = array('message' => 'Fail', 'code' => '12002');
				return $response->withJson($returnData,400);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=12003]'.$e);
			$returnData = array('message' => 'Fail', 'code' => '12003');
			return $response->withJson($returnData,400);
		}
	}
}
