<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:24
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @api {get} /api/download/:filename/:type/:data Download File
 * @apiName DOWNLOAD - DOWNLOAD FILE
 * @apiGroup Download
 * @apiVersion 1.0.0
 *
 * @apiParam {String} filename Download filename
 * @apiParam {String="text/csv","application/zip"} type File type
 * @apiParam {String} data System generated filename
 *
 * @apiSuccess {File} - File stream
 *
 * @apiError (400) InternalError_12201 File not exists
 * @apiError (400) ParameterError_12202 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/download/{filename}/{type}/{data}', 'downloadFile')->setName('DOWNLOAD - DOWNLOAD FILE');

function downloadFile (Request $request, Response $response, array $args){
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

    $filename = base64_decode(urldecode($args['filename']));
    $data = base64_decode(urldecode($args['data']));
    $type = $args['type'];
    $container->logger->info('['.$routename.'] parameters:', array('filename'=>$filename,'type'=>$type,'dataPath'=>$data));

    switch ($type) {
		case 'csv':
			$httpType = 'text/csv';
			break;
		case 'zip':
			$httpType = 'application/zip';
			break;
	}
	if(isset($httpType)){
		if(file_exists($data.'.'.$type)){
			$file = fopen($data.'.'.$type, 'rb');
			$stream = new \Slim\Http\Stream($file);
			unlink($data.'.'.$type);
			unlink($data);
			$container->logger->info('['.$routename.'] success.');
			return $response
			->withHeader('Content-Type', $httpType.'; charset=UTF-8')
			->withHeader('Content-Disposition', 'attachment; filename="'.$filename.'.'.$type.'"')
			->withBody($stream);
		}
		else{
			$container->logger->warning('['.$routename.'] download file not exist. [ErrCode=12201]');
			$returnData = array('message' => 'Fail', 'code' => '12201');
			return $response->withJson($returnData,400);
		}
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=12202]');
		$returnData = array('message' => 'Fail','code'=>'12202');
		return $response->withJson($returnData,400);
	}
}